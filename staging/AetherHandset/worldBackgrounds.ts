export type AetherWorldStyle =
  | 'grid'
  | 'nebula'
  | 'starfield'
  | 'horizon'
  | 'hex'
  | 'warp'
  | 'rings'
  | 'dust'
  | 'aurora'
  | 'liquid'
  | 'voronoi'
  | 'contour'
  | 'circuit'
  | 'caustics'
  | 'plasma'
  | 'tunnel'
  | 'halftone'
  | 'moire'
  | 'hologram'
  | 'triangles'
  | 'waveform'
  | 'crystal'
  | 'filament'
  | 'universe'
  | 'milkyway'
  | 'underwater'
  | 'shadowstage'

export interface AetherWorld {
  style: AetherWorldStyle
  /** Base / void tint. */
  void: string
  accentA: string
  accentB: string
  accentC: string
  /** Equirectangular sky panorama (2:1). Defaults for milkyway style. */
  skyImage?: string
  /** Grid line tint (grid style). */
  grid?: string
  gridCols?: number
  gridRows?: number
  gridWeight?: number
  gridStrength?: number
  /** Phase offset — breaks symmetry between variants. */
  shift?: number
}

export const DEFAULT_AETHER_WORLD: AetherWorld = {
  style: 'hex',
  void: '#030806',
  accentA: '#1a2e22',
  accentB: '#3d6b52',
  accentC: '#5a8268',
  grid: '#3d6b52',
  gridCols: 38,
  gridRows: 22,
  gridStrength: 0.58,
  shift: 0,
}

/** Gaia EDR3 all-sky render — CC BY-SA 4.0, Kevinmloch / Wikimedia Commons */
export const DEFAULT_MILKY_WAY_SKY = '/textures/milky-way-sky.jpg'

export const WORLD_STYLE_INDEX: Record<AetherWorldStyle, number> = {
  grid: 0,
  nebula: 1,
  starfield: 2,
  horizon: 3,
  hex: 4,
  warp: 5,
  rings: 6,
  dust: 7,
  aurora: 8,
  liquid: 9,
  voronoi: 10,
  contour: 11,
  circuit: 12,
  caustics: 13,
  plasma: 14,
  tunnel: 15,
  halftone: 16,
  moire: 17,
  hologram: 18,
  triangles: 19,
  waveform: 20,
  crystal: 21,
  filament: 22,
  universe: 23,
  milkyway: 24,
  underwater: 25,
  shadowstage: 26,
}

export const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const SKY_FRAG = /* glsl */ `
  varying vec3 vDir;
  uniform float uStyle;
  uniform float uTime;
  uniform vec3 uVoid;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  uniform vec3 uGrid;
  uniform vec2 uGridScale;
  uniform float uShift;
  uniform float uLineWidth;
  uniform float uGridStrength;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + 0.11;
      a *= 0.5;
    }
    return v;
  }

  float stars(vec3 d, float shift) {
    vec3 p = d * 180.0 + vec3(shift * 17.0, shift * 9.0, 0.0);
    vec3 id = floor(p);
    vec3 f = fract(p);
    float n = hash13(id);
    float size = mix(0.002, 0.018, n);
    vec3 j = vec3(hash13(id + 1.0), hash13(id + 2.0), hash13(id + 3.0));
    vec3 cell = f - j;
    float dist = length(cell);
    float twinkle = 0.65 + 0.35 * sin(uTime * (1.5 + n * 4.0) + n * 40.0);
    return smoothstep(size, 0.0, dist) * twinkle * step(0.992, n);
  }

  float starLayers(vec3 d, float shift) {
    return stars(d, shift) + stars(d * 1.7 + 0.3, shift + 2.1) * 0.6
      + stars(d * 2.4 + 0.8, shift + 5.3) * 0.35;
  }

  float universeStarLayer(vec2 uv, float shift, float threshold, float rMin, float rMax) {
    vec2 id = floor(uv);
    vec2 f = fract(uv);
    float result = 0.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 cid = id + g;
        float n = hash21(cid + shift);
        vec2 pos = g + vec2(hash21(cid + 1.3), hash21(cid + 2.7));
        float cellDist = length(f - pos);
        float r = mix(rMin, rMax, hash21(cid + 4.1));
        float spot = smoothstep(r, r * 0.2, cellDist) * step(threshold, n);
        result = max(result, spot);
      }
    }
    return result;
  }

  float universeStarLayers(vec3 d, float shift) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * vec2(100.0, 50.0) + shift * 12.0;
    float s = 0.0;
    s = max(s, universeStarLayer(uv, shift, 0.964, 0.016, 0.052));
    s = max(s, universeStarLayer(uv * 1.4 + 2.3, shift + 5.0, 0.971, 0.009, 0.03));
    s = max(s, universeStarLayer(uv * 0.6 + 7.1, shift + 11.0, 0.954, 0.024, 0.072));
    return s;
  }

  vec3 styleGrid(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 gridCoord = vec2(au, av) * uGridScale + vec2(uShift, uShift * 0.62);
    vec2 gridUV = fract(gridCoord);
    vec2 gridDist = min(gridUV, 1.0 - gridUV);
    float line = min(gridDist.x, gridDist.y);
    float grid = 1.0 - smoothstep(0.0, uLineWidth, line);
    return col + (uGrid + vec3(0.06)) * grid * uGridStrength;
  }

  vec3 styleNebula(vec3 d, vec3 col) {
    vec2 uv = vec2(d.x * 0.72 + d.z * 0.18, d.y * 0.85);
    uv += vec2(uShift * 0.55, -uShift * 0.32);
    uv += vec2(sin(uTime * 0.08 + uShift), cos(uTime * 0.06)) * 0.04;
    float a = exp(-dot(uv - vec2(-0.38, 0.42), uv - vec2(-0.38, 0.42)) * 1.1);
    float b = exp(-dot(uv - vec2(0.55, -0.12), uv - vec2(0.55, -0.12)) * 0.7);
    float c = exp(-dot(uv - vec2(-0.05, -0.55), uv - vec2(-0.05, -0.55)) * 0.9);
    float wisps = fbm(uv * 2.4 + uTime * 0.05 + uShift) * 0.35;
    col = mix(col, uA, a * 0.9);
    col = mix(col, uB, b * 0.8);
    col = mix(col, uC, c * 0.55 + wisps * 0.4);
    col += uC * starLayers(d, uShift) * 0.55;
    col = mix(col, uVoid * 0.35, smoothstep(0.2, -0.9, d.y));
    return col;
  }

  vec3 styleStarfield(vec3 d, vec3 col) {
    float h = d.y * 0.5 + 0.5;
    col = mix(uVoid, uA, pow(h, 1.8));
    col = mix(col, uB, pow(max(h - 0.55, 0.0) * 2.2, 2.0));
    float milky = fbm(vec2(atan(d.x, d.z) * 2.0 + uShift, d.y * 3.0 + uShift)) * 0.18;
    col += uC * milky * smoothstep(-0.2, 0.8, d.y);
    col += (uC * 0.85 + vec3(0.15)) * starLayers(d, uShift);
    return col;
  }

  vec3 styleHorizon(vec3 d, vec3 col) {
    float h = d.y;
    vec3 sky = mix(uVoid, uA, smoothstep(-0.35, 0.55, h));
    sky = mix(sky, uB, exp(-abs(h - 0.35) * 8.0) * 0.55);
    float floorMask = smoothstep(0.06, -0.18, h);
    float dist = 1.0 / max(0.08, -h + 0.02);
    vec2 pg = vec2(atan(d.x, d.z) * 0.5, dist * 0.35 + uShift);
    vec2 g = abs(fract(pg) - 0.5);
    float lines = 1.0 - smoothstep(0.0, 0.035, min(g.x, g.y));
    float fade = exp(-dist * 0.22);
    vec3 floorCol = uVoid + uC * lines * fade * 0.95;
    floorCol += uB * exp(-dist * 0.08) * 0.25;
    return mix(sky, floorCol, floorMask);
  }

  vec3 styleHex(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 p = (vec2(au, av) * uGridScale + uShift) * vec2(1.0, 0.8660254);
    vec2 h = vec2(p.x + p.y * 0.5773503, p.y * 1.1547005);
    vec2 f = fract(h) - 0.5;
    float dist = max(abs(f.x), abs(f.x * 0.5 + f.y * 0.8660254));
    dist = max(dist, abs(f.x * 0.5 - f.y * 0.8660254));
    float hex = 1.0 - smoothstep(0.44, 0.48, dist);
    float glow = fbm(vec2(au, av) * 6.0 + uShift + uTime * 0.04) * 0.12;
    col = mix(col, uA, glow);
    col += (uGrid + uC * 0.25) * hex * uGridStrength;
    return col;
  }

  vec3 styleWarp(vec3 d, vec3 col) {
    vec2 uv = vec2(atan(d.x, d.z) * 0.25, d.y);
    uv += uShift * 0.2;
    float t = uTime * 0.12;
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.5),
                  fbm(uv + 4.0 * q + vec2(8.3, 2.8) - t * 0.35));
    float f = fbm(uv + 3.5 * r);
    col = mix(col, uA, f * 0.85);
    col = mix(col, uB, length(q) * 0.55);
    col = mix(col, uC, r.x * 0.45);
    col += uC * starLayers(d, uShift + 3.0) * 0.18;
    return col;
  }

  vec3 styleRings(vec3 d, vec3 col) {
    vec2 uv = vec2(atan(d.x, d.z), d.y);
    vec2 center = vec2(uShift * 0.4, 0.18);
    float r = length(uv - center);
    float ring = abs(fract(r * 14.0 - uTime * 0.06) - 0.5);
    ring = 1.0 - smoothstep(0.0, 0.08, ring);
    float halo = exp(-dot(uv - center, uv - center) * 3.5) * 0.65;
    col = mix(col, uA, halo);
    col += uB * ring * 0.75;
    col += uC * exp(-abs(d.y - 0.1) * 6.0) * 0.35;
    col += uC * starLayers(d, uShift) * 0.25;
    return col;
  }

  vec3 styleDust(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * 120.0 + uShift;
    float n = fbm(uv + uTime * 0.03);
    float speck = step(0.82, hash21(floor(uv + uTime * 0.5)));
    col = mix(col, uA, n * 0.55);
    col += uB * speck * 0.35;
    col += uC * starLayers(d, uShift + 1.0) * 0.4;
    return col;
  }

  float voronoiDist(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md = 8.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = vec2(hash21(n + g), hash21(n + g + 17.0));
        vec2 r = g + o - f;
        md = min(md, dot(r, r));
      }
    }
    return sqrt(md);
  }

  vec3 styleAurora(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.25 + uShift * 0.2;
    float av = d.y;
    float t = uTime * 0.15;
    col = mix(col, uA, smoothstep(-0.35, 0.75, av));
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float base = (fi - 1.0) * 0.38 + uShift * 0.12;
      float cx = base
        + sin(av * 1.75 + t * 2.0 + fi * 2.1) * 0.2
        + (fbm(vec2(av * 1.2 + fi * 3.0, t * 1.5)) - 0.5) * 0.58;
      float w = 0.11 + 0.08 * fbm(vec2(av * 3.0 + fi, t));
      float band = exp(-pow((au - cx) / w, 2.0));
      float vert = smoothstep(-0.75, 0.65, av)
        * (0.42 + 0.58 * fbm(vec2(au * 5.0 + fi * 4.0, av * 2.6 - t * 2.5)));
      float ribbon = band * vert;
      vec3 aur = mix(uB, uC, fi * 0.45 + fbm(vec2(au, av + t)) * 0.35);
      col += aur * ribbon * (3.28 - fi * 0.56);
    }
    col += uC * starLayers(d, uShift) * 0.88;
    return col;
  }

  vec3 styleLiquid(vec3 d, vec3 col) {
    vec2 uv = vec2(d.x * 0.62 + d.z * 0.28, d.y * 0.78 + 0.08);
    uv += uShift * 0.14;
    float t = uTime * 0.08;
    vec2 c1 = vec2(sin(t * 0.7 + uShift) * 0.42, cos(t * 0.5) * 0.34 + 0.08);
    vec2 c2 = vec2(cos(t * 0.62 + 1.2) * 0.46, sin(t * 0.82 + 0.5) * 0.32);
    vec2 c3 = vec2(sin(t * 0.54 + 2.1) * 0.36, cos(t * 0.88 + 1.8) * 0.38 - 0.12);
    float b1 = exp(-dot(uv - c1, uv - c1) * 3.4);
    float b2 = exp(-dot(uv - c2, uv - c2) * 2.7);
    float b3 = exp(-dot(uv - c3, uv - c3) * 3.1);
    col = mix(col, uA, b1 * 0.72);
    col = mix(col, uB, b2 * 0.64);
    col = mix(col, uC, b3 * 0.52);
    vec2 warp = vec2(fbm(uv * 2.0 + t), fbm(uv * 2.0 - t + 5.0)) * 0.09;
    float flow = fbm(uv * 3.0 + warp + t * 0.28);
    col = mix(col, uB * 0.85 + uC * 0.15, flow * 0.28);
    col += (hash21(uv * 900.0 + t) - 0.5) * 0.035;
    return col;
  }

  vec3 styleVoronoi(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * uGridScale * 0.085 + uShift;
    uv += vec2(sin(uTime * 0.05), cos(uTime * 0.04)) * 0.018;
    float v = voronoiDist(uv);
    float edge = 1.0 - smoothstep(0.0, uLineWidth * 2.8, v);
    float cell = smoothstep(0.14, 0.42, v);
    float n = fbm(uv * 0.55 + uTime * 0.02);
    col = mix(col, uA, cell * n * 0.42);
    col += (uGrid + uC * 0.28) * edge * uGridStrength;
    col += uB * (1.0 - cell) * 0.07;
    return col;
  }

  vec3 styleContour(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * 4.2 + uShift;
    uv += vec2(fbm(uv + uTime * 0.02), fbm(uv + 5.0 - uTime * 0.015)) * 0.32;
    float h = fbm(uv * 2.5 + uShift);
    h += fbm(uv * 5.0 + 3.0) * 0.38;
    h += fbm(uv * 10.0 + 7.0) * 0.18;
    h = clamp(h, 0.0, 1.0);

    // Three elevation bands — low / mid / high.
    vec3 fill = uA;
    fill = mix(fill, uB, smoothstep(0.30, 0.50, h));
    fill = mix(fill, uC, smoothstep(0.56, 0.80, h));
    col = mix(uVoid, fill, smoothstep(0.02, 0.22, h));

    float levels = 16.0 + uGridScale.x * 0.05;
    float contour = abs(fract(h * levels) - 0.5) * 2.0;
    contour = 1.0 - smoothstep(0.0, uLineWidth * 3.2, contour);
    col += uGrid * contour * uGridStrength * 0.62;
    col *= 1.0 - contour * uGridStrength * 0.1;
    return col;
  }

  vec3 styleCircuit(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * uGridScale + uShift;
    vec2 gridUV = fract(uv);
    vec2 gridID = floor(uv);
    float path = step(0.62, hash21(gridID));
    float hLine = 1.0 - smoothstep(0.0, uLineWidth, min(gridUV.y, 1.0 - gridUV.y));
    float vLine = 1.0 - smoothstep(0.0, uLineWidth, min(gridUV.x, 1.0 - gridUV.x));
    float lines = max(hLine, vLine) * path;
    float pulse = sin((gridUV.x + gridUV.y) * 12.0 - uTime * 2.4 + hash21(gridID) * 20.0);
    pulse = smoothstep(0.28, 1.0, pulse);
    float node = (1.0 - smoothstep(0.0, 0.075, length(gridUV - 0.5))) * path;
    col = mix(col, uA, fbm(vec2(au, av) * 3.0) * 0.16);
    col += uGrid * lines * uGridStrength * 0.58;
    col += uB * lines * pulse * uGridStrength * 0.48;
    col += uC * node * uGridStrength * 0.75;
    return col;
  }

  vec3 styleCaustics(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 2.5 + uShift;
    float av = d.y * 2.0;
    float t = uTime * 0.18;
    float c = 0.0;
    c += sin(au * 3.0 + t * 1.2) * sin(av * 4.0 - t * 0.9);
    c += sin(au * 5.0 - t * 0.7 + 1.5) * sin(av * 6.0 + t * 1.1 + 0.8);
    c += sin(au * 7.0 + t * 0.5) * sin(av * 3.0 - t * 0.6 + 2.1);
    c = pow(c * 0.33 + 0.5, 2.2);
    float mask = smoothstep(-0.2, 0.7, d.y);
    col = mix(col, uA, mask * 0.32);
    col += uB * c * mask * 0.62;
    col += uC * pow(c, 4.0) * mask * 0.48;
    return col;
  }

  vec3 stylePlasma(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.25 + uShift;
    float av = d.y;
    float t = uTime * 0.15;
    float p1 = sin(au * 4.0 + t);
    float p2 = sin(av * 5.0 + t * 1.3);
    float p3 = sin((au + av) * 3.0 + t * 0.8);
    float p4 = sin(length(vec2(au, av)) * 6.0 - t * 1.5);
    float v = (p1 + p2 + p3 + p4) * 0.25;
    col = mix(col, uA, v * 0.5 + 0.5);
    col = mix(col, uB, sin(v * 3.14159 + 1.0) * 0.5 + 0.5);
    col = mix(col, uC, cos(v * 3.14159 + 2.0) * 0.5 + 0.5);
    return col * 0.82;
  }

  vec3 styleTunnel(vec3 d, vec3 col) {
    float r = length(vec2(d.x, d.z));
    float ang = atan(d.x, d.z) + uShift;
    float z = 1.0 / max(r, 0.06) + uTime * 2.2;

    float rings = sin(z * 1.7 - fbm(vec2(ang * 0.5, z * 0.1)) * 3.5);
    rings = pow(0.5 + 0.5 * rings, 6.5);
    float lanes = sin(ang * 10.0 - z * 0.45 + uTime * 0.25);
    lanes = pow(0.5 + 0.5 * lanes, 11.0);

    float wall = smoothstep(0.04, 0.2, r) * (1.0 - smoothstep(0.68, 0.96, r));
    float core = exp(-r * 3.4) * (0.65 + 0.35 * sin(uTime * 3.2));

    // Soft top / bottom fill — keeps the front view from going pure black.
    float topWell = exp(-pow(max(d.y - 0.12, 0.0) * 2.4, 1.8));
    float bottomWell = exp(-pow(max(-d.y - 0.12, 0.0) * 2.4, 1.8));

    col += uA * wall * 0.26;
    col += uB * rings * wall * 0.78;
    col += uC * lanes * wall * 0.56;
    col += mix(uB, uC, 0.5) * core * 0.46;

    col += uB * topWell * 0.28;
    col += uC * bottomWell * 0.28;

    float fog = exp(-r * 1.2) * 0.1 + wall * 0.06;
    col += uA * fog;
    return col;
  }

  vec3 styleHalftone(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * uGridScale + uShift;
    float n = fbm(vec2(au, av) * 2.0 + uTime * 0.03);
    vec2 gridUV = fract(uv) - 0.5;
    float dist = length(gridUV);
    float r = uLineWidth * 8.0 * sqrt(n * 0.7 + 0.15);
    float dot = 1.0 - smoothstep(r - 0.02, r + 0.02, dist);
    col = mix(col, uA, n * 0.35);
    col += uGrid * dot * uGridStrength;
    col += uB * dot * n * 0.22;
    return col;
  }

  vec3 styleMoire(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * 80.0 + uShift;
    float t = uTime * 0.02;
    vec2 g1 = vec2(cos(0.26), sin(0.26));
    vec2 g2 = vec2(cos(1.307), sin(1.307));
    float l1 = abs(sin(dot(uv, g1) * 3.14159 + t));
    float l2 = abs(sin(dot(uv, g2) * 3.14159 - t * 0.7));
    float m = pow(l1 * l2, 0.6);
    col = mix(col, uA, m * 0.38);
    col += uGrid * m * uGridStrength * 0.48;
    col += uB * (1.0 - m) * 0.07;
    return col;
  }

  vec3 styleHologram(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    float fresnel = pow(1.0 - abs(d.y), 2.5);
    float scan = pow(sin(av * 120.0 + uTime * 2.0) * 0.5 + 0.5, 8.0);
    float band = sin(av * 40.0 - uTime * 0.8 + fbm(vec2(au, av) * 4.0) * 6.0);
    band = smoothstep(0.3, 1.0, band * 0.5 + 0.5);
    float glitch = step(0.97, hash21(vec2(floor(av * 30.0 + uTime * 3.0), uShift)));
    col = mix(col, uA, fresnel * 0.32);
    col += uB * scan * 0.14;
    col += uC * band * fresnel * 0.52;
    col += uGrid * glitch * 0.38;
    return col;
  }

  vec3 styleTriangles(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = (vec2(au, av) * uGridScale + uShift) * vec2(1.0, 1.7320508);
    vec2 p = fract(uv) - 0.5;
    p.x -= 0.5 * floor(uv.y + 0.5);
    float tri = max(abs(p.x) * 1.7320508 + p.y, -p.y * 2.0);
    float edge = 1.0 - smoothstep(0.44, 0.48, tri);
    float n = fbm(vec2(au, av) * 3.0 + uTime * 0.04);
    col = mix(col, uA, n * 0.28);
    col += (uGrid + uC * 0.2) * edge * uGridStrength;
    return col;
  }

  vec3 styleWaveform(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    float t = uTime * 0.2;
    float wave = 0.0;
    wave += sin(au * 18.84956 + t) * 0.08;
    wave += sin(au * 31.41592 + t * 1.3 + 1.7) * 0.053;
    wave += sin(au * 43.9823 + t * 1.6 + 3.4) * 0.035;
    wave += sin(au * 56.5487 + t * 1.9 + 5.1) * 0.023;
    float lines = abs(av - 0.5 - wave);
    lines = 1.0 - smoothstep(0.0, uLineWidth * 2.5, lines);
    float n = fbm(vec2(au, av) * 2.0);
    col = mix(col, uA, n * 0.24);
    col += uGrid * lines * uGridStrength;
    col += uB * lines * n * 0.32;
    return col;
  }

  vec3 styleCrystal(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * 12.0 + uShift;
    vec2 n = floor(uv);
    vec2 f = fract(uv);
    float md = 8.0;
    vec2 cid = n;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = vec2(hash21(n + g), hash21(n + g + 31.0));
        vec2 r = g + o - f;
        float dist = dot(r, r);
        if (dist < md) {
          md = dist;
          cid = n + g;
        }
      }
    }
    float h = hash21(cid);
    vec3 facetCol = mix(uA, mix(uB, uC, h), h * 0.8 + 0.2);
    float edge = 1.0 - smoothstep(0.0, 0.04, sqrt(md));
    float shade = 0.55 + 0.45 * dot(d, vec3(0.2, 0.8, 0.3));
    col = mix(col, facetCol * shade, edge * 0.88);
    col += uGrid * (1.0 - edge) * uGridStrength * 0.38;
    return col;
  }

  vec3 styleFilament(vec3 d, vec3 col) {
    float au = atan(d.x, d.z) * 0.15915494309 + 0.5;
    float av = d.y * 0.5 + 0.5;
    vec2 uv = vec2(au, av) * 3.0 + uShift;
    float t = uTime * 0.15;
    float fil = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 seed = vec2(hash21(vec2(fi, uShift)), hash21(vec2(fi + 7.0, uShift + 3.0)));
      vec2 curl = vec2(
        fbm(uv * 2.0 + seed + t * 0.3 + fi),
        fbm(uv * 2.0 + seed + 5.0 - t * 0.25 + fi)
      );
      vec2 path = uv + curl * 0.6;
      float strand = abs(sin(path.x * 8.0 + fi * 2.1 + t) + cos(path.y * 6.0 - fi * 1.7 - t * 0.8));
      strand = exp(-strand * 12.0);
      fil += strand * (0.7 - fi * 0.1);
    }
    col = mix(col, uA, fbm(uv) * 0.18);
    col += uB * fil * 0.48;
    col += uC * fil * fil * 0.32;
    return col;
  }

  vec3 styleUniverse(vec3 d, vec3 col) {
    vec3 origin = normalize(vec3(
      sin(uShift * 2.4) * 0.28,
      0.72 + sin(uShift * 1.1) * 0.08,
      cos(uShift * 2.4) * 0.28
    ));
    float dist = acos(clamp(dot(d, origin), -1.0, 1.0));
    float t = uTime * 0.06;
    float expand = 1.0 + sin(t * 1.4) * 0.04;
    dist /= expand;

    float core = exp(-dist * dist * 32.0);
    float fireball = exp(-dist * 6.0) * 0.62;
    float shell = smoothstep(0.06, 0.35, dist) * smoothstep(1.55, 0.45, dist);

    vec3 singularity = vec3(1.0, 0.97, 0.92);
    vec3 plasma = mix(uC, vec3(1.0, 0.72, 0.38), 0.55);
    vec3 nebula = mix(uB, uA, 0.35);
    vec3 deep = mix(uVoid, uA, 0.65);

    col = mix(singularity, plasma, smoothstep(0.0, 0.18, dist));
    col = mix(col, nebula, smoothstep(0.12, 0.55, dist));
    col = mix(col, deep, smoothstep(0.35, 1.35, dist));
    col += singularity * core * (0.95 + 0.05 * sin(t * 3.0));
    col += plasma * fireball * 0.45;

    vec2 shellUV = vec2(dist * 9.0 + uShift, atan(d.x, d.z) * 2.2 + t * 0.12);
    float gas = fbm(shellUV * 2.8) * fbm(shellUV * 1.4 + 4.0);
    col += nebula * gas * shell * 0.42;
    col += uC * gas * gas * shell * 0.18;

    float starMask = smoothstep(0.12, 0.55, dist);
    float s = universeStarLayers(d, uShift + 2.0);
    col += vec3(1.0) * s * starMask;

    float cmb = fbm(vec2(atan(d.x, d.z) * 3.0, d.y * 4.0 + uShift) * 18.0) - 0.5;
    col += uA * cmb * 0.05;

    return col;
  }

  vec3 styleUnderwater(vec3 d, vec3 col) {
    float au = atan(d.x, d.z);
    float av = d.y;
    float t = uTime * 0.1;

    // Rippling water surface at the top — refracts incoming light.
    float ripple = fbm(vec2(au * 4.2 + t * 0.35, sin(au * 1.8) * 0.6 + t * 0.22 + uShift));
    float ripple2 = fbm(vec2(au * 7.5 - t * 0.28, av * 2.0 + uShift * 1.7));
    float surface = ripple * 0.65 + ripple2 * 0.35;

    // Caustic interference — light broken by the surface.
    float c = 0.0;
    c += sin(au * 4.0 + surface * 6.0 + t * 0.9) * sin(av * 5.5 - t * 0.7);
    c += sin(au * 6.5 - t * 0.5 + surface * 4.0) * sin(av * 3.8 + t * 0.6 + 1.2);
    c += sin(au * 9.0 + t * 0.35) * sin(av * 7.0 - t * 0.45 + 2.4);
    c = pow(c * 0.28 + 0.5, 2.8);

    // God-ray shafts from above — diverging through the volume.
    float rayPhase = au * 7.0 + surface * 5.0 + uShift;
    float shafts = sin(rayPhase + t * 0.4);
    shafts += sin(rayPhase * 1.73 + 1.8 - t * 0.25) * 0.55;
    shafts += sin(rayPhase * 2.41 - 2.6 + t * 0.18) * 0.28;
    shafts = pow(max(shafts * 0.5 + 0.5, 0.0), 4.5);

    // Stronger near the surface (top), fading with depth.
    float depth = smoothstep(-1.0, 0.92, av);
    float upper = pow(depth, 1.35);
    float beam = shafts * upper;
    float caustic = c * upper;

    // Deep void with a hint of blue in the upper water column.
    col = mix(col, uA, upper * 0.22);
    col += uB * beam * 0.72;
    col += uC * beam * beam * 0.38;
    col += mix(uB, uC, 0.45) * caustic * 0.52;

    // Soft bloom at the brightest caustic hotspots.
    col += uC * pow(caustic, 3.0) * 0.28;

    return col;
  }

  void main() {
    vec3 d = normalize(vDir);
    vec3 col = uVoid;
    if (uStyle < 0.5) col = styleGrid(d, col);
    else if (uStyle < 1.5) col = styleNebula(d, col);
    else if (uStyle < 2.5) col = styleStarfield(d, col);
    else if (uStyle < 3.5) col = styleHorizon(d, col);
    else if (uStyle < 4.5) col = styleHex(d, col);
    else if (uStyle < 5.5) col = styleWarp(d, col);
    else if (uStyle < 6.5) col = styleRings(d, col);
    else if (uStyle < 7.5) col = styleDust(d, col);
    else if (uStyle < 8.5) col = styleAurora(d, col);
    else if (uStyle < 9.5) col = styleLiquid(d, col);
    else if (uStyle < 10.5) col = styleVoronoi(d, col);
    else if (uStyle < 11.5) col = styleContour(d, col);
    else if (uStyle < 12.5) col = styleCircuit(d, col);
    else if (uStyle < 13.5) col = styleCaustics(d, col);
    else if (uStyle < 14.5) col = stylePlasma(d, col);
    else if (uStyle < 15.5) col = styleTunnel(d, col);
    else if (uStyle < 16.5) col = styleHalftone(d, col);
    else if (uStyle < 17.5) col = styleMoire(d, col);
    else if (uStyle < 18.5) col = styleHologram(d, col);
    else if (uStyle < 19.5) col = styleTriangles(d, col);
    else if (uStyle < 20.5) col = styleWaveform(d, col);
    else if (uStyle < 21.5) col = styleCrystal(d, col);
    else if (uStyle < 22.5) col = styleFilament(d, col);
    else if (uStyle < 23.5) col = styleUniverse(d, col);
    else if (uStyle < 25.5) col = styleUnderwater(d, col);
    else col = styleUniverse(d, col);
    gl_FragColor = vec4(col, 1.0);
  }
`

import {
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { AetherHandsetProps, AetherWorld } from './AetherHandset'

/** Eighteen world surfaces — pick your favorite background. */
const worlds: AetherWorld[] = [
  {
    style: 'aurora',
    void: '#020408',
    accentA: '#0a1830',
    accentB: '#1a6b58',
    accentC: '#5a4898',
    shift: 0,
  },
  {
    style: 'liquid',
    void: '#060508',
    accentA: '#2a1848',
    accentB: '#6a3888',
    accentC: '#c84878',
    shift: 0.35,
  },
  {
    style: 'voronoi',
    void: '#040608',
    accentA: '#142028',
    accentB: '#385868',
    accentC: '#588898',
    grid: '#487080',
    gridCols: 28,
    gridRows: 16,
    gridWeight: 0.032,
    gridStrength: 0.62,
    shift: 0.55,
  },
  {
    style: 'contour',
    void: '#0a1008',
    accentA: '#1e4838',
    accentB: '#6a8850',
    accentC: '#b8a068',
    grid: '#284830',
    gridCols: 20,
    gridRows: 12,
    gridWeight: 0.026,
    gridStrength: 0.68,
    shift: 0.72,
  },
  {
    style: 'circuit',
    void: '#030508',
    accentA: '#101828',
    accentB: '#2868a8',
    accentC: '#48a8d8',
    grid: '#3080c0',
    gridCols: 32,
    gridRows: 18,
    gridWeight: 0.022,
    gridStrength: 0.72,
    shift: 0.88,
  },
  {
    style: 'caustics',
    void: '#061018',
    accentA: '#143848',
    accentB: '#38a8c8',
    accentC: '#78d8f8',
    shift: 1.0,
  },
  {
    style: 'plasma',
    void: '#0a0610',
    accentA: '#502878',
    accentB: '#a848c8',
    accentC: '#f05898',
    shift: 1.15,
  },
  {
    style: 'tunnel',
    void: '#070712',
    accentA: '#1a1a38',
    accentB: '#5058d0',
    accentC: '#c848e8',
    shift: 1.28,
  },
  {
    style: 'halftone',
    void: '#0a0a08',
    accentA: '#383830',
    accentB: '#787860',
    accentC: '#b8b898',
    grid: '#989880',
    gridCols: 24,
    gridRows: 14,
    gridWeight: 0.038,
    gridStrength: 0.72,
    shift: 1.4,
  },
  {
    style: 'moire',
    void: '#08080a',
    accentA: '#282830',
    accentB: '#585868',
    accentC: '#888898',
    grid: '#707080',
    gridStrength: 0.66,
    shift: 1.55,
  },
  {
    style: 'hologram',
    void: '#060810',
    accentA: '#183038',
    accentB: '#40a890',
    accentC: '#68e8c0',
    grid: '#50c0a8',
    shift: 1.68,
  },
  {
    style: 'triangles',
    void: '#0a0810',
    accentA: '#302040',
    accentB: '#685898',
    accentC: '#9888b8',
    grid: '#7868a8',
    gridCols: 26,
    gridRows: 15,
    gridStrength: 0.68,
    shift: 1.82,
  },
  {
    style: 'waveform',
    void: '#080a10',
    accentA: '#182840',
    accentB: '#3868b8',
    accentC: '#58a8e8',
    grid: '#4090d0',
    gridCols: 18,
    gridRows: 10,
    gridWeight: 0.024,
    gridStrength: 0.78,
    shift: 1.95,
  },
  {
    style: 'crystal',
    void: '#080a10',
    accentA: '#203038',
    accentB: '#587888',
    accentC: '#88a8b8',
    grid: '#6898a8',
    gridStrength: 0.65,
    shift: 2.08,
  },
  {
    style: 'filament',
    void: '#0a0608',
    accentA: '#381828',
    accentB: '#a83858',
    accentC: '#f06888',
    shift: 2.2,
  },
  {
    style: 'milkyway',
    void: '#020208',
    accentA: '#101028',
    accentB: '#382868',
    accentC: '#8868c8',
    skyImage: '/textures/eso0932a.jpg',
    shift: 0,
  },
  {
    style: 'underwater',
    void: '#010308',
    accentA: '#081828',
    accentB: '#1a5888',
    accentC: '#5aa8d8',
    shift: 0.42,
  },
  {
    style: 'shadowstage',
    void: '#000000',
    accentA: '#030303',
    accentB: '#faf6f0',
    accentC: '#000000',
    shift: 0,
  },
  {
    style: 'milkyway',
    void: '#010108',
    accentA: '#0a0a18',
    accentB: '#283858',
    accentC: '#6888b8',
    skyImage: '/textures/night-sky-hdri008-8k.jpg',
    skyBrightness: 0.1,
    skyContrast: 1.5,
    shift: 0.18,
  },
  {
    style: 'milkyway',
    void: '#01010a',
    accentA: '#0c0a20',
    accentB: '#2a2858',
    accentC: '#6070a8',
    skyImage: '/textures/night-sky-hdri003-4k.jpg',
    skyBrightness: 0.8,
    skyContrast: 1,
    shift: 0.32,
  },
  {
    style: 'galaxy',
    void: '#000008',
    accentA: '#ff6030',
    accentB: '#1b3984',
    accentC: '#6888c8',
    shift: 0.12,
  },
  {
    style: 'starvolume',
    void: '#000008',
    accentA: '#ff6030',
    accentB: '#f0abfc',
    accentC: '#a5f3fc',
    shift: 0.24,
    galaxyStarSize: 0.075,
    galaxyRotation: 0.042,
  },
  {
    style: 'galaxy',
    void: '#000008',
    accentA: '#ff6030',
    accentB: '#f0abfc',
    accentC: '#a5f3fc',
    shift: 0.28,
    galaxyCount: 3700,
    galaxyRadius: 20,
    galaxyArms: 2,
    galaxyTightness: 2.5,
    galaxyRandomness: 1.145,
    galaxyRandomnessPower: 1,
    galaxyStarSize: 0.05,
    galaxyStarPalette: true,
    galaxyStarLight: '#eaeaea',
    galaxyRotation: 0.042,
  },
]

export const aetherHandsetVariants: PreviewVariant<AetherHandsetProps>[] = [
  {
    id: 1,
    label: 'Aurora — light curtains',
    props: {
      headline: (
        <>
          AUR
          <br />
          ORA
        </>
      ),
      headlineLabel: 'AURORA',
      tagline: 'Northern light veils',
      subheadline: 'Flowing ribbons warp across the void.',
      text: 'Inspired by aurora borealis shaders — layered fBm curtains that snake with time.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[0],
    },
  },
  {
    id: 2,
    label: 'Liquid — organic gradient',
    props: {
      headline: 'LIQUID',
      tagline: 'Flowing color fields',
      subheadline: 'Three drifting centers blend like molten glass.',
      text: 'Soft liquid-gradient background — moving radial blooms with subtle film grain.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[1],
    },
  },
  {
    id: 3,
    label: 'Voronoi — cellular lattice',
    props: {
      headline: 'CELL',
      tagline: 'Organic tessellation',
      subheadline: 'Glowing edges between procedural cells.',
      text: 'Voronoi diagram mapped to the sky sphere — each cell breathes with low noise.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[2],
    },
  },
  {
    id: 4,
    label: 'Contour — topographic map',
    props: {
      headline: 'TERRA',
      tagline: 'Elevation lines',
      subheadline: 'Height-field contours wrap the horizon.',
      text: 'Topographic shader — fBm terrain with iso-lines like a relief map.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[3],
    },
  },
  {
    id: 5,
    label: 'Circuit — tron pulse grid',
    props: {
      headline: 'PULSE',
      tagline: 'Flowing circuit paths',
      subheadline: 'Energy pulses travel along the grid.',
      text: 'Tron-style circuit board — sparse paths with animated pulse nodes.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[4],
    },
  },
  {
    id: 6,
    label: 'Caustics — underwater light',
    props: {
      headline: 'DEEP',
      tagline: 'Refracted light swirls',
      subheadline: 'Overlapping sine interference like pool caustics.',
      text: 'Water caustics shader — layered wave interference mapped to the sky sphere.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[5],
    },
  },
  {
    id: 7,
    label: 'Plasma — psychedelic flow',
    props: {
      headline: 'PLASMA',
      tagline: 'Classic sine plasma',
      subheadline: 'Four overlapping waves cycle through the palette.',
      text: 'Retro plasma effect — prime-number sine layers with phase-shifted color.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[6],
    },
  },
  {
    id: 8,
    label: 'Tunnel — neon hyperspace',
    props: {
      headline: 'WARP',
      tagline: 'Sci-fi depth tunnel',
      subheadline: 'Neon rings and lanes recede toward a pulsing core.',
      text: 'Hyperspace tunnel — inverted radius depth with animated ring structure.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[7],
    },
  },
  {
    id: 9,
    label: 'Halftone — print dot grid',
    props: {
      headline: 'PRINT',
      tagline: 'Variable dot halftone',
      subheadline: 'Dot radius modulated by a noise field.',
      text: 'Halftone shader — editorial dot grid with luminance-driven coverage.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[8],
    },
  },
  {
    id: 10,
    label: 'Moiré — interference grid',
    props: {
      headline: 'INTER',
      tagline: 'Rotated line interference',
      subheadline: 'Two angled grids multiply into moiré bands.',
      text: 'Moiré pattern — overlapping sine grids at offset angles.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[9],
    },
  },
  {
    id: 11,
    label: 'Hologram — scan bands',
    props: {
      headline: 'HOLO',
      tagline: 'Fresnel scan projection',
      subheadline: 'Rim glow, horizontal scanlines, and glitch bursts.',
      text: 'Holographic shader — fresnel edge + scan bands + sparse glitch.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[10],
    },
  },
  {
    id: 12,
    label: 'Triangles — wire tessellation',
    props: {
      headline: 'TRI',
      tagline: 'Triangular lattice',
      subheadline: 'Equilateral triangle grid with breathing noise.',
      text: 'Triangular tessellation — distinct from hex and voronoi cell patterns.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[11],
    },
  },
  {
    id: 13,
    label: 'Waveform — oscilloscope lines',
    props: {
      headline: 'WAVE',
      tagline: 'Layered sine traces',
      subheadline: 'Stacked harmonic waveforms sweep the horizon.',
      text: 'Oscilloscope-style waveform bands — four harmonics with decaying amplitude.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[12],
    },
  },
  {
    id: 14,
    label: 'Crystal — faceted shards',
    props: {
      headline: 'GEM',
      tagline: 'Voronoi facet shading',
      subheadline: 'Each cell gets a unique tint and directional shade.',
      text: 'Crystalline voronoi — faceted cells with lit edges and shaded interiors.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[13],
    },
  },
  {
    id: 15,
    label: 'Filament — energy strands',
    props: {
      headline: 'FLUX',
      tagline: 'Flowing energy wisps',
      subheadline: 'Curl-noise strands weave through the void.',
      text: 'Filament shader — five animated energy strands with fBm curl distortion.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[14],
    },
  },
  {
    id: 16,
    label: 'Genesis — ESO all-sky panorama',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS',
      tagline: 'Our galactic home',
      subheadline: 'Real all-sky Milky Way render mapped to the void.',
      text: 'ESO 360° celestial panorama — photographed star data mapped to the void.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[15],
    },
  },
  {
    id: 17,
    label: 'Underwater — surface god rays',
    props: {
      headline: 'ABYSS',
      tagline: 'Light from the surface',
      subheadline: 'Sun shafts break through rippling water above.',
      text: 'Volumetric god rays from the top — caustics refracted by a moving surface over deep navy void.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[16],
    },
  },
  {
    id: 18,
    label: 'Shadow — phone left',
    props: {
      headline: 'CAST',
      tagline: 'Light from above',
      subheadline: 'Click and drag — the phone turns, the shadow follows.',
      text: 'Handset in the left half; type occupies the right. Overhead halo, soft-cornered shadow.',
      screenImage: PLACEHOLDER_PORTRAIT,
      stageSide: 'left',
      world: worlds[17],
    },
  },
  {
    id: 19,
    label: 'Shadow — phone right',
    props: {
      headline: 'CAST',
      tagline: 'Light from above',
      subheadline: 'Click and drag — the phone turns, the shadow follows.',
      text: 'Handset in the right half; type occupies the left. Overhead halo, soft-cornered shadow.',
      screenImage: PLACEHOLDER_PORTRAIT,
      stageSide: 'right',
      world: worlds[17],
    },
  },
  {
    id: 20,
    label: 'Genesis 2 — Night sky HDRI',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS 2',
      tagline: 'Stitched star panorama',
      subheadline: 'Procedural night sky mapped to the void.',
      text: 'ambientCG NightSkyHDRI008 — 8K tonemapped equirectangular panorama.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[18],
    },
  },
  {
    id: 21,
    label: 'Genesis 3 — Night sky HDRI 003',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS 3',
      tagline: 'Stitched star panorama',
      subheadline: 'Procedural night sky mapped to the void.',
      text: 'ambientCG NightSkyHDRI003 — 4K tonemapped equirectangular panorama.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[19],
    },
  },
  {
    id: 22,
    label: 'Genesis 4 — Procedural spiral',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS 4',
      tagline: 'Born in the spiral',
      subheadline: 'Fifty thousand stars wheel behind the void.',
      text: 'Procedural four-arm galaxy — additive particles, slow drift, deep space void.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[20],
    },
  },
  {
    id: 23,
    label: 'Genesis 5 — Scattered void',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS 5',
      tagline: 'Stars in every direction',
      subheadline: 'Random points fill the volume around the handset.',
      text: 'Fifty thousand additive stars — uniform scatter through 3D space, slow Y spin.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[21],
    },
  },
  {
    id: 24,
    label: 'Genesis 6 — Twin spiral',
    props: {
      headline: (
        <>
          GENI
          <br />
          SIS
        </>
      ),
      headlineLabel: 'GENESIS 6',
      tagline: 'Two arms, wide scatter',
      subheadline: 'Three thousand seven hundred stars in a tight twin spiral.',
      text: 'Galaxy radius 20 · 2 arms · tightness 2.5 · randomness 1.145 · Genesis 5 star palette.',
      screenImage: PLACEHOLDER_PORTRAIT,
      world: worlds[22],
    },
  },
]

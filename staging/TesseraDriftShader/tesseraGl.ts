import type { TesseraItem } from '../TesseraDrift/sampleLetter'

const VERTEX_SHADER = /* glsl */ `#version 300 es
precision highp float;

in vec2 aCorner;
in vec2 aBasePos;
in float aSize;
in float aDepth;
in float aSpreadX;
in vec3 aColor;

uniform vec2 uViewport;
uniform vec2 uLayoutSize;
uniform float uFitScale;
uniform float uApproachDelta;
uniform float uSpreadRemaining;
uniform float uParallaxY;
uniform float uParallaxX;
uniform float uSpreadScale;
uniform float uReduceMotion;

out vec3 vColor;

void main() {
  float parallaxRate = min(uParallaxY * aDepth, 1.0);
  float offsetY = uReduceMotion > 0.5 ? 0.0 : -uApproachDelta * parallaxRate;
  float offsetX =
    uReduceMotion > 0.5
      ? 0.0
      : aSpreadX * uSpreadRemaining * uParallaxX * aDepth * uSpreadScale;

  vec2 center = uViewport * 0.5;
  vec2 layoutOrigin = center - uLayoutSize * uFitScale * 0.5;
  vec2 pos = layoutOrigin + (aBasePos + aCorner * aSize) * uFitScale + vec2(offsetX, offsetY);

  vec2 clip = vec2(
    (pos.x / uViewport.x) * 2.0 - 1.0,
    1.0 - (pos.y / uViewport.y) * 2.0
  );
  gl_Position = vec4(clip, 0.0, 1.0);

  vColor = aColor;
}
`

const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

in vec3 vColor;
out vec4 outColor;

void main() {
  outColor = vec4(vColor, 1.0);
}
`

const QUAD_CORNERS = new Float32Array([
  0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
])

const INSTANCE_FLOATS = 8

export type TesseraDrawState = {
  viewportWidth: number
  viewportHeight: number
  layoutWidth: number
  layoutHeight: number
  fitScale: number
  approachDelta: number
  spreadRemaining: number
  parallaxY: number
  parallaxX: number
  spreadScale: number
  background: [number, number, number]
  reduceMotion: boolean
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }

  return program
}

export function parseHexColor(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized

  return [
    Number.parseInt(value.slice(0, 2), 16) / 255,
    Number.parseInt(value.slice(2, 4), 16) / 255,
    Number.parseInt(value.slice(4, 6), 16) / 255,
  ]
}

function buildInstanceBuffer(items: TesseraItem[]) {
  const data = new Float32Array(items.length * INSTANCE_FLOATS)

  items.forEach((item, index) => {
    const offset = index * INSTANCE_FLOATS
    const [r, g, b] = parseHexColor(item.color)
    data[offset] = item.x
    data[offset + 1] = item.y
    data[offset + 2] = item.size
    data[offset + 3] = item.depth
    data[offset + 4] = item.spreadX
    data[offset + 5] = r
    data[offset + 6] = g
    data[offset + 7] = b
  })

  return data
}

export type TesseraGlRenderer = {
  resize: (width: number, height: number, dpr: number) => void
  setLayout: (items: TesseraItem[]) => void
  draw: (state: TesseraDrawState) => void
  destroy: () => void
}

export function createTesseraGlRenderer(canvas: HTMLCanvasElement): TesseraGlRenderer | null {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  })

  if (!gl) return null

  const program = createProgram(gl)
  if (!program) return null

  gl.useProgram(program)

  const cornerBuffer = gl.createBuffer()
  const instanceBuffer = gl.createBuffer()
  const vao = gl.createVertexArray()

  if (!cornerBuffer || !instanceBuffer || !vao) return null

  gl.bindVertexArray(vao)

  gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, QUAD_CORNERS, gl.STATIC_DRAW)

  const cornerLoc = gl.getAttribLocation(program, 'aCorner')
  gl.enableVertexAttribArray(cornerLoc)
  gl.vertexAttribPointer(cornerLoc, 2, gl.FLOAT, false, 0, 0)
  gl.vertexAttribDivisor(cornerLoc, 0)

  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer)

  const basePosLoc = gl.getAttribLocation(program, 'aBasePos')
  const sizeLoc = gl.getAttribLocation(program, 'aSize')
  const depthLoc = gl.getAttribLocation(program, 'aDepth')
  const spreadLoc = gl.getAttribLocation(program, 'aSpreadX')
  const colorLoc = gl.getAttribLocation(program, 'aColor')

  const stride = INSTANCE_FLOATS * Float32Array.BYTES_PER_ELEMENT

  gl.enableVertexAttribArray(basePosLoc)
  gl.vertexAttribPointer(basePosLoc, 2, gl.FLOAT, false, stride, 0)
  gl.vertexAttribDivisor(basePosLoc, 1)

  gl.enableVertexAttribArray(sizeLoc)
  gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, stride, 8)
  gl.vertexAttribDivisor(sizeLoc, 1)

  gl.enableVertexAttribArray(depthLoc)
  gl.vertexAttribPointer(depthLoc, 1, gl.FLOAT, false, stride, 12)
  gl.vertexAttribDivisor(depthLoc, 1)

  gl.enableVertexAttribArray(spreadLoc)
  gl.vertexAttribPointer(spreadLoc, 1, gl.FLOAT, false, stride, 16)
  gl.vertexAttribDivisor(spreadLoc, 1)

  gl.enableVertexAttribArray(colorLoc)
  gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, stride, 20)
  gl.vertexAttribDivisor(colorLoc, 1)

  gl.bindVertexArray(null)

  const uniforms = {
    viewport: gl.getUniformLocation(program, 'uViewport'),
    layoutSize: gl.getUniformLocation(program, 'uLayoutSize'),
    fitScale: gl.getUniformLocation(program, 'uFitScale'),
    approachDelta: gl.getUniformLocation(program, 'uApproachDelta'),
    spreadRemaining: gl.getUniformLocation(program, 'uSpreadRemaining'),
    parallaxY: gl.getUniformLocation(program, 'uParallaxY'),
    parallaxX: gl.getUniformLocation(program, 'uParallaxX'),
    spreadScale: gl.getUniformLocation(program, 'uSpreadScale'),
    reduceMotion: gl.getUniformLocation(program, 'uReduceMotion'),
  }

  let instanceCount = 0

  return {
    resize(width, height, dpr) {
      const pixelWidth = Math.max(1, Math.floor(width * dpr))
      const pixelHeight = Math.max(1, Math.floor(height * dpr))
      canvas.width = pixelWidth
      canvas.height = pixelHeight
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, pixelWidth, pixelHeight)
    },

    setLayout(items) {
      instanceCount = items.length
      const data = buildInstanceBuffer(items)
      gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
    },

    draw(state) {
      gl.useProgram(program)
      gl.bindVertexArray(vao)

      gl.clearColor(state.background[0], state.background[1], state.background[2], 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform2f(uniforms.viewport, state.viewportWidth, state.viewportHeight)
      gl.uniform2f(uniforms.layoutSize, state.layoutWidth, state.layoutHeight)
      gl.uniform1f(uniforms.fitScale, state.fitScale)
      gl.uniform1f(uniforms.approachDelta, state.approachDelta)
      gl.uniform1f(uniforms.spreadRemaining, state.spreadRemaining)
      gl.uniform1f(uniforms.parallaxY, state.parallaxY)
      gl.uniform1f(uniforms.parallaxX, state.parallaxX)
      gl.uniform1f(uniforms.spreadScale, state.spreadScale)
      gl.uniform1f(uniforms.reduceMotion, state.reduceMotion ? 1 : 0)

      if (instanceCount > 0) {
        gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount)
      }

      gl.bindVertexArray(null)
    },

    destroy() {
      gl.deleteBuffer(cornerBuffer)
      gl.deleteBuffer(instanceBuffer)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    },
  }
}

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { createScatteredStarGeometry, type StarPalette, STAR_SPAN } from './starFieldGeometry'
import { STEER_SHIFT, type StarAscentFlightMetrics } from './StarAscentFlight'
import type { StarAscentSettings } from './starAscentSettings'

const vertexShader = /* glsl */ `
  attribute vec3 color;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScrollOffset;
  uniform float uSpan;
  uniform float uViewportHeight;
  uniform float uFov;
  uniform float uDepthNear;
  uniform float uDepthFar;
  uniform float uScrollSpeed;
  uniform float uMaxPointSize;
  uniform vec2 uSteerOffset;
  varying vec3 vColor;
  varying float vMotionMask;
  varying float vStarSpeed;

  void main() {
    vColor = color;
    vec3 pos = position;
    pos.y = mod(pos.y + uScrollOffset + uSpan, uSpan * 2.0) - uSpan;

    float depthT = clamp(length(pos) / uSpan, 0.0, 1.0);
    float steerParallax = mix(0.4, 1.2, depthT);
    pos.x += uSteerOffset.x * steerParallax;
    pos.y += uSteerOffset.y * steerParallax;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float scale = uViewportHeight / (2.0 * tan(radians(uFov * 0.5)));
    float viewZ = max(-mvPosition.z, 0.001);
    float pointSize = uSize * uPixelRatio * scale / viewZ;
    gl_PointSize = min(pointSize, uMaxPointSize);

    float viewDist = length(mvPosition.xyz);
    float depthSpan = max(uDepthFar - uDepthNear, 0.001);
    float frontCutoff = uDepthNear + depthSpan * 0.4;
    vMotionMask = 1.0 - smoothstep(frontCutoff - 6.0, frontCutoff + 8.0, viewDist);

    float motionDepthT = 1.0 - clamp((viewDist - uDepthNear) / depthSpan, 0.0, 1.0);
    float parallax = mix(0.12, 1.0, motionDepthT);
    vStarSpeed = uScrollSpeed * parallax * vMotionMask;
  }
`

const BLUR_MAX = 2.2

const fragmentShader = /* glsl */ `
  uniform float uScrollSpeed;
  uniform float uMotionBrightness;
  uniform float uFieldOpacity;
  varying vec3 vColor;
  varying float vStarSpeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float speedT =
      uScrollSpeed > 0.001 ? clamp(vStarSpeed / uScrollSpeed, 0.0, 1.0) : 0.0;

    float edge = max(abs(uv.x), abs(uv.y));
    if (edge > 0.5) discard;

    float motionBoost = mix(1.0, uMotionBrightness, speedT);
    vec3 boosted = vColor * motionBoost;
    float peak = max(max(boosted.r, boosted.g), boosted.b);
    if (peak > 1.0) {
      boosted /= peak;
    }
    gl_FragColor = vec4(boosted, uFieldOpacity);
  }
`

export function ScrollStarField({
  scrollPxRef,
  velocityPxRef,
  progressRef,
  flightMetricsRef,
  settings,
  rotationSpeed,
  seed,
  palette,
  reduceMotion,
}: {
  scrollPxRef: React.RefObject<number>
  velocityPxRef: React.RefObject<number>
  progressRef: React.RefObject<number>
  flightMetricsRef: React.RefObject<StarAscentFlightMetrics>
  settings: StarAscentSettings
  rotationSpeed: number
  seed: number
  palette: StarPalette
  reduceMotion: boolean
}) {
  const { starSize, starCount, motionBrightness, motionBlur, flightSpeed: flightSpeedSetting, colors } =
    settings
  const { size, camera } = useThree()
  const pointsRef = useRef<THREE.Points>(null)
  const scrollSpeedRef = useRef(0)
  const geometry = useMemo(
    () => createScatteredStarGeometry(seed, palette, starCount, colors),
    [
      seed,
      palette.light,
      palette.orange,
      palette.purple,
      palette.blue,
      starCount,
      colors.light,
      colors.orange,
      colors.purple,
      colors.blue,
    ],
  )

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: starSize },
        uPixelRatio: { value: 1 },
        uScrollOffset: { value: 0 },
        uSpan: { value: STAR_SPAN },
        uViewportHeight: { value: 1 },
        uFov: { value: 32 },
        uDepthNear: { value: 4 },
        uDepthFar: { value: 80 },
        uScrollSpeed: { value: 0 },
        uMaxPointSize: { value: 8 },
        uMotionBrightness: { value: motionBrightness },
        uSteerOffset: { value: new THREE.Vector2(0, 0) },
        uFieldOpacity: { value: 1 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    mat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5)
    return mat
  }, [])

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((_, delta) => {
    const scrollPx = scrollPxRef.current ?? 0
    const viewportH = size.height || window.innerHeight
    const persp = camera as THREE.PerspectiveCamera
    const fovRad = (persp.fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(fovRad / 2) * Math.abs(persp.position.z)
    const pixelToWorld = visibleHeight / viewportH

    const cameraDist = Math.abs(persp.position.z)
    const depthNear = Math.max(cameraDist - STAR_SPAN, 1)
    const depthFar = cameraDist + STAR_SPAN * 1.35

    const pixelRatio = Math.min(window.devicePixelRatio, 1.5)
    const scaleFactor = viewportH / (2 * Math.tan(fovRad / 2))
    const refViewDepth = Math.max(cameraDist * 0.9, 8)
    const maxPointSize = (starSize * pixelRatio * scaleFactor) / refViewDepth

    material.uniforms.uScrollOffset.value = scrollPx * pixelToWorld
    material.uniforms.uSize.value = starSize
    material.uniforms.uMaxPointSize.value = maxPointSize
    material.uniforms.uMotionBrightness.value = motionBrightness
    material.uniforms.uPixelRatio.value = pixelRatio
    material.uniforms.uViewportHeight.value = viewportH
    material.uniforms.uFov.value = persp.fov
    material.uniforms.uDepthNear.value = depthNear
    material.uniforms.uDepthFar.value = depthFar

    const progress = progressRef.current ?? 0
    const marsBlend = THREE.MathUtils.clamp((progress - 0.48) / 0.42, 0, 1)
    material.uniforms.uFieldOpacity.value = 1 - marsBlend * 0.94

    const flightActive = flightMetricsRef.current?.active ?? false
    const steerX = flightMetricsRef.current?.steerX ?? 0
    const steerY = flightMetricsRef.current?.steerY ?? 0
    const steerStrength = STEER_SHIFT * flightSpeedSetting
    material.uniforms.uSteerOffset.value.set(-steerX * steerStrength, steerY * steerStrength)

    if (pointsRef.current && !reduceMotion && rotationSpeed !== 0 && !flightActive) {
      pointsRef.current.rotation.y += delta * rotationSpeed
    }

    if (reduceMotion) {
      scrollSpeedRef.current = 0
      material.uniforms.uScrollSpeed.value = 0
      return
    }

    const velocityPxPerSec = Math.abs(velocityPxRef.current ?? 0)
    const blurCap = BLUR_MAX * motionBlur
    const flightVelocity = flightMetricsRef.current?.speed ?? 0
    const targetScrollSpeed = flightActive
      ? Math.min(flightVelocity * 0.085 * motionBlur, blurCap)
      : Math.min(velocityPxPerSec * 0.0022 * motionBlur, blurCap)
    scrollSpeedRef.current +=
      (targetScrollSpeed - scrollSpeedRef.current) * (1 - Math.exp(-delta / 0.04))

    material.uniforms.uScrollSpeed.value = scrollSpeedRef.current
  })

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={-1}
    />
  )
}

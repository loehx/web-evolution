import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import { MOON_LOOK_Y, smoothstep } from './StarAscentScrollRig'
import {
  MOON_ATMOSPHERE,
  MOON_COLOR_GRADE,
  MOON_EXPOSURE,
  MOON_PLANET,
  MOON_SUN,
  loadMoonTextures,
} from './moonAssets'
import {
  applyMoonAngularVelocity,
  applyMoonScreenDrag,
  composeMoonOrientation,
  type MoonTrackballVelocity,
} from './moonTrackball'

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionView;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vPositionView = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const atmosphereFragment = /* glsl */ `
  uniform vec3 uSunDirection;
  uniform vec3 uDayColor;
  uniform vec3 uTwilightColor;
  uniform float uPower;
  uniform float uIntensity;
  uniform float uReveal;

  varying vec3 vNormalView;
  varying vec3 vPositionView;

  void main() {
    vec3 viewDir = normalize(vPositionView);
    vec3 normal = normalize(vNormalView);

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uPower);
    float sunFacing = dot(normal, normalize(uSunDirection));
    float dayMix = smoothstep(-0.35, 0.65, sunFacing);
    vec3 scatter = mix(uTwilightColor, uDayColor, dayMix);

    float alpha = fresnel * uIntensity * mix(0.35, 1.0, dayMix) * uReveal;
    gl_FragColor = vec4(scatter, alpha);
  }
`

const surfaceVertex = /* glsl */ `
  uniform sampler2D uDisplacementMap;
  uniform float uDisplacementScale;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vTangent;
  varying vec3 vBitangent;

  void main() {
    vUv = uv;

    float height = texture2D(uDisplacementMap, uv).r;
    vec3 displaced = position + normal * height * uDisplacementScale;
    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);

    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);

    vec3 t = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    if (length(t) < 0.001) {
      t = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
    }
    vec3 b = cross(normal, t);
    vTangent = normalize(mat3(modelMatrix) * t);
    vBitangent = normalize(mat3(modelMatrix) * b);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const surfaceFragment = /* glsl */ `
  uniform sampler2D uColorMap;
  uniform sampler2D uNormalMap;
  uniform sampler2D uDisplacementMap;
  uniform vec3 uSunDirection;
  uniform float uSunIntensity;
  uniform vec3 uSunColor;
  uniform float uNormalScale;
  uniform float uRoughness;
  uniform float uReveal;
  uniform float uColorSaturation;
  uniform float uColorLighten;
  uniform float uExposure;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vTangent;
  varying vec3 vBitangent;

  vec3 perturbNormal(vec3 baseNormal, vec3 tangent, vec3 bitangent, vec2 uv) {
    vec3 map = texture2D(uNormalMap, uv).xyz * 2.0 - 1.0;
    map.xy *= uNormalScale;
    mat3 tbn = mat3(tangent, bitangent, baseNormal);
    return normalize(tbn * map);
  }

  float sampleHeight(vec2 uv) {
    return texture2D(uDisplacementMap, uv).r;
  }

  vec3 gradeColor(vec3 color) {
    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vec3 desat = mix(vec3(luma), color, uColorSaturation);
    return mix(desat, vec3(1.0), uColorLighten);
  }

  void main() {
    vec3 baseColor = gradeColor(texture2D(uColorMap, vUv).rgb);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 worldNormal = normalize(vWorldNormal);
    vec3 normal = perturbNormal(worldNormal, vTangent, vBitangent, vUv);

    vec3 sunDir = normalize(uSunDirection);
    float ndl = dot(normal, sunDir);
    float ndlMacro = dot(worldNormal, sunDir);

    float terminator = smoothstep(-0.06, 0.18, ndl);
    float diffuse = max(ndl, 0.0);

    float height = sampleHeight(vUv);
    float hL = sampleHeight(vUv + vec2(-0.0016, 0.0));
    float hR = sampleHeight(vUv + vec2(0.0016, 0.0));
    float hD = sampleHeight(vUv + vec2(0.0, -0.0016));
    float hU = sampleHeight(vUv + vec2(0.0, 0.0016));
    vec3 slope = vec3(hL - hR, hD - hU, 0.035);
    vec3 creviceNormal = normalize(worldNormal + slope * 2.4);
    float creviceShadow = smoothstep(-0.05, 0.35, dot(creviceNormal, sunDir));
    float reliefShadow = smoothstep(-0.12, 0.28, ndlMacro + (ndl - ndlMacro) * 1.6);
    float shadowMask = creviceShadow * reliefShadow;

    vec3 lit = baseColor * (
      uSunColor * (diffuse * uSunIntensity * shadowMask)
    );

    vec3 halfDir = normalize(sunDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), mix(12.0, 48.0, 1.0 - uRoughness));
    spec *= 0.042 * terminator * (1.0 - uRoughness) * shadowMask;

    lit = mix(vec3(0.0), lit + spec, terminator);

    lit *= uExposure;
    lit *= mix(0.0, 1.0, uReveal);
    gl_FragColor = vec4(lit, uReveal);
  }
`

type MoonTextures = Awaited<ReturnType<typeof loadMoonTextures>>

const DRAG_SENSITIVITY = 0.1125

function MoonAtmosphere({
  radius,
  revealRef,
}: {
  radius: number
  revealRef: RefObject<number>
}) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uSunDirection: { value: MOON_SUN.direction.clone() },
        uDayColor: { value: MOON_ATMOSPHERE.color },
        uTwilightColor: { value: MOON_ATMOSPHERE.twilight },
        uPower: { value: MOON_ATMOSPHERE.power },
        uIntensity: { value: MOON_ATMOSPHERE.intensity },
        uReveal: { value: 0 },
      },
      vertexShader: atmosphereVertex,
      fragmentShader: atmosphereFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  }, [])

  useFrame(() => {
    material.uniforms.uReveal.value = revealRef.current ?? 0
  })

  return (
    <mesh scale={MOON_ATMOSPHERE.scale} renderOrder={2}>
      <sphereGeometry args={[radius, 96, 96]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function MoonSurface({
  textures,
  progressRef,
  orientationRef,
  pendingRef,
  velocityRef,
  isDraggingRef,
  isDragging,
  inertiaDecay,
  rollSpeed,
  reduceMotion,
}: {
  textures: MoonTextures
  progressRef: RefObject<number>
  orientationRef: RefObject<THREE.Quaternion>
  pendingRef: RefObject<{ dx: number; dy: number }>
  velocityRef: RefObject<MoonTrackballVelocity>
  isDraggingRef: RefObject<boolean>
  isDragging: boolean
  inertiaDecay: number
  rollSpeed: number
  reduceMotion: boolean
}) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const revealRef = useRef(0)
  const autoSpinRef = useRef(0)
  const baseTilt = useMemo(
    () =>
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(MOON_PLANET.tiltX, 0, MOON_PLANET.tiltZ, 'YXZ'),
      ),
    [],
  )

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorMap: { value: textures.color },
        uNormalMap: { value: textures.normal },
        uDisplacementMap: { value: textures.displacement },
        uSunDirection: { value: MOON_SUN.direction.clone() },
        uSunIntensity: { value: MOON_SUN.intensity },
        uSunColor: { value: new THREE.Color(MOON_SUN.color) },
        uNormalScale: { value: 1.65 },
        uRoughness: { value: 0.9 },
        uDisplacementScale: { value: 0.12 },
        uReveal: { value: 0 },
        uColorSaturation: { value: MOON_COLOR_GRADE.saturation },
        uColorLighten: { value: MOON_COLOR_GRADE.lighten },
        uExposure: { value: MOON_EXPOSURE },
      },
      vertexShader: surfaceVertex,
      fragmentShader: surfaceFragment,
      transparent: true,
    })
  }, [textures])

  useFrame((_, delta) => {
    const progress = progressRef.current ?? 0
    const reveal = smoothstep(0.52, 0.88, progress)
    revealRef.current = reveal
    material.uniforms.uReveal.value = reveal

    if (!groupRef.current) return

    isDraggingRef.current = isDragging

    const pending = pendingRef.current
    if (pending.dx !== 0 || pending.dy !== 0) {
      applyMoonScreenDrag(
        orientationRef.current,
        camera,
        pending.dx,
        pending.dy,
        DRAG_SENSITIVITY,
      )
      pending.dx = 0
      pending.dy = 0
    }

    const coasting =
      Math.abs(velocityRef.current.h) > 0.04 ||
      Math.abs(velocityRef.current.v) > 0.04

    if (!reduceMotion && !isDragging) {
      if (coasting) {
        applyMoonAngularVelocity(
          orientationRef.current,
          camera,
          velocityRef.current,
          delta,
        )
        const damp = Math.exp(-inertiaDecay * delta)
        velocityRef.current.h *= damp
        velocityRef.current.v *= damp
        if (Math.abs(velocityRef.current.h) < 0.04) velocityRef.current.h = 0
        if (Math.abs(velocityRef.current.v) < 0.04) velocityRef.current.v = 0
      } else if (reveal > 0.35) {
        autoSpinRef.current += delta * rollSpeed
      }
    }

    composeMoonOrientation(
      groupRef.current.quaternion,
      baseTilt,
      orientationRef.current,
      autoSpinRef.current,
    )

    const scale = THREE.MathUtils.lerp(0.04, 1, reveal)
    groupRef.current.scale.setScalar(scale)
    groupRef.current.position.y = MOON_LOOK_Y
  })

  return (
    <group ref={groupRef} position={[0, MOON_LOOK_Y, 0]}>
      <mesh renderOrder={1}>
        <sphereGeometry
          args={[
            MOON_PLANET.radius,
            MOON_PLANET.widthSegments,
            MOON_PLANET.heightSegments,
          ]}
        />
        <primitive object={material} attach="material" />
      </mesh>
      <MoonAtmosphere radius={MOON_PLANET.radius} revealRef={revealRef} />
    </group>
  )
}

export function MoonPlanet({
  progressRef,
  orientationRef,
  pendingRef,
  velocityRef,
  isDragging,
  isDraggingRef,
  inertiaDecay,
  rollSpeed = MOON_PLANET.autoSpinSpeed,
  reduceMotion = false,
}: {
  progressRef: RefObject<number>
  orientationRef: RefObject<THREE.Quaternion>
  pendingRef: RefObject<{ dx: number; dy: number }>
  velocityRef: RefObject<MoonTrackballVelocity>
  isDragging: boolean
  isDraggingRef: RefObject<boolean>
  inertiaDecay: number
  rollSpeed?: number
  reduceMotion?: boolean
}) {
  const [textures, setTextures] = useState<MoonTextures | null>(null)

  useEffect(() => {
    let alive = true
    loadMoonTextures()
      .then((maps) => {
        if (alive) setTextures(maps)
      })
      .catch(() => {
        if (alive) setTextures(null)
      })
    return () => {
      alive = false
    }
  }, [])

  if (!textures) return null

  return (
    <MoonSurface
      textures={textures}
      progressRef={progressRef}
      orientationRef={orientationRef}
      pendingRef={pendingRef}
      velocityRef={velocityRef}
      isDraggingRef={isDraggingRef}
      isDragging={isDragging}
      inertiaDecay={inertiaDecay}
      rollSpeed={rollSpeed}
      reduceMotion={reduceMotion}
    />
  )
}

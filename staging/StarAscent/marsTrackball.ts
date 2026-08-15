import * as THREE from 'three'

const DEG2RAD = Math.PI / 180
const _right = new THREE.Vector3()
const _up = new THREE.Vector3()
const _qH = new THREE.Quaternion()
const _qV = new THREE.Quaternion()
const _localY = new THREE.Vector3(0, 1, 0)

export type MarsTrackballVelocity = {
  /** Horizontal spin in deg/s (screen-left drag). */
  h: number
  /** Vertical spin in deg/s (screen-up drag). */
  v: number
}

function cameraScreenAxes(camera: THREE.Camera, up: THREE.Vector3, right: THREE.Vector3) {
  right.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize()
  up.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize()
}

/** Rotate in camera screen space — works when the planet is upside down. */
export function applyMarsScreenDrag(
  orientation: THREE.Quaternion,
  camera: THREE.Camera,
  deltaX: number,
  deltaY: number,
  sensitivityDegPerPx: number,
) {
  cameraScreenAxes(camera, _up, _right)
  _qH.setFromAxisAngle(_up, deltaX * sensitivityDegPerPx * DEG2RAD)
  _qV.setFromAxisAngle(_right, deltaY * sensitivityDegPerPx * DEG2RAD)
  orientation.premultiply(_qH).premultiply(_qV)
}

export function applyMarsAngularVelocity(
  orientation: THREE.Quaternion,
  camera: THREE.Camera,
  velocity: MarsTrackballVelocity,
  delta: number,
) {
  if (Math.abs(velocity.h) < 0.001 && Math.abs(velocity.v) < 0.001) return

  cameraScreenAxes(camera, _up, _right)
  _qH.setFromAxisAngle(_up, velocity.h * delta * DEG2RAD)
  _qV.setFromAxisAngle(_right, velocity.v * delta * DEG2RAD)
  orientation.premultiply(_qH).premultiply(_qV)
}

export function composeMarsOrientation(
  target: THREE.Quaternion,
  baseTilt: THREE.Quaternion,
  userOrientation: THREE.Quaternion,
  autoSpinAngle: number,
) {
  _qH.setFromAxisAngle(_localY, autoSpinAngle)
  target.copy(baseTilt).multiply(userOrientation).multiply(_qH)
}

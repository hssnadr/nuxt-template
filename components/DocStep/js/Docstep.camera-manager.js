const TWEEN = require('@tweenjs/tween.js') // see: https://github.com/tweenjs/tween.js

class CameraManager {
  constructor(width_, height_) {
    this.width = width_
    this.height = height_

    const aspect = this.width / this.height

    // this.camera = new THREE.PerspectiveCamera(70, aspect, 1, 3000) // args = field of view (degree), ratio, near clipping plane, far clipping plane
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000
    )

    this.camera.position.z = 200
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()

    // Tween test
    this.moveCameraTo(new THREE.Vector3(0, 200, 0), 1000)
  }

  moveCameraTo(targetPos_, time_) {
    const camPos_ = this.camera.position
    const tween = new TWEEN.Tween(camPos_).to(targetPos_, time_)
    tween.easing(TWEEN.Easing.Quintic.Out)
    tween.onUpdate(() => {
      // console.log(camPos_.x, camPos_.y, camPos_.z)
    })
    tween.onComplete(() => {
      console.log('camera move complete')
    })
    tween.start()
  }
}

const cameraManager = (args) => new CameraManager(args)
export default cameraManager

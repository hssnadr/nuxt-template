import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Part from "./Product.part"
import { SafeArray } from "../UTILITIES"

export default class Product {
  constructor() {
    this.product = new SafeArray();
  }
  loadGLTF(parent_, path_) {
    this.loader = new GLTFLoader()
    this.isLoaded = false // USELESS ?

    this.loader.load(path_, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const cloneChild = child.clone()

          // STEP PART
          this.part = this.createPart(parent_, cloneChild.name)
          this.part.setModel(cloneChild)
          this.part.setColor({r: Math.random(), g:Math.random(), b:Math.random()})
          // this.part.setOpacity(0.5)

          // STEP PRODUCT
          // this.product = new Product(this.scene, cloneChild.name)
          // this.product.addComponent(Part, cloneChild)
        }
        setTimeout(() => {
          this.isLoaded = true
        }, 200)
      })
    })
  }
  createPart(parent_, name_) {
    const part_ = new Part(parent_, name_)
    console.log(`createPart, name = ${name_}`)
    this.product.add(part_)

    // TEST
    part_.playAnimIn()

    return part_;
  }
  removePart(part_) {
    this.product.remove(part_);
  }
  setColor(color_) {
    this.product.forEach(part_ => {
      part_.setColor(color_)
    })
  }
  showAll() {
    this.product.forEach(part_ => {
      part_.setOpacity(1.0)
      part_.show()
    });
  }
  pushStep(step_) {
    this.product.forEach(part_ => part_.pushStep(step_));
  } 

  update() {
    this.product.forEach(part_ => part_.update());
  }

  // prepModelsAndAnimations() {
  //   Object.values(models).forEach(model => {
  //     console.log('------->:', model.url);
  //     const animsByName = {};
  //     model.gltf.animations.forEach((clip) => {
  //       animsByName[clip.name] = clip;
  //       console.log('  ', clip.name);
  //     });
  //     model.animations = animsByName;
  //   });
  // }
}
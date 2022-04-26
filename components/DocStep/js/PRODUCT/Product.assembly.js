import Part from "./Product.part"

export default class Assembly extends Part {
  constructor(parent_, name_) {
    console.log("call assembly constructor")
    super(parent_, name_)
  }
  addPart(model_) {
    // set default material
    model_.material.map = null // reset original material
    model_.material = new THREE.MeshLambertMaterial()

    // add to transform
    this.transform.add(model_)
  }
}
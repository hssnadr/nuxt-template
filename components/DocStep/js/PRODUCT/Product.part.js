import { removeArrayElement } from '../UTILITIES/Utilities.array'
const TWEEN = require('@tweenjs/tween.js') // see: https://github.com/tweenjs/tween.js

function setVectAxis(vector_, axis_, val_) {
    switch (axis_) {
        case 'x':
            vector_.x = val_
            break
        case 'y':
            vector_.y = val_
            break
        case 'z':
            vector_.z = val_
            break
        default:
            console.log('bad coordinates')
            break
    }
    return vector_
}

export default class Part {
    #id;

    constructor(parent_, name_) {
        console.log(`call part constructor ${parent_.position.x} ${parent_.position.y} ${parent_.position.z} + ${name_}`);

        // Initialize params
        this.#id = name_
        this.stepIn = 0
        this.stepOut = -1
        this.offsetInTrans = new THREE.Vector3(0, 0, 0)
        this.offsetInRot = new THREE.Vector3(0, 0, 0)

        // Get params
        this.extractProps(name_)
        console.log("-----------------")
        console.log(this.offsetInTrans)
        console.log(this.offsetInRot)
        console.log("-----------------")

        // this.components = []
        this.parent = parent_
        this.transform = new THREE.Group() // vs THREE.Object3D() ?
        this.parent.add(this.transform)
        this.opacity = 1.0
    }
    extractProps(name_) {
        const data_ = name_.split('_') // split data info
        if (data_.length > 1) {
            this.stepIn = parseInt(data_[0], 10)
            this.#id = data_[1]

            data_.splice(2).forEach((e) => {
                const option_ = e.substring(0, 3)
                const val_ = e.substring(3)

                switch (option_.toLowerCase()) {
                    case 'out':
                        this.stepOut = parseInt(val_, 10)
                        break
                    case 'tra':
                        // Make a translation
                        const axisTr_ = val_.substring(0, 1).toLowerCase()
                        const offsetTr_ = parseInt(val_.substring(1), 10)
                        this.offsetInTrans = setVectAxis(this.offsetInTrans, axisTr_, offsetTr_)
                        break
                    case 'rot':
                        // Make a rotation
                        const axRt_ = val_.substring(0, 1).toLowerCase()
                        const offsetRt_ = parseInt(val_.substring(1), 10)
                        this.offsetInRot = setVectAxis(this.offsetInRot, axRt_, offsetRt_)
                        break
                    default:
                        break
                }
            })
        }
    }
    setModel(model_) {
        // set default material
        model_.material.map = null // reset original material
        // model_.material = new THREE.MeshLambertMaterial()
        model_.material = new THREE.MeshLambertMaterial({
            // color: newcolor,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        })

        // add to transform
        this.transform.clear() // remove existing model if exists
        this.transform.add(model_)
    }
    show() {
        if (!this.transform.visible) { this.transform.visible = true }
    }
    hide() {
        if (this.transform.visible) { this.transform.visible = false }
    }
    setColor(color_) {
        const { r, g, b } = color_
        if (typeof r != undefined && typeof g != undefined && typeof b != undefined) {
            this.transform.children.forEach(child => {
                child.material.color = color_
            });
        }
    }
    setOpacity(opacity_) {
        this.opacity = opacity_
        this.transform.children.forEach(child => {
            child.material.opacity = this.opacity
        });
    }
    playAnimIn() {
        const from_ = new THREE.Vector3()
        const to_ = new THREE.Vector3()

        // Translation
        if (this.offsetInTrans.length()) {
            from_.subVectors(this.transform.position, this.offsetInTrans) // position - offsetInTrans
            to_.copy(this.transform.position)
            this.transform.position.copy(from_)
            this.moveTo(to_, 3000)
        }

        // Rotation
        if (this.offsetInRot.length()) {
            /** 
             * TO FIX !! ->>> this.transform.CHILD(??).rotation
             *  surement besoin de change from_ et to_ sinon conflit avec au dessus
             */
            // from_.subVectors(this.transform.rotation, this.offsetInRot)
            // to_.copy(this.transform.rotation)
            // this.transform.rotation.copy(from_)
            // this.rotateTo(to_, 3000)
        }

        // Opacity
        this.show()
        const opacity_ = new THREE.Vector2(0.0, 0.0)
        const tweenOpacity = new TWEEN.Tween(opacity_).to({ x: 1.0 }, 1500)
        // tweenOpacity.easing(TWEEN.Easing.Quintic.In)
        tweenOpacity.onUpdate(() => {
            this.setOpacity(opacity_.x)
        })
        tweenOpacity.onComplete(() => {
            this.setOpacity(1.0)
            console.log(`${this.#id} opacity complete`)
        })
        tweenOpacity.start()
    }
    playAnimOut() {
        if (this.opacity) {
            // Opacity
            const opacity_ = new THREE.Vector2(this.opacity, 0.0)
            const tweenOpacOut_ = new TWEEN.Tween(opacity_).to({ x: 0.0 }, 1500)
            tweenOpacOut_.easing(TWEEN.Easing.Quintic.Out)
            tweenOpacOut_.onUpdate(() => {
                this.setOpacity(opacity_.x)
            })
            tweenOpacOut_.onComplete(() => {
                console.log(`${this.#id} opacity complete`)
                this.setOpacity(0.0)
            })
            tweenOpacOut_.start()
        }
    }
    moveTo(targetPos_, time_) {
        const tweenMove = new TWEEN.Tween(this.transform.position).to(targetPos_, time_)
        tweenMove.easing(TWEEN.Easing.Quintic.Out)
        tweenMove.onComplete(() => {
            console.log(`${this.#id} move complete`)
        })
        tweenMove.start()
    }
    rotateTo(targetRot_, time_) {
        /** 
         * TO FIX !! ->>> this.transform.CHILD(??).rotation
         */
        const tweenRotate = new TWEEN.Tween(this.transform.rotation).to(targetRot_, time_)
        tweenRotate.easing(TWEEN.Easing.Quintic.Out)
        tweenRotate.onComplete(() => {
            console.log(`${this.#id} rotation complete`)
        })
        tweenRotate.start()
    }
    pushStep(step_) {
        this.hide()
        if (step_ >= this.stepIn) {
            if (step_ == this.stepIn) { this.playAnimIn() } // play entrance animation
            this.show()
            if (this.stepOut != -1 && step_ >= this.stepOut) {
                this.hide()
                // this.playAnimOut()
            }
            // else {
            //     this.show()
            // }
        }
        // else { this.playAnimOut() }
    }
    addComponent(ComponentType, ...args) {
        const component = new ComponentType(this, ...args);
        this.components.push(component)
        return component;
    }
    removeComponent(component) {
        removeArrayElement(this.components, component)
    }
    getComponent(ComponentType) {
        return this.components.find(c => c instanceof ComponentType)
    }
    update() {
        TWEEN.update()

        if (!this.opacity) { this.hide() } // Opacity check : 0 => hide

        for (const component of this.components) {
            component.update()
        }
    }
}
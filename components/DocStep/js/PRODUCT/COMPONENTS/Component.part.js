/**
 * Based on: https://threejs.org/manual/#en/game
 */

import Component from './Component.main'

export default class Part extends Component {
    constructor(parent, mesh_) {
        super(parent);
        this.name = "Alain"
        this.mesh = mesh_
        if(typeof parent.transform != undefined) {
            parent.transform.add(mesh_)
        }
    }

    update() {
        console.log("Hello comp mesh");
    }
}
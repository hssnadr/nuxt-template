<template>
  <div ref="container" class="threejs-scene"></div>
</template>

<script>
import SceneManager from './js/Docstep.scene-manager'

export default {
  props: {
    docId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
    this.$nuxt.$on('DOCSTEP-CURSTEP', this.setStepScene)
  },
  beforeDestroy() {
    this.$nuxt.$off('DOCSTEP-CURSTEP')
  },
  mounted() {
    this.scene = SceneManager({ rootEl: this.$refs.container }) // init scene from javascript class

    console.log('Loading parts...')
    this.loadAllParts()
  },
  methods: {
    updateMesh() {},
    loadAllParts() {
      this.scene.loadModel(this.docId) // Load 3d model into class docstep.js
    },
    createWireframe({ mesh, color = 0x000000, linewidth = 4 } = {}) {
      // Generate 3d wireframe on object geometry
      const material = new THREE.LineBasicMaterial({ color, linewidth })
      const geometry = new THREE.EdgesGeometry(mesh.geometry)

      const wireframe = new THREE.LineSegments(geometry, material)

      wireframe.name = '_wireframe'
      wireframe.renderOrder = 1

      mesh.add(wireframe)
    },
    setStepScene(stepIndex_) {
      console.log(stepIndex_)
      // this.scene.showPart('0_SensorsSupport')
      this.scene.pushStepConfig(stepIndex_)
    }
  }
}
</script>

<style lang="scss">
.threejs-scene {
  background: lightgreen;
  width: 100%;
  height: 100%;
}
</style>

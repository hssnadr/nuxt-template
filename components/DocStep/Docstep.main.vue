<template>
  <div class="docstep-main">
    <div class="gui-container">
      <doc-gui class="gui" :doc-id="docId" />
    </div>
    <doc-scene class="scene" :doc-id="docId" />
    <doc-content class="content" />
  </div>
</template>

<script>
import DocGui from './Docstep.gui.vue'
import DocScene from './Docstep.scene.vue'
import DocContent from './Docstep.content.vue'

export default {
  components: {
    DocGui,
    DocScene,
    DocContent
  },
  props: {
    docId: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss">
.docstep-main {
  background: lightblue;
  position: relative;

  .scene {
    width: 100vw;
    height: 100vh;
  }
  .gui-container {
    position: absolute;
    left: 0;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>

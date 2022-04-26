<template>
  <div class="sensitive-pen">
    {{ mavar }}
    <doc-step :doc-id="'sensitive-pen'" />
  </div>
</template>

<script>
import DocStep from './../DocStep/Docstep.main.vue'

export default {
  components: {
    DocStep
  },
  data() {
    return {
      mavar: 'to'
    }
  },
  created() {
    this.$nuxt.$on('ONFOCUS-THREEJS', this.setCurFocus)
  },
  beforeDestroy() {
    this.$nuxt.$off('ONFOCUS-THREEJS')
  },
  methods: {
    setCurFocus(obj_) {
      if (Object.prototype.hasOwnProperty.call(obj_, 'name')) {
        this.mavar = obj_.name
      }
    }
  }
}
</script>

<style lang="scss">
.montessorizer-project {
  width: 100vw;
  height: 100vh;
  background: red;
}
</style>

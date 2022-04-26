<template>
  <div class="docstep-content"></div>
</template>

<script>
export default {
  created() {
    this.$nuxt.$on('DOCSTEP-CURSTEP', this.setStepContent)
  },
  beforeDestroy() {
    this.$nuxt.$off('DOCSTEP-CURSTEP')
  },
  methods: {
    setStepContent(stepIndex_) {
      console.log(stepIndex_)
    }
  }
}
</script>

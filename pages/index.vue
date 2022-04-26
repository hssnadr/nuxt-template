<template>
  <div>
    <p>Ceci est un <a>test</a></p>
    <NuxtLink to="/MotionLab"> MotionLab </NuxtLink>
    <portfolio-grid />
  </div>
</template>

<script>
import PortfolioGrid from "~/components/portfolio/PortfolioGrid.vue"

export default {
  components: {
    PortfolioGrid
  }
}
</script>

<style lang="scss">
</style>
<template>
  <div>
    <input
      id="yselector"
      v-model="yselect"
      type="range"
      :min="year0"
      :max="year1"
      @change="setYears"
    />
    <div v-if="isRange">
      <p>{{ yselect }} - {{ year1 }}</p>
    </div>
    <div v-else>
      <p>{{ yselect }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year0: 1989,
      year1: 2020,
      checked: false,
      yselect: 1984
    }
  },
  computed: {
    isRange() {
      return this.yselect !== this.year1
    }
  },
  mounted() {
    this.year0 = this.$store.getters['projects/getYears'].y0
    this.year1 = this.$store.getters['projects/getYears'].y1

    this.yselect = this.year0
    this.$store.commit('projects/setYears', {
      y0: this.yselect,
      y1: this.year1
    })
  },
  methods: {
    setYears() {
      this.$store.commit('projects/setYears', {
        y0: this.yselect,
        y1: this.year1
      })
    }
  }
}
</script>

<style></style>

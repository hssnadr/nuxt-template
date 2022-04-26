<template>
  <div>
    {{ testMessage2 }}
    <button-filter
      :id="'AllSkills'"
      ref="all"
      :init="isFilter"
      @selected="setAll"
    ></button-filter>
    <div v-show="isFilter">
      <button-filter
        v-for="(fld_, index) in allSkills"
        :id="fld_"
        ref="foo"
        :key="index"
        @selected="setSkill"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterSkills',
  data() {
    return {
      testMessage2: 'nothing',
      isFilter: false
    }
  },
  computed: {
    ...mapGetters({
      allSkills: 'projects/allSkills'
    })
  },
  created() {
    // Replace by SetSkill.call(this) ?????
    this.isFilter = false
    this.allSkills.forEach((skl_) => {
      this.setSkill({ id: skl_, state: false })
    })
  },
  methods: {
    setSkill(data_) {
      this.testMessage2 = data_.id + data_.state
      this.$store.commit('projects/setSkill', data_)
    },
    setAll(data_) {
      if (!data_.state) {
        this.allSkills.forEach((fld_) => {
          this.setSkill({ id: fld_, state: false })
        })
      } else {
        this.$refs.foo.forEach((vuSkl_) => {
          vuSkl_.emitState()
        })
      }
      this.isFilter = data_.state
    }
  }
}
</script>

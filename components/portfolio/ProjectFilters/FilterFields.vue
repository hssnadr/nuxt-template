<template>
  <div>
    {{ testMessage2 }}
    <button-filter
      :id="'AllFields'"
      ref="all"
      :init="isFilter"
      @selected="setAll"
    ></button-filter>
    <div v-show="isFilter" style="background-color: yellow;">
      <button-filter
        v-for="(fld_, index) in allFields"
        :id="fld_"
        ref="foo"
        :key="index"
        @selected="setField"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterFields',
  data() {
    return {
      testMessage2: 'nothing',
      isFilter: false
    }
  },
  computed: {
    ...mapGetters({
      allFields: 'projects/allFields'
    })
  },
  created() {
    this.isFilter = false
    this.allFields.forEach((fld_) => {
      this.setField({ id: fld_, state: false })
    })
  },
  methods: {
    setField(data_) {
      this.testMessage2 = data_.id + data_.state
      this.$store.commit('projects/setField', data_)
    },
    setAll(data_) {
      if (!data_.state) {
        this.allFields.forEach((fld_) => {
          this.setField({ id: fld_, state: false })
        })
      } else {
        this.$refs.foo.forEach((vuFld_) => {
          vuFld_.emitState()
        })
      }
      this.isFilter = data_.state
    }
  }
}
</script>

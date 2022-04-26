<template>
  <div class="docstep-gui">
    <!-- client-only (ex no-ssr) -> client-side rendered virtual DOM tree issues related to static/.json access -->
    <client-only>
      <ul id="parts" class="disable-select" @mouseleave="hoverPart = ''">
        <li
          v-for="(part, partIndex) in dataSteps.parts"
          :key="partIndex"
          @mouseover="hoverPart = partIndex"
          @click="hoverPart = partIndex"
        >
          <!-- PART -->
          <span
            :class="[
              part.id === focusPart ? 'activepart-on' : 'activepart-off'
            ]"
          >
            {{ part.id }} - {{ part.name }}
          </span>

          <!-- STEPS -->
          <ul
            v-if="hoverPart === partIndex || part.id === focusPart"
            id="steps"
            class="step-list"
          >
            <li v-for="(step, stepIndex) in dataSteps.steps" :key="stepIndex">
              <span
                v-if="step.partId === part.id"
                :class="[
                  stepIndex === focusStep ? 'activestep-on' : 'activestep-off'
                ]"
                @click="setFocusStep(step.partId, stepIndex)"
              >
                {{ stepIndex }} - {{ step.name }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    docId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      dataSteps: null,
      hoverPart: '',
      focusPart: '',
      focusStep: ''
    }
  },
  created() {
    this.dataSteps = this.$store.getters['docsteps/getDocData'](this.docId)
  },
  methods: {
    setFocusStep(part_, step_) {
      if (this.focusStep !== step_) {
        this.focusPart = part_
        this.focusStep = step_
        window.$nuxt.$emit('DOCSTEP-CURSTEP', step_)
      } else {
        this.focusPart = ''
        this.focusStep = ''
        window.$nuxt.$emit('DOCSTEP-CURSTEP', -1)
      }
    }
  }
}
</script>

<style lang="scss">
.docstep-gui {
  // background: transparentize($color: rgb(57, 119, 235), $amount: 0.5);

  .activepart-off {
    font-weight: 300;
    font-size: 1.2rem;
    &:hover {
      cursor: default;
    }
  }
  .activepart-on {
    @extend .activepart-off;
    font-weight: 800;
  }

  .step-list {
    margin: 0.2rem 0 0.5rem 0;

    .activestep-off {
      font-style: normal;
      &:hover {
        cursor: pointer;
      }
    }
    .activestep-on {
      @extend .activestep-off;
      font-weight: 600;
    }
  }
}
</style>

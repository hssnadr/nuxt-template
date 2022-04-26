<template>
  <div class="cardboard" :style="cardBackground">
    <div class="card-content" @click="emitProject()">
      <div class="top-content">
        <h2>{{ dataProject.title }}</h2>
        <h3 v-if="refName(institute) !== ''">{{ refName(institute) }}</h3>
        <div class="format">
          <p>{{ dataProject.format[0] }} project &bull; {{ years }}</p>
        </div>
        <div class="line-break"></div>
        <div class="description">
          <p>
            {{ dataProject.description }}
          </p>
        </div>
      </div>

      <div class="bottom-content">
        <div class="tool-icons">
          <div v-for="tool_ in dataProject.tools" :key="tool_">
            <component
              :is="'icon-' + tool_"
              v-if="isFile('icon-' + tool_)"
              class="tool-icon"
            ></component>
          </div>
        </div>
        <div class="skills">
          <span v-for="skill_ in dataProject.skills" :key="skill_">
            {{ skill_ }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectid: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      cardBackground: {
        backgroundImage: "url('https://via.placeholder.com/320x450')"
      },
      dataProject: null
    }
  },
  computed: {
    thumbnail() {
      return this.$store.getters['projects/getThumbnailById'](
        this.dataProject.id
      )
    },
    years() {
      let years_ = 'unknown'
      if (this.dataProject.years.y0 !== this.dataProject.years.y1) {
        years_ = this.dataProject.years.y0 + ' - ' + this.dataProject.years.y1
      } else {
        years_ = this.dataProject.years.y0
      }

      return years_
    },
    institute() {
      let institute_ = ''
      if (this.dataProject.institutes !== null) {
        institute_ = this.dataProject.institutes[0]
      }
      return institute_
    }
  },
  created() {
    this.dataProject = this.$store.getters['projects/getProjectByid'](
      this.projectid
    )

    this.cardBackground.backgroundImage =
      'url(' +
      this.$store.getters['projects/getThumbnailById'](this.dataProject.id) +
      ')'
  },
  methods: {
    emitProject() {
      this.$emit('selected', { id: this.dataProject.id })
    },
    isFile(file_) {
      return file_ in this.$options.components
    },
    refName(ref_) {
      return this.$store.getters['references/getName'](ref_)
    }
  }
}
</script>

<style lang="scss">
.cardboard {
  width: 140px;
  height: 240px;
  margin: 4px;
  border-radius: 0;

  cursor: pointer;
  background-size: cover;
  background-position: center;

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: transparentize($color: $primary-color, $amount: 0.05);
    color: $base-color;
    z-index: 10;

    opacity: 0;

    .top-content {
      h2 {
        font-size: 1.1rem;
        margin-bottom: 0.3rem;
        font-weight: 800;
        font-style: normal;
        text-align: center;
        hyphens: auto;
      }

      h3 {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0.3rem;
        color: $lightgrey;
        text-align: center;
      }

      .format {
        display: none;
      }

      .line-break {
        display: none;
      }

      .description {
        display: none;
      }
    }

    .bottom-content {
      width: 100%;
      display: flex;
      justify-content: space-around;

      .tool-icons {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        div {
          width: 26%;
        }

        .tool-icon {
          fill: $base-color;
        }
      }

      .skills {
        display: none;
      }
    }

    &:hover {
      opacity: 1;
    }
  }

  // @media #{$small-up} {
  //   width: 250px;
  //   height: 408px;
  //   margin: 7px;
  // }

  @media #{$medium-up} {
    width: 280px;
    height: 480px;
    margin: 7px;

    .card-content {
      justify-content: space-between;
      padding: 20px;
      .top-content {
        h2 {
          font-size: 1.9rem;
          text-align: left;
        }
        h3 {
          font-size: 1.1rem;
          text-align: left;
          text-transform: uppercase;
        }
        .format {
          display: block;
        }
        .line-break {
          display: block;
          width: 30%;
          height: 2px;
          margin: 1em 0;
          background: $base-color;
        }
        .description {
          display: block;
          text-align: justify;
        }
      }

      .bottom-content {
        .tool-icons {
          flex-direction: row;
          flex-wrap: wrap-reverse;
          justify-content: flex-start;
          width: 60%;
          div {
            width: 40%;
          }
        }
        .skills {
          width: 50%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column-reverse;
          text-align: right;
          font-weight: 100;
          font-size: 1em;
          color: transparentize($color: $base-color, $amount: 0.2);
        }
      }
    }
  }
  @media #{$large-up} {
    width: 300px;
    height: 490px;
  }
}
</style>

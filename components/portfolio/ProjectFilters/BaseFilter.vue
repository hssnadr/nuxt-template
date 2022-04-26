<template>
  <div>
    <!-- FILTER TYPE -->
    <button
      :class="[isTypeFilter ? 'typefilter-on' : 'typefilter-off']"
      @click="showFilterType()"
    >
      {{ type }}
    </button>

    <!-- FILTER -->
    <div v-if="isFilterDisplay" class="filters">
      <div
        v-for="filter_ in filters"
        :id="filter_"
        :key="filter_"
        :class="[filterState(filter_) ? 'filtertext-on' : 'filtertext-off']"
        @click="setFilter(filter_)"
      >
        <!-- by id (default) -->
        <div v-if="display === 'id'">
          {{ filter_ }}
        </div>

        <!-- by name -->
        <div v-if="display === 'name'">
          {{ filterName(filter_) }}
        </div>

        <!-- by icon -->
        <div v-if="display === 'icon'">
          <component
            :is="'icon-' + filter_"
            v-if="isFile('icon-' + filter_)"
            v-tooltip.bottom="filterName(filter_)"
            :class="[filterState(filter_) ? 'filtericon-on' : 'filtericon-off']"
          ></component>
          <div v-else>
            {{ filterName(filter_) }}
          </div>
        </div>

        <!-- by logo -->
        <div v-if="display === 'logo'">
          <component
            :is="'logo-' + filter_"
            v-if="isFile('logo-' + filter_)"
            :class="[filterState(filter_) ? 'filterlogo-on' : 'filterlogo-off']"
          ></component>
          <div v-else>
            {{ filterName(filter_) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      // Filter type (eg. tools, institutes, skills...)
      type: String,
      default: 'Tools',
      required: true
    },
    display: {
      // Display mode (text or icon)
      type: String,
      default: 'id',
      required: false
    }
  },
  computed: {
    filters() {
      return this.$store.getters['projects/getAllFiltersByType'](this.type)
    },
    isFilterDisplay() {
      return this.$store.getters['projects/isFilterDisplay'](this.type)
    },
    isTypeFilter() {
      return this.$store.getters['projects/isTypeFilter'](this.type)
    },
    filterState(id_) {
      const state_ = (id_) => {
        return this.$store.getters['projects/getFilterState']({
          type: this.type,
          name: id_
        })
      }
      return state_
    }
  },
  methods: {
    showFilterType() {
      if (this.isFilterDisplay) {
        this.$store.commit('projects/setDisplayFilter', 'nodisplay') // send any messages other than type filters
      } else if (!this.isTypeFilter) {
        this.$store.commit('projects/setDisplayFilter', this.type)
        this.$store.commit('projects/toggleTypeFilter', this.type)
      } else {
        this.$store.commit('projects/toggleTypeFilter', this.type)
      }
    },
    setFilter(filter_) {
      const oldState = this.filterState(filter_)
      let newState_ = 'skip' // default value

      if (oldState == null) {
        newState_ = 'include'
      }

      const data_ = { type: this.type, name: filter_, state: newState_ }
      this.$store.commit('projects/setFilter', data_)

      if (!this.isTypeFilter) {
        this.$store.commit('projects/toggleTypeFilter', this.type) // switch state
      }
    },
    filterName(id_) {
      return this.$store.getters['references/getName'](id_)
    },
    isFile(file_) {
      return file_ in this.$options.components
    }
  }
}
</script>

<style lang="scss">
$filter-offset: 5px;
$filter-spaceletter: 0.02em;

// TYPE FILTER
.typefilter-off {
  font-weight: 800;
  font-style: italic;
  font-size: 2.5em;
  letter-spacing: $filter-spaceletter;
  text-transform: uppercase;
  padding-left: 0;
  margin: 0.2em 0 0.02em 0.2em;

  color: $base-color;
  @include text-stroke($color: $primary-color, $thikness: 1px);

  transition: transform 0.3s ease-out, letter-spacing 0.15s ease-out;

  &:hover {
    letter-spacing: 3 * $filter-spaceletter;
    transform: translateX($filter-offset);
  }
}

.typefilter-on {
  @extend .typefilter-off;
  color: $primary-color;
  transform: translateX($filter-offset);
  letter-spacing: 3 * $filter-spaceletter;
}

// -----------------------------

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: center;
  margin: 0 0 20px 0;
}

.filtertext-off {
  font-weight: 300;
  font-size: 1rem;
  margin: 0.5em 0.2em;
  padding: 0;
  text-transform: lowercase;
  color: $lightgrey;
  transition: color 0.3s;

  &:hover {
    color: $primary-color;
    cursor: pointer;
  }
}

.filtertext-on {
  @extend .filtertext-off;
  color: $primary-color;
}

// -----------------------------

.filtericon-off {
  height: 35px;
  width: auto;
  fill: $lightgrey;
  margin: 0 10px;
  transition: fill 0.3s;

  // ---> not good on touch devices
  &:hover {
    // fill: $primary-color;
    cursor: pointer;
  }
}

.filtericon-on {
  @extend .filtericon-off;
  fill: $primary-color;
}

// -----------------------------

.filterlogo-off {
  height: 50px;
  fill: $lightgrey;
  // margin: 0 10px;
  transition: fill 0.3s;

  // ---> not good on touch devices
  &:hover {
    // fill: $primary-color;
    cursor: pointer;
  }
}

.filterlogo-on {
  @extend .filterlogo-off;
  fill: $primary-color;
}
</style>

<template>
  <div v-scroll-lock="isWatching">
    <transition-group
      v-if="isEmptySel"
      id="portfolio-grid"
      :duration="{ enter: 500, leave: 800 }"
      name="card"
      tag="ul"
    >
      <cardboard
        v-for="id_ in displayProjectsId"
        :key="id_"
        :projectid="id_"
        @selected="WatchProject"
      />
    </transition-group>
    <div v-else>
      <p>No projects selected! It works!!</p>
    </div>

    <!-- Project frame -->
    <project-frame v-if="isWatching" @close="CloseProject" />
  </div>
  <!-- il faudra rajouter un prevent au dessus si la page nexiste pas!! -->
</template>

<script>
import { mapGetters } from 'vuex'
import Cardboard from '~/components/portfolio/Cardboard.vue'
import ProjectFrame from '~/components/portfolio/ProjectFrame.vue'

export default {
  components: {
    Cardboard,
    ProjectFrame
  },
  data() {
    return {
      isWatching: false,
      projectLink: '',
      idToWatch: ''
    }
  },
  computed: {
    isEmptySel() {
      let isEmpt_ = false
      if (this.displayProjectsId.length > 0) {
        isEmpt_ = true
      }
      return isEmpt_
    },
    ...mapGetters({
      displayProjectsId: 'projects/selectedProjectsId'
    })
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    WatchProject(data) {
      this.$store.commit('projects/setCurrentProjectId', data.id)
      this.isWatching = true
    },
    CloseProject() {
      this.isWatching = false
    }
  }
}
</script>

<style lang="scss">
#portfolio-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 80vh;
  // align-content: center;
  // width: 100%;

  // padding: 0 20px;
}

/* ENTER */
.card-enter
/* enter from */ {
  opacity: 0;
  transform: scale(0.5);
}

.card-enter-active {
}

.card-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* MOVE */
.card-move {
  position: relative;
}

/* LEAVE */
.card-leave {
  opacity: 1;
  transform: scale(1);
}

.card-leave-active {
  position: absolute;
}

.card-leave-to
/* .card-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translate(0, 0, 0) scale(0.1);
}
</style>

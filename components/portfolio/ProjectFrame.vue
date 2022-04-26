<template>
  <div id="project-frame" @click="EmitClose()">
    <span class="close-project" @click="EmitClose()">&times;</span>
    <iframe
      class="iframe-project"
      :src="projectLink"
      @keyup.esc="EmitClose"
    ></iframe>
  </div>
</template>

<script>
export default {
  computed: {
    projectId() {
      return this.$store.getters['projects/currentProjectID']
    },
    projectLink() {
      return '/projects/' + this.projectId
    }
  },
  mounted() {
    // Go to page on small screen (no iframe)
    if (window.innerWidth < 800) {
      window.location.href =
        '/projects/' + this.$store.getters['projects/currentProjectID']
    }
  },
  methods: {
    EmitClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
#project-frame {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  // padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  // background-color: rgb(0, 0, 0); // Fallback color
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */

  .iframe-project {
    display: block;
    height: 100%;
    width: 70%;
    min-width: 700px;
    margin: auto;
  }

  /* The Close Button */
  .close-project {
    position: fixed;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
    z-index: 9999;

    &:hover,
    &:focus {
      color: #bbb;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div
    :class="[isSideMenu ? 'hamburger-cross' : 'hamburger']"
    @click="$store.dispatch('utilities/toggleSideMenu')"
  >
    <span :class="{ 'color-swap': setColorSwap }"></span>
  </div>
</template>

<script>
export default {
  computed: {
    isSideMenu() {
      return this.$store.getters['utilities/isSideMenu']
    },
    colorSwap() {
      return this.$store.getters['navigator/colorSwap']
    },
    setColorSwap() {
      return !this.isSideMenu && this.colorSwap
    }
  }
}
</script>

<style lang="scss">
.hamburger {
  // variables
  $hbg-backcol: transparent;
  $hbg-frontcol: $primary-color;
  $width-bar: 20px;
  $height-bar: 2px;
  $space-between: 0.4em; //6px;
  $offset: 0.1em; //1px;

  position: relative;
  width: $width-bar; // 54px;
  height: $width-bar; // 54px;
  background: $hbg-backcol;
  // border-radius: 50%;
  transform: rotate(0);
  transition: none;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    display: block;
    background: $hbg-frontcol;
    width: 100%;
    height: $height-bar;

    transition: 0.3s ease-out;
    &::before,
    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      display: block;
      background: $hbg-frontcol;
      width: $width-bar;
      height: $height-bar;

      transform: translateY(-$space-between);
      transition: 0.3s;
    }

    &:after {
      transform: translateY($space-between);
    }
  }

  .color-swap {
    background: $base-color;
    &::before,
    &::after {
      background: $base-color;
    }
  }

  // &:hover {
  //   span {
  //     &:before {
  //       transform: translateY(-($space-between + $offset));
  //     }

  //     &:after {
  //       transform: translateY($space-between + $offset);
  //     }
  //   }
  // }
}

.hamburger-cross {
  @extend.hamburger;
  transform: rotate(90deg);
  transition: 0.5s ease-out;

  span {
    background: transparent;
    transition: 0.3s ease-out;

    &::before {
      transform: translateY(0) rotate(45deg);
    }

    &::after {
      transform: translateY(0) rotate(-45deg);
    }
  }
  &:hover {
    transition: 0.3s ease-out;
    span {
      &:before {
        transform: translateY(0) rotate(135deg);
      }

      &:after {
        transform: translateY(0) rotate(45deg);
      }
    }
  }
}
</style>

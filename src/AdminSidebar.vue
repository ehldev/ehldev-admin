<template>
  <aside class="sidebar" :class="{ active: showSidebar }">
    <div
      class="sidebar-header"
      :class="{ active: showSidebar }"
      v-show="showHeader"
    >
      <slot name="sidebar-header"></slot>
    </div>
    <AdminNav :showSidebar="showSidebar" :items="navItems" @hideSidebar="$emit('hide')" />
  </aside>
</template>

<script>
// import {AdminNav} from "ehldev-components-admin";
import AdminNav from '@/AdminNav'

export default {
  data() {
    return {
      showHeader: false,
    };
  },
  mounted() {
    this.setLogos();
    this.showHeader = true;
  },
  props: {
    showSidebar: Boolean,
    navItems: Array
  },
  components: {
    AdminNav,
  },
  watch: {
    showSidebar: function () {
      this.setLogos();
    },
  },
  methods: {
    setLogos() {
      let logoMini = document.querySelector(".logo-mini");
      let logoFull = document.querySelector(".logo-full");
      if (this.showSidebar) {
        logoMini.style.display = "none";
        logoFull.style.display = "block";
      } else {
        logoFull.style.display = "none";
        logoMini.style.display = "block";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  background-color: $admin-dark;
  position: fixed;
  top: $header-height;
  left: -100%;
  z-index: 100;
  transition: left 0.3s;

  @media (min-width: 992px) {
    width: 50px;
    top: 0;
    left: 0;
  }

  &.active {
    width: 250px;
    left: 0;
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }

  /* Ponemos un color de fondo y redondeamos las esquinas del thumb */
  &::-webkit-scrollbar-thumb {
    background: rgba($admin-dark, 0.5);
    border-radius: 6px;
  }

  /* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba($admin-dark, 0.6);
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }

  /* Cambiamos el fondo cuando esté en active */
  &::-webkit-scrollbar-thumb:active {
    background-color: $admin-dark;
  }

  /* Ponemos un color de fondo y redondeamos las esquinas del track */
  &::-webkit-scrollbar-track {
    background: $admin-dark;
    // border-radius: 4px;
  }

  /* Cambiamos el fondo cuando esté en active o hover */
  &::-webkit-scrollbar-track:hover,
  &::-webkit-scrollbar-track:active {
    background: $admin-light;
  }

  &-header {
    height: $header-height;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 8%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.7rem 0;

    &.active {
      justify-content: flex-start;
      padding: 18px;
    }
  }
}
</style>

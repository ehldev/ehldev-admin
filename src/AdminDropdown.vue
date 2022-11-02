<template>
  <div class="admin-dropdown position-relative">
      <div class="cursor-pointer" @click="showContent = !showContent">
          <slot name="toggle"></slot>
      </div>

      <div class="admin-dropdown-content bg-white p-2 main-shadow" v-if="showContent" @mouseleave="hide()">
          <slot name="content"></slot>
      </div>

      <div class="admin-dropdown-overlay" v-if="showContent" @click="showContent = false"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            showContent: false
        }
    },
    methods: {
        hide() {
            this.showContent = false
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-dropdown {
    width: max-content;
    position: relative;

    &-content {
        min-width: 150px;
        border: 1px solid rgba($admin-gray, .2) !important;
        position: absolute;
        top: 110%;
        right: 0;
        z-index: 120;

        ul {
            list-style: none;
        }
    }

    &-overlay {
        background-color: transparent;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }
}
</style>
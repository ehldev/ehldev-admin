<template>
  <form @submit.prevent="search()" class="admin-search position-relative">
    <input
      type="search"
      class="admin-search-field"
      :placeholder="placeholder"
    />
    <span class="admin-search-icon">
      <i class="ri-search-2-line"></i>
    </span>
  </form>
</template>

<script>
export default {
  props: ["placeholder"],
  methods: {
    search() {
      this.$emit("search");
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-search {
  &-field {
    min-height: 35px;
    font-size: 13px;
    // font-weight: 500;
    color: $admin-dark;
    background-color: $admin-light;
    display: inline-block;
    padding: 8px 16px 8px 40px;
    border: none;
    border-radius: 20px;
    outline: 0;
  }

  &-icon {
    color: $admin-gray;
    font-size: 14px;
    position: absolute;
    top: 30%;
    left: 12px;
  }
}
</style>
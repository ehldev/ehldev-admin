<template>
  <div class="admin-filters">
    <button
      type="button"
      class="admin-dropdown-item"
      v-for="item in items"
      :key="item.key"
      @mouseover="currentItem = item.key"
    >
      {{ item.label }}

      <div class="options p-2" v-if="item.key === currentItem">
        <button
          type="button"
          class="admin-dropdown-item d-flex justify-content-between align-items-center"
          v-for="subitem in item.options"
          :key="subitem.key"
        >
          <span
            class="text-uppercase"
            @click="checkOption(subitem.value, item, subitem)"
            >{{ subitem.label }}</span
          >

          <input
            type="checkbox"
            class="cursor-pointer"
            v-model="subitem.value"
            
            @change="checkOption($event, item, subitem)"
          />

          <!-- <input
            type="checkbox"
            class="cursor-pointer"
            v-model="subitem.value"
            @change="checkOption($event, item, subitem)"
            v-if="
              (item.type === 'single' && onHoverItem.key === subitem.key) ||
              (item.type === 'single' && subitem.value)
            "
          /> -->
        </button>

        <div class="text-right mt-2">
          <button
            type="button"
            class="admin-button admin-button-green ml-auto py-1 px-2"
            @click="$emit('setFilters', items)"
          >
            Aplicar
          </button>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "AdminFilters",
  data() {
    return {
      items: [],
      currentItem: null,
      // firstLoad: false
      // onHoverItem: true
    };
  },
  mounted() {
    this.items = JSON.parse(JSON.stringify(this.filters));
    // this.firstLoad = true
  },
  props: {
    filters: Array,
  },
  // watch: {
  //   filters: function() {
  //     if(this.firstLoad) {
  //       this.items = JSON.parse(JSON.stringify(this.filters))
  //       alert('w')
  //     }
  //   }
  // },
  methods: {
    checkOption(value, item, subItem) {
      if (item.type === "single") {
        item.options.forEach((i) => (i.value = false));
      }

      subItem.value = value.target ? value.target.checked : !value;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-filters {
  button {
    position: relative;
  }

  .options {
    min-width: 150px;
    background-color: white;
    border: 1px solid rgba($admin-gray, 0.2) !important;
    border-radius: 8px;
    position: absolute;
    top: 0;
    right: -120%;
  }
}
</style>

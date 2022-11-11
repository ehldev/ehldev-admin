<template>
  <div class="admin-tags">
    <input
      type="text"
      id="tags"
      class="admin-tags-field admin-form-field"
      :class="{ 'admin-form-field-error': showError }"
      placeholder="Presione enter para agregar"
      v-model="text"
      @keypress.enter.prevent="add()"
    />

    <div class="mt-2">
        <span class="admin-badge admin-badge-info mr-2 mb-2 d-flex align-items-center" v-for="(item, i) in list" :key="item">
            {{ item }}
            <button type="button" class="bg-transparent border-none ml-2 p-0" @click="remove(i)">
                <i class="ri-close-circle-line"></i>
            </button>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      list: []
    };
  },
  props: {
    showError: Boolean
  },
  methods: {
    add() {
        if(this.text) {
            this.list.push(this.text)
            this.text = null
            this.$emit('success', this.list)
        }
    },
    remove(i) {
        this.list.splice(i, 1)
        this.$emit('success', this.list)
    }
  }
};
</script>

<style>
</style>
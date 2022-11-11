<template>
  <p class="admin-form-error text-red">
    <i class="ri-close-line"></i>
    {{ message }}
  </p>
</template>

<script>
export default {
    props: ['message']
}
</script>

<style lang="scss" scoped>
.admin-form-error {
    font-size: 12px;
    font-weight: 700;
    line-height: 12px;
    display: flex;
    align-items: center;
    margin-top: 8px;

    i {
        line-height: 12px;
        margin-right: 8px;
    }
}
</style>
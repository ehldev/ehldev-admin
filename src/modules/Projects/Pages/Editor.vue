<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-title">{{ id ? "Editar" : "Registrar" }} proyecto</h1>

      <router-link to="/" class="admin-button admin-button-primary">
        Agregar
        <i class="ri-add-fill"></i>
      </router-link>
    </div>

    <div class="admin-card mt-6">
      <form action="" class="admin-form admin-form-sm">
        <div class="admin-form-group">
          <label for="name">Nombre de proyecto</label>
          <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
          />
        </div>

        <div class="admin-form-group">
          <label for="name">Nombre de proyecto</label>
          <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
          />
        </div>

        <div class="admin-form-group">
          <label for="name">Nombre de proyecto</label>
          <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
          />
        </div>

        <div class="admin-form-group d-flex justify-content-end">
          <button type="submit" class="admin-button admin-button-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import ProjectsService from "../Services";

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let res = await ProjectsService.list();
        this.totalItems = res.data.total;
        this.items = res.data.docs;
      } catch (error) {
        console.log(error);
      }
    },
    getUrl(item) {
      return `${process.env.VUE_APP_WEB_URL}/proyectos/${item.slug}`;
    },
    getStatus(object) {
      return this.projectStatus.find((item) => item.key === object.status);
    },
    myCallback() {
      console.log("Pagination");
    },
  },
};
</script>

<style></style>

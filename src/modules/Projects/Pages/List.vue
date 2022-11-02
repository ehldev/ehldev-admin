<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-title">Proyectos</h1>

      <router-link to="/" class="admin-button admin-button-primary">
        Agregar
        <i class="ri-add-fill"></i>
      </router-link>
    </div>

    <div class="admin-card mt-6">
      <div class="table-container">
        <div
          class="admin-table-options d-flex justify-content-between align-items-start"
        >
          <router-link to="/" class="admin-button admin-button-primary">
            Filtrar
            <i class="ri-filter-line"></i>
          </router-link>

          <AdminSearch placeholder="Buscar por nombre" />
        </div>
        <table class="admin-table main-shadow">
          <thead>
            <tr class="text-uppercase">
              <th class="text-left">Imagen destacada</th>
              <th class="text-left">Nombre</th>
              <th>Relevancia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="item in items" :key="item._id">
              <td>
                <img
                  :src="item.image.url"
                  alt="Imagen principal"
                  class="admin-table-image"
                />
              </td>
              <td class="text-left">
                <a :href="getUrl(item)" target="_blank" class="admin-table-link"
                  >{{ item.title }} <i class="ri-external-link-line"></i
                ></a>
              </td>
              <td>{{ item.level }}</td>
              <td>
                <span
                  class="admin-badge text-uppercase"
                  :class="`admin-badge-${getStatus(item).color}`"
                  >{{ getStatus(item).label }}</span
                >
              </td>
              <td>
                <AdminDropdown class="mx-auto text-left">
                  <template slot="toggle">
                    <button
                      type="button"
                      class="admin-table-option cursor-pointer"
                    >
                      <i class="ri-more-2-fill"></i>
                    </button>
                  </template>

                  <template slot="content">
                    <a href="" class="admin-dropdown-item">Ver detalles</a>
                    <a href="" class="admin-dropdown-item">Editar</a>
                    <a href="" class="admin-dropdown-item text-red">Eliminar</a>
                  </template>
                </AdminDropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer p-3 d-flex justify-content-end">
          <pagination
            v-model="page"
            :records="totalItems"
            :per-page="10"
            :options="paginationOptions"
            @paginate="myCallback"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Pagination from "vue-pagination-2";

import AdminDropdown from "@/AdminDropdown";
import AdminSearch from "@/AdminSearch";

import ProjectsService from "../Services";

export default {
  data() {
    return {
      page: 1,
      items: [],
      totalItems: 1,
      projectStatus: [
        {
          key: "ACTIVATED",
          label: "Activo",
          color: "primary",
        },
        {
          key: "DEACTIVATED",
          label: "Desactivado",
          color: "danger",
        },
      ],
      paginationOptions: {
        texts: {
          count:
            "Mostrando {from} a {to} registros de {count} en total|{count} en total| Un registro encontrado",
        },
      },
    };
  },
  mounted() {
    this.getItems();
  },
  components: {
    AdminDropdown,
    AdminSearch,
    Pagination,
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

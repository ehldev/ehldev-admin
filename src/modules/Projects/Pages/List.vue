<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-title">Proyectos</h1>

      <router-link
        :to="{ name: 'projects-create' }"
        class="admin-button admin-button-green"
      >
        Agregar
        <i class="ri-add-fill"></i>
      </router-link>
    </div>

    <div class="admin-card mt-6">
      <div class="table-container">
        <span class="table-no-data-label" v-if="!items.length"
          >Aún no hay registros</span
        >

        <div
          class="
            admin-table-options
            d-flex
            justify-content-between
            align-items-start
          "
        >
          <section class="d-flex align-items-start">
            <AdminDropdown contentPosition="left" class="mr-2">
              <template slot="toggle">
                <button type="button" class="admin-button admin-button-green">
                  Filtrar
                  <i class="ri-filter-line"></i>
                </button>
              </template>

              <template slot="content">
                <AdminFilters :filters="filters" @setFilters="setFilters" />
              </template>
            </AdminDropdown>

            <div>
              <span
                class="admin-badge admin-badge-blue filter-item text-uppercase"
                v-for="item in selectedFilters"
                :key="item.key"
                ><span class="font-weight-bold">{{ item.parent.label }}: </span>
                {{ item.label }}
                <button type="button" class="ml-1" @click="removeFilter(item)">
                  <i class="ri-close-circle-line"></i></button
              ></span>
            </div>
          </section>

          <div class="d-flex">
            <button
              type="button"
              title="Recargar"
              class="bg-transparent border-none mr-3"
              @click="reload()"
            >
              <i class="ri-restart-line"></i>
            </button>

            <AdminSearch placeholder="Buscar por nombre" @search="onSearch" />
          </div>
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
            <tr v-for="(item, index) in items" :key="item._id">
              <td>
                <div class="admin-table-image-container">
                  <img
                    :src="item.image.url"
                    alt="Imagen principal"
                    class="admin-table-image"
                    v-if="item.image"
                  />
                </div>
              </td>
              <td class="text-left">
                <a :href="getUrl(item)" target="_blank" class="admin-table-link"
                  >{{ item.name }} <i class="ri-external-link-line"></i
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
                    <a :href="getUrl(item)" target="_blank" class="admin-dropdown-item">Ver detalles</a>
                    <router-link
                      :to="{ name: 'projects-edit', params: { slug: item.slug } }"
                      class="admin-dropdown-item"
                      >Editar</router-link
                    >
                    <a
                      href=""
                      class="admin-dropdown-item text-red"
                      @click.prevent="openDeleteModal(item, index)"
                      >Eliminar</a
                    >
                  </template>
                </AdminDropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer p-3 d-flex justify-content-end">
          <pagination
            v-model="queryParams.page"
            :records="totalItems"
            :per-page="queryParams.limit"
            :options="paginationOptions"
            @paginate="paginate"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AdminSearch } from "ehldev-admin-library";
import Pagination from "vue-pagination-2";

import ProjectsService from "../Services";

import { AdminDropdown } from "ehldev-admin-library";
import AdminFilters from "@/AdminFilters";

export default {
  data() {
    return {
      loading: false,
      items: [],
      totalItems: 1,
      projectStatus: [
        {
          key: "ACTIVATED",
          label: "Activo",
          color: "green",
        },
        {
          key: "DEACTIVATED",
          label: "Desactivado",
          color: "danger",
        },
      ],
      paginationOptions: {
        texts: {
          count: "",
          // count:
          // "Mostrando {from} a {to} registros de {count} en total|{count} en total| Un registro encontrado",
        },
      },
      filters: [
        {
          key: "level",
          label: "Relevancia",
          type: "multiple",
          options: [
            {
              key: "LEVEL_1",
              label: "LEVEL 1",
              value: false,
            },
            {
              key: "LEVEL_2",
              label: "LEVEL 2",
              value: false,
            },
            {
              key: "LEVEL_3",
              label: "LEVEL 3",
              value: false,
            },
          ],
        },
        {
          key: "status",
          label: "Estado",
          type: "single",
          options: [
            {
              key: "ACTIVATED",
              label: "Activado",
              value: false,
            },
            {
              key: "DEACTIVATED",
              label: "Desactivado",
              value: false,
            },
          ],
        },
      ],
      queryParams: {
        search: null,
        page: 1,
        limit: 5,
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
    AdminFilters,
  },
  methods: {
    async getItems() {
      try {
        this.loading = true;

        let res = await ProjectsService.list(this.queryParams);
        this.totalItems = res.data.total;
        this.items = res.data.docs;

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    getUrl(item) {
      return `${process.env.VUE_APP_WEB_URL}/proyectos/${item.slug}`;
    },
    getStatus(object) {
      return this.projectStatus.find((item) => item.key === object.status);
    },
    paginate() {
      this.getItems();
    },
    setFilters(data) {
      this.filters = JSON.parse(JSON.stringify(data));

      let filters = {};

      this.filters.forEach((item) => {
        item.options.forEach((subitem) => {
          if (item.type === "single" && subitem.value) {
            filters[`${item.key}`] = subitem.key;
          } else if (item.type === "multiple" && subitem.value) {
            filters[`${item.key}`] = item.options.filter(
              (i) => i.value == true
            );
            filters[`${item.key}`] = filters[`${item.key}`].map((i) => {
              return i.key;
            });
          }
        });
      });

      this.queryParams = {
        ...this.queryParams,
        ...filters,
      };

      this.getItems();
    },
    onSearch(e) {
      this.queryParams.search = e;
      this.queryParams.page = 1;

      this.getItems();
    },
    removeFilter(item) {
      let parent = this.filters.find((i) => i.key === item.parent.key);
      if (parent) {
        let index = parent.options.findIndex((i2) => i2.key == item.key);
        parent.options[index].value = false;
      }

      this.setFilters(this.filters);

      this.getItems();
    },
    async reload() {
      await this.getItems();

      this.$toast.open({
        message: "Actualizado!",
        type: "success",
        duration: 1500,
      });
    },
    async openDeleteModal(item, index) {
      try {
        let result = await this.$swal({
          title: "¿Está seguro de eliminar?",
          text: "Se eliminará permanentemente",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--admin-color-green)",
          cancelButtonColor: "var(--admin-color-red)",
          confirmButtonText: "Sí, eliminar",
        });

        if(result.isConfirmed) {
          this.deleteItem(item._id, index);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(id, index) {
      try {
        await ProjectsService.deleteItem(id);

        this.$toast.open({
          message: "Eliminado correctamente.",
          type: "success",
        });

        this.items.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    selectedFilters: function () {
      let list = [];

      this.filters.forEach((item) => {
        item.options.forEach((subitem) => {
          if (subitem.value) {
            list.push({
              ...subitem,
              parent: item,
            });
          }
        });
      });

      return list;
    },
  },
};
</script>

<style></style>

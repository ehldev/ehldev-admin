<template>
  <div id="app">
    <AdminLayout :navItems="navItems" v-if="user">
      <template slot="sidebar-header">
        <img
          src="@/assets/logo-mini.png"
          alt=""
          width="35px"
          class="logo-mini"
        />
        <img
          src="@/assets/logo-full.png"
          alt=""
          width="75%"
          class="logo-full"
        />
      </template>

      <template slot="header">
        <AdminHeader>
          <template slot="content">
            <AdminDropdown>
              <template slot="toggle">
                <button
                  type="button"
                  class="
                    dropdown-button
                    cursor-pointer
                    main-shadow
                    d-flex
                    align-items-center
                    border-none
                  "
                >
                  <img
                    :src="user.image"
                    alt=""
                    class="rounded-circle mr-2"
                  />

                  <span class="font-weight-bold text-uppercase">Erick</span>
                </button>
              </template>

              <template slot="content">
                <a href="" class="admin-dropdown-item">Ver detalles</a>
                <a href="" class="admin-dropdown-item">Editar</a>
                <a href="" class="admin-dropdown-item d-flex justify-content-between align-items-center" @click.prevent="logout()">Salir <i class="ri-logout-box-r-line"></i></a>
              </template>
            </AdminDropdown>
          </template>
        </AdminHeader>
      </template>

      <template slot="main">
        <router-view />

        <AdminFooter />
      </template>
    </AdminLayout>

    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  AdminLayout,
  AdminHeader,
  AdminFooter,
  AdminDropdown,
} from "ehldev-admin-library";

export default {
  data() {
    return {
      navItems: [
        {
          text: "Visitar web",
          icon: "ri-external-link-fill",
          showSubmenu: false,
          externalRoute: process.env.VUE_APP_WEB_URL,
        },
        {
          text: "Inicio",
          description: "Dashboard, Widgets & Layout",
          icon: "ri-dashboard-line",
          routeName: "Home",
          showSubmenu: false,
        },
        {
          text: "Proyectos",
          description: "Crear, Listar, Actualizar o eliminar",
          icon: "ri-stack-line",
          routeName: "projects-list",
          subItems: [
            {
              text: "Listar",
              routeName: "projects-list",
            },
            {
              text: "Agregar",
              routeName: "projects-create",
            },
          ],
          showSubmenu: true,
        },
        {
          text: "Blog",
          description: "Agregar, listar, actualizar o eliminar",
          icon: "ri-stack-line",
          routeName: "admin-blog",
          subItems: [
            {
              text: "Listar",
            },
          ],
          showSubmenu: false,
        },
        {
          text: "Suscriptores",
          description: "Gestionar suscriptores de blog",
          icon: "ri-group-line",
          routeName: "admin-suscriptores",
          subItems: [
            {
              text: "Listar",
            },
          ],
          showSubmenu: false,
        },
      ],
    };
  },
  components: {
    AdminLayout,
    AdminHeader,
    AdminFooter,
    AdminDropdown
  },
  methods: {
    logout() {
      this.$store.commit('authModule/LOGOUT')

      window.location.reload()
      
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getCurrentUser'
    })
  }
};
</script>

<style lang="scss">
.preview-image {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  img {
    border-radius: 6px;
  }
}

.user-dropdown {
  .image {
    width: 35px;
  }
}

.username {
  font-size: 1rem;
}

.dropdown-button {
  background-color: white;
  color: $admin-gray;
  display: inline-block;
  min-width: 37px;
  padding: 0;

  i {
    font-size: 1.8em;
  }

  img {
    max-width: 40px;
  }
}
</style>

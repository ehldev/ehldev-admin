<template>
  <div id="app">
    <AdminLayout :navItems="navItems" :showSidebarFromHeader="showSidebar" v-if="user">
      <template slot="sidebar-header">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MzJERjZCN0M4QTExRUE4RjYxRjYyMjZCNjRFRDk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1MzJERjZDN0M4QTExRUE4RjYxRjYyMjZCNjRFRDk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTUzMkRGNjk3QzhBMTFFQThGNjFGNjIyNkI2NEVEOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTUzMkRGNkE3QzhBMTFFQThGNjFGNjIyNkI2NEVEOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4/A+LzAAABeElEQVR42uyX3U3DMBDH7xwP0A3ICHlGArIBHiEbFCZoNyAbNKOkIPHcTgDdoBmgNWdTEDZ5SGwHR8In5Tuyfrn730dQ3lQCEFYgoQAPw5cGf17TunLkEu+0PXLaPRFMDvEtV45h+mQuRlFigZbqQjGFAtoZH3pdFXGBEFrjOnOXQRigswUkoYwJ1AE3Q0ar3sUDQqixbY7fzimr3KemMW/vMKiNOycQ8bLM8s7FlrGAtvjcrK128eBbaF2BDpTaRmhIOws6rHwlyZ1gSCfUTI+Wdja0X/x1pd6SZwp8bXY9oRIBSshgD3VawJZmLjBCTwyBjA8BUandk01fMJuQDZ//0ocalCRVXtWfMmj7QDTMbbWk9+rQEwiOHllUNn0KWMAENkrU2isneJsKZpCHdG86wz2Fx7voOQHp4SrDK4VCT0vf4X80kMPfwaTGYGaWgBJQjPFj0n/+FLKkoZ6ZSaaQJaB/D3SYEc9eAanRdD8DGOWY9YcAAwBpymyPBcWRMwAAAABJRU5ErkJggg=="
          alt=""
          width="25px"
          class="logo-mini"
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAAAtCAYAAAAqVm4DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUI2MTE3QjdDODcxMUVBOTNGMkI1MkZCMTNFRkVFNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUI2MTE3QTdDODcxMUVBOTNGMkI1MkZCMTNFRkVFNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODRBM0RDMTY5N0NFQTExOTNDRUE1N0IzRjlCQkVDNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIvPiA8L3JkZjpEZXNjcmlwdGlv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"
          alt=""
          width="120px"
          class="logo-full"
        />
      </template>

      <template slot="header">
        <AdminHeader @toggleSidebar="showSidebar = !showSidebar">
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
                    px-2
                  "
                >
                  <img
                    src="http://nazox.vuejs-light.themesdesign.in/img/avatar-4.e0ab315a.jpg"
                    alt=""
                    class="rounded-circle mr-2"
                  />

                  <span class="font-weight-bold text-uppercase">Erick</span>
                </button>
              </template>

              <template slot="content">
                <a href="" class="admin-dropdown-item">Ver detalles</a>
                <a href="" class="admin-dropdown-item">Editar</a>
                <a href="" class="admin-dropdown-item d-flex justify-content-between align-items-center">Salir <i class="ri-logout-box-r-line"></i></a>
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
import {
  AdminLayout,
  AdminHeader,
  AdminFooter,
  AdminDropdown,
} from "ehldev-admin-library";

export default {
  data() {
    return {
      user: true,
      showSidebar: true,
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
    AdminDropdown,
  },
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
  // width: 40px;
  // height: 40px;
  // border: 1px solid rgba($admin-dark, 0.7);

  i {
    font-size: 1.8em;
  }

  img {
    width: 37px;
    height: 37px;
  }
}
</style>

<template>
  <div class="home-page">
    <div class="container">
      <div class="admin-card">
        <div class="welcome-message bg-light p-4 position-relative">
          <button
            type="button"
            class="welcome-message-toggle bg-transparent border-none"
            @click="showWelcomeMessage = !showWelcomeMessage"
          >
            👋
          </button>

          <h1 class="mb-2">Bienvenido Erick!</h1>
          <p class="mb-1">
            Desde el panel de administración podrás acceder, agregar, modificar
            y eliminar información referente a tu tienda.
          </p>
          <p class="mb-3">
            Recuerda que si tienes algún problema puedes solicitar soporte
            escribiéndonos a <a href="">soporte@ehldev.com</a>
          </p>

          <!-- {{ getAuthToken }}

          {{ user }} -->

          <p class="text-gray">
            <i
              >Estamos felices de ser tus aliados en el crecimiento de tu
              negocio. 🚀</i
            >
          </p>
        </div>

        <section class="mt-5">
          <Bar :chart-data="chartData" class="chart-component" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { Bar } from "vue-chartjs/legacy";

export default {
  name: "Home",
  data() {
    return {
      chartData: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: "Visitas mensuales",
            backgroundColor: "#42d392",
            data: [40, 20, 10, 15, 50, 100],
          },
        ],
      },
      chartdata2: [],
      showWelcomeMessage: false
    };
  },
  mounted() {
    this.getItems();
  },
  components: {
    Bar,
  },
  methods: {
    async getItems() {
      try {
        const { userlist } = await fetch("/api/userlist");
        this.chartdata2 = userlist;

        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      'getAuthToken': 'authModule/getAuthToken',
      user: 'authModule/getCurrentUser'
    })
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  .chart-component {
    max-width: 340px;
  }

  .welcome-message {
    &-toggle {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    p {
      font-size: 0.97em;
    }
  }
}
</style>

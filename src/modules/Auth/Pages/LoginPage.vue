<template>
  <div class="login-page">
    <section>
      <div class="content pt-4">
        <div></div>

        {{ getAuthToken }}

        <div>
          <div class="text-center">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAAAtCAYAAAAqVm4DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjYwOENBQTdDODcxMUVBQjg4MENDRDhCMkZCRTI5NSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjYwOENBOTdDODcxMUVBQjg4MENDRDhCMkZCRTI5NSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODRBM0RDMTY5N0NFQTExOTNDRUE1N0IzRjlCQkVDNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIvPiA8L3JkZjpEZXNjcmlwdGlv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"
              alt=""
              class="logo"
            />
          </div>

          <div class="text-center">
            <h1 class="mt-5">??Bienvenido!</h1>
            <p>Ingresa para administrar tu app web.</p>
          </div>

          <form action="" class="mt-5" @submit.prevent="login()">
            <div class="form-group">
              <span class="form-icon"><i class="ri-user-line"></i></span>
              <div class="fields">
                <label for="email">Correo electr??nico</label>
                <input
                  type="email"
                  placeholder="Ingresar"
                  class="form-field"
                  v-model="form.email"
                />
              </div>
            </div>

            <div class="form-group mt-4">
              <span class="form-icon"><i class="ri-lock-line"></i></span>
              <div class="fields">
                <label for="password">Contrase??a</label>
                <input
                  type="password"
                  placeholder="Ingresar"
                  class="form-field"
                  v-model="form.password"
                />
              </div>
            </div>

            <AdminFormError :message="error" v-if="error" />

            <div class="d-flex mt-4">
              <input type="checkbox" class="checkbox" />
              <span class="checkbox-label ml-1">Recordar</span>
            </div>

            <div class="text-center mt-4">
              <button
                type="submit"
                class="
                  admin-button admin-button-green
                  cursor-pointer
                  mx-auto
                  py-3
                  px-9
                "
              >
                Ingresar
                <i class="ri-login-box-line"></i>
              </button>

              <a href="" class="reset-password d-inline-block mt-4"
                >??Olvidaste tu contrase??a?</a
              >
            </div>
          </form>
        </div>

        <p class="text-center d-inline-block pb-4">
          ?? 2022 Programado por <a :href="webUrl" target="_blank">@ehldev</a>
        </p>
      </div>
    </section>

    <div class="bg position-relative d-flex align-items-center">
      <h2 class="bg-title text-white">
        Frase <br />
        que a??n voy a pensar
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { AdminFormError } from 'ehldev-admin-library'

import AuthService from "../Services/AuthService";

export default {
  data() {
    return {
      webUrl: process.env.VUE_APP_WEB_URL,
      form: {
        email: "admin@test.com",
        password: "secret",
      },
      error: null
    };
  },
  components: {
    AdminFormError
  },
  methods: {
    async login() {
      try {
        let params = {
          email: this.form.email,
          password: this.form.password,
        };

        let response = await AuthService.login(params);

        if (response.data.user) {
          this.$store.commit("authModule/SET_SESSION", response.data.token);

          this.$router.push({ name: "Home" })
          window.location.reload()
        } else {
          this.error = response.data.error
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters({
      'getAuthToken': 'authModule/getAuthToken'
    })
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: grid;
  grid-template-columns: 35% 1fr;

  .bg {
    height: 100%;
    background-image: url("https://images.unsplash.com/photo-1550660473-aed955e2e2a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
    background-size: cover;
    background-position: center;
    padding: 64px;

    &::before {
      content: "";
      background-color: rgba($admin-dark, 0.5);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &-title {
      font-size: 3em;
      font-weight: 700;
      position: relative;
    }
  }

  .content {
    max-width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
  }

  .logo {
    width: 150px;
  }

  .form-group {
    background-color: white;
    display: flex;
    align-items: center;
    border: 1px solid rgba($admin-gray, 0.3);
    border-radius: 8px;
    padding: 8px 16px;

    .form-icon {
      margin-right: 12px;
    }

    .fields {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    i {
      font-size: 24px;
      color: $admin-blue;
    }

    label {
      font-size: 14px;
      font-weight: 400;
      color: $admin-dark;
      display: inline-block;
      margin-bottom: 0;
      // margin-bottom: 4px;
    }

    .form-field {
      width: 100%;
      height: 30px;
      display: inline-block;
      border: none;
      outline: none;
    }
  }

  .checkbox {
    &-label {
      font-size: 0.9em;
      display: inline-block;
    }
  }

  .reset-password {
    font-size: 0.9em;
    color: $admin-dark;

    &:hover {
      color: $admin-blue;
      text-decoration: underline;
    }
  }
}
</style>

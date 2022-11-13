<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-page-title">
        {{ itemSlug ? "Editar" : "Registrar" }} proyecto
      </h1>
    </div>

    <div class="admin-card mt-6">
      <form action="" class="admin-form admin-form-sm" @submit.prevent="save()">
        <div class="admin-form-group">
          <label for="image">Imagen destacada</label>

          <AdminUploadWidget
            :multipleFiles="false"
            :maxFiles="1"
            :oldFiles="[form.image]"
            :showError="$v.form.image.$error"
            @success="setImages($event, 'image')"
          />

          <AdminFormError
            message="La imagen es requerida"
            v-if="$v.form.image.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="level">Posicionamiento</label>
          <select
            id="level"
            class="admin-form-field"
            :class="{ 'admin-form-field-error': $v.form.level.$error }"
            v-model="form.level"
          >
            <option
              :value="item.key"
              v-for="item in levelOptions"
              :key="item.key"
            >
              {{ item.label }}
            </option>
          </select>

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.level.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="name">Nombre de proyecto</label>
          <input
            type="text"
            id="name"
            class="admin-form-field"
            :class="{ 'admin-form-field-error': $v.form.name.$error }"
            placeholder="Ingresar"
            v-model="form.name"
          />

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.name.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="slug">Slug para URL</label>
          <input
            type="text"
            id="slug"
            class="admin-form-field"
            :class="{ 'admin-form-field-error': $v.form.slug.$error }"
            placeholder="Ingresar"
            v-model="form.slug"
          />

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.slug.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="summary">Resumen corto</label>
          <textarea
            id="summary"
            v-model="form.summary"
            class="admin-form-field"
          ></textarea>
        </div>

        <div class="admin-form-group">
          <label for="description">Descripción completa</label>
          <editor
            v-model="form.description"
            :init="{
              plugins: 'lists link image table code help wordcount',
            }"
            api-key="ru3qch58obk3mn37a2hzhrp9w9rbnmvda3bzi786qhrwqxdj"
          />
        </div>

        <div class="admin-form-group">
          <label for="url">URL de proyecto</label>
          <input
            type="text"
            id="url"
            class="admin-form-field"
            :class="{ 'admin-form-field-error': $v.form.url.$error }"
            placeholder="Ingresar"
            v-model="form.url"
          />

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.url.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="tags">Tags</label>

          <AdminTags :showError="$v.form.tags.$error" :oldList="form.tags" @success="setTags" />

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.tags.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="images" class="mb-0">Galería de imágenes</label>
          <p class="admin-form-description">Máximo 6 imágenes</p>

          <AdminUploadWidget
            :multipleFiles="true"
            :maxFiles="6"
            :oldFiles="form.images"
            @success="setImages($event, 'images')"
          />
        </div>

        <div class="admin-form-group d-flex justify-content-end">
          <router-link
            :to="{ name: 'projects-list' }"
            type="submit"
            class="admin-button admin-button-light admin-button-cancel mr-2"
          >
            <i class="ri-close-line"></i>
            Cancelar
          </router-link>

          <button type="submit" class="admin-button admin-button-green">
            {{ itemSlug ? "Actualizar" : "Guardar" }} proyecto
            <i class="ri-save-line"></i>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import Editor from "@tinymce/tinymce-vue";

import Utils from "@/utils";

import ProjectsService from "../Services";

import {
  AdminFormError,
  AdminTags,
  AdminUploadWidget
} from "ehldev-admin-library";

export default {
  data() {
    return {
      loading: true,
      itemSlug: this.$route.params.slug,
      uploadType: null,
      form: {
        name: null,
        description: null,
        summary: null,
        slug: null,
        image: null,
        images: [],
        url: null,
        status: null,
        level: null,
        tags: [],
      },
      levelOptions: [
        {
          key: null,
          label: "Seleccione una opción",
        },
        {
          key: "LEVEL_1",
          label: "Posición general",
        },
        {
          key: "LEVEL_2",
          label: "Proyecto destacado",
        },
      ],
    };
  },
  created() {
    if (this.itemSlug) {
      this.getData();
    }
  },
  mounted() {},
  validations: {
    form: {
      image: { required },
      name: { required },
      slug: { required },
      level: { required },
      url: { required },
      tags: { required },
    },
  },
  components: {
    AdminUploadWidget,
    AdminFormError,
    Editor,
    AdminTags,
  },
  watch: {
    "form.name": function (val) {
      this.form.slug = Utils.helpers.slugify(val);
    },
  },
  methods: {
    async getData() {
      try {
        let response = await ProjectsService.get(this.itemSlug);
        this.form = response.data.payload
        this.form.tags = JSON.parse(this.form.tags)
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.$nextTick(() => {
          const errorElement = document.querySelector(".admin-form-error");

          this.$smoothScroll({
            scrollTo: errorElement,
            updateHistory: false,
            offset: -50,
          });
        });

        return;
      }

      try {
        await ProjectsService.save({
          ...this.form,
          tags: JSON.stringify(this.form.tags),
        });

        this.$toast.open({
          message: "Registrado correctamente.",
          type: "success",
        });

        this.$router.push({ name: "projects-list" });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: "Ocurrió un error.",
          type: "error",
        });
      }
    },
    setImages(e, type) {
      if (type === "image") {
        this.form.image = e[0];
      } else {
        this.form.images = e;
      }
    },
    setTags(event) {
      this.form.tags = event;
    },
  },
};
</script>

<style></style>

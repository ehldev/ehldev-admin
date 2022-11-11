<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-name">{{ slug ? "Editar" : "Registrar" }} proyecto</h1>
    </div>

    <div class="admin-card mt-6">
      <pre>
        {{ form }}
      </pre>

      <form action="" class="admin-form admin-form-sm" @submit.prevent="save()">
        <div class="admin-form-group">
          <label for="image">Imagen destacada</label>

          <AdminUploadWidget
            :multipleFiles="false"
            :maxFiles="1"
            :showError="$v.form.image.$error"
            @success="setImages($event, 'image')"
          />

          <AdminFormError
            message="El campo es requerido"
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
          <quill-editor
            ref="editor"
            class="form-text-editor"
            v-model="form.description"
            :options="editorOption"
            @change="onEditorChange($event)"
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
          <input
            type="text"
            id="tags"
            class="admin-form-field"
            :class="{ 'admin-form-field-error': $v.form.tags.$error }"
            placeholder="Ingresar"
            v-model="form.tags"
          />

          <AdminFormError
            message="El campo es requerido"
            v-if="$v.form.tags.$error"
          />
        </div>

        <div class="admin-form-group">
          <label for="name" class="mb-0">Galería de imágenes</label>
          <p class="admin-form-description">Máximo 6 imágenes</p>

          <AdminUploadWidget
            :multipleFiles="true"
            :maxFiles="6"
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

          <button type="submit" class="admin-button admin-button-primary">
            Guardar
            <i class="ri-save-line"></i>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import Utils from "@/utils";

import ProjectsService from "../Services";

import AdminUploadWidget from "@/AdminUploadWidget";
import AdminFormError from "@/AdminFormError";

export default {
  data() {
    return {
      loading: true,
      slug: this.$route.params.slug,
      editorOption: {
        // Some Quill options...
      },
      uploadType: null,
      form: {
        name: "Agap",
        description: null,
        summary: "Agap",
        slug: "agap",
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
  mounted() {},
  validations: {
    form: {
      image: { required },
      name: { required },
      slug: { required },
      description: { required },
      level: { required },
      url: { required },
      tags: { required },
    },
  },
  components: {
    AdminUploadWidget,
    AdminFormError,
  },
  watch: {
    "form.name": function (val) {
      this.form.slug = Utils.helpers.slugify(val);
    },
  },
  methods: {
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
    onEditorChange({ html }) {
      console.log("editor change!");
      this.form.description = html;
    },
  },
};
</script>

<style></style>

<template>
  <section>
    <div class="d-flex justify-content-between">
      <h1 class="admin-name">{{ slug ? "Editar" : "Registrar" }} proyecto</h1>

      <router-link to="/" class="admin-button admin-button-primary">
        Agregar
        <i class="ri-add-fill"></i>
      </router-link>
    </div>

    <div class="admin-card mt-6">
      <form action="" class="admin-form admin-form-sm">
        <div class="admin-form-group">
          <label for="name">Imagen destacada</label>

          <AdminUploadWidget :multiple="false" :maxFiles="1" />

          <!-- <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.name"
          /> -->
        </div>

        <div class="admin-form-group">
          <label for="name">Nombre de proyecto</label>
          <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.name"
          />
        </div>

        <div class="admin-form-group">
          <label for="slug">Slug para URL</label>
          <input
            type="text"
            id="slug"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.slug"
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
          <!-- <quill-editor
            ref="editor"
            v-model="form.description"
            :options="editorOption"
            class="form-text-editor"
          /> -->
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br /></p>
          </div>
        </div>

        <div class="admin-form-group">
          <label for="url">URL de proyecto</label>
          <input
            type="url"
            id="url"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.name"
          />
        </div>

        <div class="admin-form-group">
          <label for="tags">Tags</label>
          <input
            type="text"
            id="tags"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.name"
          />
        </div>

        <div class="admin-form-group">
          <label for="name">Galería de imágenes</label>

          <button
            type="button"
            id="upload_widget"
            class="admin-button admin-button-primary"
            @click="openImageWidget('images')"
          >
            Seleccionar imágenes
            <i class="ri-image-line"></i>
          </button>

          <!-- <input
            type="text"
            id="name"
            class="admin-form-field"
            placeholder="Ingresar"
            v-model="form.name"
          /> -->
        </div>

        <div class="admin-form-group d-flex justify-content-end">
          <router-link
            :to="{ name: 'projects-list' }"
            type="submit"
            class="admin-button admin-button-light mr-2"
          >
            Cancelar
          </router-link>

          <button type="submit" class="admin-button admin-button-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Quill from "quill";

import Utils from "@/utils";

import ProjectsService from "../Services";

import AdminUploadWidget from '@/AdminUploadWidget'

export default {
  data() {
    return {
      loading: true,
      slug: this.$route.params.slug,
      uploadType: null,
      form: {
        name: null,
        description: "",
        summary: "",
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
      editorOption: {
        // Some Quill options...
        theme: "snow",
        // modules: {
        //   toolbar: [
        //     ["bold", "italic", "underline", "strike"],
        //     ["blockquote", "code-block"],
        //   ],
        //   syntax: {
        //     highlight: (text) => hljs.highlightAuto(text).value,
        //   },
        // },
      },
    };
  },
  mounted() {
    setTimeout(() => {
      var options = {
        debug: "info",
        // modules: {
        //   toolbar: "#toolbar",
        // },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow",
      };
      // var editorContainer = document.getElementById('editor');
      let editor = new Quill("#editor", options);
      editor.enable();
    }, 1000);
    this.getItems();
  },
  components: {
    AdminUploadWidget
  },
  watch: {
    "form.name": function (val) {
      this.form.slug = Utils.helpers.slugify(val);
    },
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
    }
  },
};
</script>

<style></style>

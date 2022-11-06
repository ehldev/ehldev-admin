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
          <label for="name">Imagen destacada</label>

          <AdminUploadWidget :multipleFiles="false" :maxFiles="1" @success="setImages($event, 'image')" />
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
          <label for="name" class="mb-0">Galería de imágenes</label>
          <p class="admin-form-description">Máximo 6 imágenes</p>

          <AdminUploadWidget :multipleFiles="true" :maxFiles="6" @success="setImages($event, 'images')" />
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
import Quill from "quill";

import Utils from "@/utils";

import ProjectsService from "../Services";

import AdminUploadWidget from "@/AdminUploadWidget";

export default {
  data() {
    return {
      loading: true,
      slug: this.$route.params.slug,
      uploadType: null,
      form: {
        name: "Agap",
        description: "Agap",
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
  },
  components: {
    AdminUploadWidget,
  },
  watch: {
    "form.name": function (val) {
      this.form.slug = Utils.helpers.slugify(val);
    },
  },
  methods: {
    async save() {
      let response = await ProjectsService.save({ ...this.form, tags: JSON.stringify(this.form.tags) });
      console.log(response);
    },
    setImages(e, type) {
      if(type === 'image') {
        this.form.image = e[0]
      } else {
        this.form.images = e
      }
    }
  },
};
</script>

<style></style>

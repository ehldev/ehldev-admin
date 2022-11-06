<template>
  <section>
    <button
      type="button"
      id="upload_widget"
      class="admin-button admin-button-primary"
      @click="openImageWidget()"
    >
      Seleccionar imagen
      <i class="ri-image-line"></i>
    </button>

    {{ files.length }}

    <div class="preview-form-image" v-for="item in files" :key="item.id">
      <img :src="item.url" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminUploadWidget",
  data() {
    return {
      cloudinaryConfig: {
        cloudName: "ehldev",
        uploadPreset: "ehldev",
        language: "es",
        folder: "ehldev",
        cropping: false,
        multiple: false,
        text: {
          es: {
            queue: {
              title: "Archivos a subir",
              title_uploading_with_counter: "Uploading {{num}} files",
            },
            crop: {
              title: "Recortar imagen",
            },
            local: {
              browse: "Explorar",
              dd_title_multi: "Arrastre o suelte archivos aquí",
              dd_title_single: "Arrastre o suelte archivos aquí",
            },
            menu: {
              files: "Mis archivos",
              web: "Desde la web",
              camera: "Cámara",
              gsearch: "Buscar imagen",
              gdrive: "Google Drive",
              dropbox: "Dropbox",
              facebook: "Facebook",
              instagram: "Instagram",
              shutterstock: "Shutterstock",
              getty: "gettyimages",
              istock: "iStock",
              unsplash: "Unsplash",
            },
          },
        },
      },
      files: []
    };
  },
  props: {
    multiple: {
        type: Boolean,
        default: false
    },
    maxFiles: Number
  },
  methods: {
    openImageWidget() {
      if (window.cloudinary) {
        let _this = this
        let uploadWidget = window.cloudinary.createUploadWidget(
          this.cloudinaryConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              let image = {
                id: result.info.asset_id,
                url: result.info.secure_url,
                thumbnail_url: result.info.thumbnail_url,
                path: result.info.path,
                description: null,
              };

              let file = JSON.parse(JSON.stringify(image))

              if (_this.multiple) {
                _this.files.push(file)
              } else {
                _this.files[0] = file
              }

              console.log(_this.files)

              _this.$emit('success', _this.files)
            }
          }
        );

        uploadWidget.open();
      }
    },
  },
};
</script>

<style>
</style>
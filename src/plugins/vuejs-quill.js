import Vue from 'vue'
import { quillEditor } from 'vuejs-quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.component('QuillEditor', quillEditor)
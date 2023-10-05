<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <div class="text-center my-4 text-uppercase">
          <h3>Create Blog</h3>
        </div>

        <v-textarea v-model="title" label="Title" class="mt-3" hide-details variant="outlined" auto-grow rows="1">
        </v-textarea>

        <v-textarea v-model="description" label="Description" class="my-3" hide-details variant="outlined" auto-grow
          rows="3">
        </v-textarea>

        <v-autocomplete v-model="values" :items="items" density="compact" label="Category" class="my-3" hide-details
          variant="outlined">
        </v-autocomplete>

        <div v-if="editor" class="editor-control">
          <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <v-icon icon="mdi-format-header-1"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <v-icon icon="mdi-format-header-2"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            <v-icon icon="mdi-format-header-3"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }">
            <v-icon icon="mdi-format-paragraph"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }">
            <v-icon icon="mdi-format-bold"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            <v-icon icon="mdi-format-italic"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }">
            <v-icon icon="mdi-format-underline"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            <v-icon icon="mdi-format-strikethrough"></v-icon>
          </v-btn>
          <v-btn size="small" class="px-0 py-0">
            <label htmlFor="add-img" class="px-4 py-1" style="cursor:pointer">
              <v-icon icon="mdi-image-outline"></v-icon>
            </label>
            <v-file-input id="add-img" @change="handleAddImg" class="d-none"></v-file-input>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }">
            <v-icon icon="mdi-format-color-highlight"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            <v-icon icon="mdi-format-align-left"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            <v-icon icon="mdi-format-align-center"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            <v-icon icon="mdi-format-align-right"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
            <v-icon icon="mdi-format-align-justify"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()">
            <v-icon icon="mdi-undo"></v-icon>
          </v-btn>
          <v-btn size="small" @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()">
            <v-icon icon="mdi-redo"></v-icon>
          </v-btn>
        </div>

        <editor-content :editor="editor" class="editor-content" />

        <v-text-field v-model="author" label="Author" class="mt-3" hide-details variant="outlined" density="compact">
        </v-text-field>

      </v-col>

      <v-col cols="3">
        <div class="border mt-15">
          <h4>Thumnail</h4>
          <v-file-input id="img-input" @change="handleUploadImg" label="File input" class="d-none"></v-file-input>
          <div :style="{ backgroundImage: `url(${previewImageUrl})` }" class="preview-image border">
            <label htmlFor="img-input" class="img-input d-flex align-center justify-center">
              <v-icon v-if="!previewImageUrl" icon="mdi-image-plus-outline" size="large" class="img-upload-icon">
              </v-icon>
            </label>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="text-center">
          <v-btn class="bg-red me-3">Cancel</v-btn>
          <v-btn class="bg-blue px-7" @click="handleSave">Save</v-btn>
        </div>
      </v-col>
    </v-row>

    <div v-html="html"></div>
  </v-container>
</template>

<script>
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

import getBase64 from '@/utils/getBase64'
import { useBlogsStore } from "../store/blogsStore";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      previewImageUrl: '',
      title: '',
      description: '',
      image: '',
      author: '',
      content: '',
      html: '',
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: '',
      diag: false,
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        Image,
        Underline
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    async handleUploadImg(e) {
      let data = e.target.files
      let file = data[0]
      if (file) {
        let base64 = await getBase64(file)
        console.log(base64)
        this.image = base64
        let objectUrl = URL.createObjectURL(file)
        console.log(objectUrl)
        this.previewImageUrl = objectUrl
      }

    },

    handleAddImg(e) {
      let data = e.target.files
      let file = data[0]
      if (file) {

        const url = URL.createObjectURL(file)

        if (url) {
          this.editor.chain().focus().setImage({ src: url }).run()
        }
      }
    },

    handleSave() {
      this.html = this.editor.getHTML()
      console.log(this.html)
      const blogsStore = useBlogsStore();
      blogsStore.createBlog({
        title: this.title,
        description: this.description,
        category: this.category,
        content: this.html,
        author: this.author,
        image: this.image,
        userId: this.userId,
      })
      console.log('create blog...')
    },





  }
}
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  >*+* {
    margin-top: 2px;
  }

  ul,
  ol {
    padding: 0 2px;
  }

  // h1,
  // h2,
  // h3,
  // h4,
  // h5,
  // h6 {
  //   line-height: 1.1;
  // }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  img {
    max-width: 100%;
    height: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }

}

.editor-control {
  border: #ababab solid 1px;

  button {
    margin: 0 2px 5px 0;
  }
}

.tiptap.ProseMirror {
  border: #ababab solid 1px;
  padding: 5px;
  min-height: 200px;
}

.preview-image {
  height: 200px;
  background: center no-repeat;
  background-size: contain;
}


.img-input {
  display: block;
  height: 200px;
  cursor: pointer;
}

.img-upload-icon {
  scale: 3;
  color: #ababab;
}
</style>

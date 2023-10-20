<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <div class="text-center my-4 text-uppercase">
          <h3>Create Blog</h3>
        </div>

        <v-textarea
          v-model="newBlog.title"
          label="Title"
          class="mt-3"
          hide-details
          variant="outlined"
          auto-grow
          rows="1"
        >
        </v-textarea>

        <v-textarea
          v-model="newBlog.description"
          label="Description"
          class="my-3"
          hide-details
          variant="outlined"
          auto-grow
          rows="3"
        >
        </v-textarea>

        <v-autocomplete
          v-model="newBlog.category"
          :items="items"
          density="compact"
          label="Category"
          class="my-3"
          hide-details
          variant="outlined"
        >
        </v-autocomplete>

        <div v-if="editor" class="editor-control">
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            <v-icon icon="mdi-format-header-1"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            <v-icon icon="mdi-format-header-2"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            <v-icon icon="mdi-format-header-3"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            <v-icon icon="mdi-format-paragraph"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
          >
            <v-icon icon="mdi-format-bold"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
          >
            <v-icon icon="mdi-format-italic"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'is-active': editor.isActive('underline') }"
          >
            <v-icon icon="mdi-format-underline"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            <v-icon icon="mdi-format-strikethrough"></v-icon>
          </v-btn>
          <v-btn size="small" class="px-0 py-0">
            <label htmlFor="add-img" class="px-4 py-1" style="cursor: pointer">
              <v-icon icon="mdi-image-outline"></v-icon>
            </label>
            <v-file-input
              id="add-img"
              @change="handleAddImg"
              class="d-none"
            ></v-file-input>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }"
          >
            <v-icon icon="mdi-format-color-highlight"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          >
            <v-icon icon="mdi-format-align-left"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          >
            <v-icon icon="mdi-format-align-center"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          >
            <v-icon icon="mdi-format-align-right"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          >
            <v-icon icon="mdi-format-align-justify"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <v-icon icon="mdi-undo"></v-icon>
          </v-btn>
          <v-btn
            size="small"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >
            <v-icon icon="mdi-redo"></v-icon>
          </v-btn>
        </div>

        <editor-content :editor="editor" class="editor-content" />
      </v-col>

      <v-col cols="3">
        <div class="border mt-15">
          <h4>Thumnail</h4>
          <v-file-input
            id="img-input"
            @change="handleUploadImg"
            label="File input"
            class="d-none"
          ></v-file-input>
          <div
            :style="{ backgroundImage: `url(${previewImageUrl})` }"
            class="preview-image border"
          >
            <label
              htmlFor="img-input"
              class="img-input d-flex align-center justify-center"
            >
              <v-icon
                v-if="!previewImageUrl"
                icon="mdi-image-plus-outline"
                size="large"
                class="img-upload-icon"
              >
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

    <Snackbar
      v-model="isShowSnackBar"
      :text="snackBarText"
      :icon="snackBarIcon"
      :snackbarColor="snackbarColor"
    />
    <!-- <v-btn @click="test"></v-btn> -->
    <!-- <div v-html="html"></div> -->
  </v-container>
</template>

<script>
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

import getBase64 from "@/utils/getBase64";
import { useBlogsStore } from "../store/blogsStore";
import Snackbar from "@/components/Snackbar.vue";

export default {
  components: {
    EditorContent,
    Snackbar,
  },

  data() {
    return {
      editor: null,
      previewImageUrl: "",
      newBlog: {
        title: "",
        description: "",
        category: "",
        image: "",
        editorContent: "",
        userId: "",
      },
      content: "",
      items: ["category 1", "category 2", "category 3", "category 4"],
      isShowSnackBar: false,
      snackBarText: "",
      snackbarColor: "",
      snackBarIcon: "",
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight,
        Image,
        Underline,
      ],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  methods: {
    async handleUploadImg(e) {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        let base64 = await getBase64(file);
        console.log(base64);
        this.newBlog.image = base64;
        let objectUrl = URL.createObjectURL(file);
        console.log(objectUrl);
        this.previewImageUrl = objectUrl;
      }
    },
    // test() {
    //   this.isShowSnackBar = true
    // },
    handleAddImg(e) {
      let data = e.target.files;
      let file = data[0];
      if (file) {
        const url = URL.createObjectURL(file);

        if (url) {
          this.editor.chain().focus().setImage({ src: url }).run();
        }
      }
    },

    handleSave() {
      this.newBlog.editorContent = this.editor.getHTML();
      if (
        this.newBlog.title &&
        this.newBlog.description &&
        this.newBlog.category &&
        this.newBlog.editorContent &&
        this.newBlog.image
      ) {
        const blogsStore = useBlogsStore();

        blogsStore.createBlog({
          title: this.newBlog.title,
          description: this.newBlog.description,
          category: this.newBlog.category,
          content: this.newBlog.editorContent,
          image: this.newBlog.image,
          user_id: this.newBlog.userId,
        });
        console.log("create blog...");
        this.isShowSnackBar = true;
        this.snackBarText = "Create blog successfully!";
        this.snackbarColor = "green";
        this.snackBarIcon = "mdi-check-circle";
        this.reset();
      } else {
        console.log("Failed...");
        this.isShowSnackBar = true;
        this.snackbarColor = "red";
        this.snackBarText = "Something went wrong!";
        this.snackBarIcon = "mdi-alert-circle";
      }
    },

    reset() {
      this.newBlog = {
        title: "",
        description: "",
        category: "",
        image: "",
        editorContent: "",
      };
      this.previewImageUrl = "";
      this.editor.content = "";
      console.log(this.newBlog);
    },
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
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
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
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
    background-color: #faf594;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  img {
    max-width: 100%;
    height: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid #68cef8;
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

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div v-html="blogContent"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBlogsStore } from "../store/blogsStore";
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'

let blog = ref(null)
let blogId = ref(null)
let blogContent = ref(null)

const route = useRoute()
const blogsStore = useBlogsStore()


onMounted(async () => {
  blogId = route.params.id
  await getBlogs(blogId)
  blog.value = blogsStore.blogs
  blogContent.value = blog.value.content
})

const getBlogs = async (blogId) => {
  await blogsStore.getBlogs(blogId);
}


</script>


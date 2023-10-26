<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h3>Blogs management</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>User ID</th>
              <th>Blog ID</th>
              <th>Author</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th>Thumnail</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="blogs">
            <tr v-for="(blog, index) in blogs" v-bind:key="blog.id">
              <td>{{ index + 1 }}</td>
              <td>{{ blog.userId }}</td>
              <td>{{ blog.id }}</td>
              <td>{{ blog.author }}</td>
              <td>{{ blog.category }}</td>
              <td>{{ blog.title }}</td>
              <td>{{ blog.description }}</td>
              <td>
                <v-img
                  :src="getImageSrc(blog.image)"
                  alt=""
                  width="100"
                  height="100"
                ></v-img>
              </td>
              <td>{{ blog.content }}</td>
              <td>
                <v-btn
                  icon="mdi-pencil"
                  size="x-small"
                  class="me-2 text-orange"
                ></v-btn>
                <v-btn
                  @click="deleteBlog(blog.id)"
                  icon="mdi-delete"
                  size="x-small"
                  class="text-red"
                ></v-btn>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td colspan="10" class="text-center" style="height: 100px">
                <v-progress-circular indeterminate></v-progress-circular>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";

import { useBlogsStore } from "../store/blogsStore";
import { Buffer } from "buffer";

const blogsStore = useBlogsStore();
let blogs = ref(null);

const getBlogs = onMounted(async () => {
  await blogsStore.getBlogs("all");
  blogs.value = blogsStore.blogs;
});

const getImageSrc = (image) => {
  if (image) {
    const imageBuffer = new Buffer(image, "base64").toString("binary");
    return imageBuffer;
  }
};

const deleteBlog = (blogId) => {
  blogsStore.deleteBlog(blogId);
  console.log("delete blog: ", blogId);
};
</script>

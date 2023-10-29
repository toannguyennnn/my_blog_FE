<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h3 class="text-uppercase mt-3">Blogs management</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex justify-end mb-5">
          <v-btn class="bg-blue-darken-4"
            ><v-icon icon="mdi-account-plus" class="me-2"></v-icon>Create
            blog</v-btn
          >
        </div>

        <v-table hover>
          <thead class="bg-blue">
            <tr>
              <th class="text-white">Index</th>
              <th class="text-white">User ID</th>
              <th class="text-white">Blog ID</th>
              <th class="text-white">Category</th>
              <th class="text-white">Title</th>
              <th class="text-white">Description</th>
              <th class="text-white">Thumnail</th>
              <th class="text-white">Content</th>
              <th class="text-white">Action</th>
            </tr>
          </thead>
          <tbody v-if="blogs">
            <tr v-for="(blog, index) in blogs" v-bind:key="blog.id">
              <td>{{ index + 1 }}</td>
              <td>{{ blog.user_id }}</td>
              <td>{{ blog.id }}</td>
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

          <tbody v-else>
            <tr>
              <td colspan="10" class="text-center" style="height: 100px">
                <v-progress-circular indeterminate></v-progress-circular>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="9">
                <v-pagination
                  v-model="page"
                  :length="totalPages"
                  :total-visible="5"
                  class="my-3"
                  @update:modelValue="fetchPageData"
                ></v-pagination>
              </td>
            </tr>
          </tfoot>
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
let response = ref("");
let blogs = ref(null);
let page = ref(1);
let limitPerPage = ref(5);
let totalRows = ref(null);
let totalPages = ref(null);

onMounted(async () => {
  response.value = await blogsStore.getBlogs(
    "all",
    page.value,
    limitPerPage.value
  );
  blogs.value = response.value.data.blogs;
  totalRows.value = response.value.data.totalRows;
  totalPages.value = response.value.data.totalPages;
});

const fetchPageData = async () => {
  blogs.value = null;
  response.value = await blogsStore.getBlogs(
    "all",
    page.value,
    limitPerPage.value
  );
  blogs.value = response.value.data.blogs;
};

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

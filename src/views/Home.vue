<template>
  <v-container fluid>
    <v-row>
      <v-col lg="10" md="12">
        <div
          v-if="categories"
          v-for="(category, categoryIndex) in categories"
          v-bind:key="'category' + categoryIndex"
        >
          <v-row class="mt-1">
            <v-col>
              <h3 class="text-uppercase text-blue">
                <v-icon icon="mdi-newspaper-variant-outline"></v-icon>
                <router-link to="#" class="ms-1 text-decoration-none text-blue">
                  {{ category }}
                </router-link>
              </h3>
              <v-divider thickness="2"></v-divider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" class="border">
              <router-link
                :to="{
                  name: 'Blog',
                  params: { id: blogsByCategory[categoryIndex][0].id },
                }"
                class="d-flex align-center"
              >
                <!-- <v-img
                    :src="getImageSrc(blogsByCategory[categoryIndex][0].image)"
                    alt=""
                    width="100"
                    height="100%"
                    class="border"
                    cover
                  >
                  </v-img> -->
                <v-img src="../assets/p2.jpg" alt="" height="250" cover></v-img>
              </router-link>
            </v-col>
            <v-col cols="6">
              <div class="text-justify">
                <h3>
                  <router-link
                    :to="{
                      name: 'Blog',
                      params: { id: blogsByCategory[categoryIndex][0].id },
                    }"
                    class="text-decoration-none text-black"
                  >
                    {{ blogsByCategory[categoryIndex][0].title }}
                  </router-link>
                </h3>
                <p class="blog-description">
                  <router-link
                    :to="{
                      name: 'Blog',
                      params: { id: blogsByCategory[categoryIndex][0].id },
                    }"
                    class="text-decoration-none text-black"
                  >
                    {{ blogsByCategory[categoryIndex][0].description }}
                  </router-link>
                </p>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="n in 6" v-bind:key="n" lg="4" md="6" sm="12">
              <div
                class="d-flex blog-item"
                v-if="blogsByCategory[categoryIndex][n]"
              >
                <router-link
                  :to="{
                    name: 'Blog',
                    params: { id: blogsByCategory[categoryIndex][n].id },
                  }"
                  class="d-flex align-center"
                >
                  <!-- <v-img
                    :src="getImageSrc(blogsByCategory[categoryIndex][n].image)"
                    alt=""
                    width="100"
                    height="100%"
                    class="border"
                    cover
                  >
                  </v-img> -->
                  <v-img
                    src="../assets/p1.jpg"
                    alt=""
                    width="100"
                    height="100%"
                    class="border"
                    cover
                  >
                  </v-img>
                </router-link>
                <span class="text-justify ms-2">
                  <h4>
                    <router-link
                      :to="{
                        name: 'Blog',
                        params: { id: blogsByCategory[categoryIndex][n].id },
                      }"
                      class="text-decoration-none text-black"
                    >
                      {{ blogsByCategory[categoryIndex][n].title }}
                    </router-link>
                  </h4>
                  <p class="blog-description">
                    <router-link
                      :to="{
                        name: 'Blog',
                        params: { id: blogsByCategory[categoryIndex][n].id },
                      }"
                      class="text-decoration-none text-black"
                    >
                      {{ blogsByCategory[categoryIndex][n].description }}
                    </router-link>
                  </p>
                </span>
              </div>

              <v-divider
                v-if="blogsByCategory[categoryIndex][n]"
                class="mt-3"
              ></v-divider>
            </v-col>
          </v-row>

          <v-row v-if="blogsByCategory[categoryIndex][7]">
            <v-col class="d-flex justify-center">
              <router-link
                to="#"
                class="text-blue text-subtitle-2 text-decoration-none"
                >Xem thêm
                <v-icon
                  icon="mdi-chevron-right-circle"
                  class="px-2"
                  size="x-small"
                ></v-icon>
              </router-link>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>
        </div>
        <div v-else class="h-75 d-flex align-center justify-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-col>

      <v-divider vertical inset class="hidden-sm-and-down"></v-divider>

      <v-col cols="2" class="hidden-md-and-down">
        <div>
          <v-row>
            <v-col class="text-center">
              <h4>Most popular blogs</h4>
            </v-col>
          </v-row>

          <v-row v-for="n in 3" v-bind:key="n">
            <v-col cols="3" class="d-flex align-center">
              <v-img src="../assets/logo.svg" alt=""></v-img>
            </v-col>
            <v-col cols="9" class="text-justify py-0">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </v-col>
            <div class="w-100 text-right me-2">
              <v-icon icon="mdi-eye" size="x-small"></v-icon>
              <span class="text-body-2">10.000</span>
            </div>
            <v-divider class="mx-3"></v-divider>
          </v-row>
        </div>

        <div class="mt-6">
          <v-card>
            <v-card-title class="text-body-1 font-weight-bold text-center"
              >Email Subscription</v-card-title
            >
            <v-card-text>
              <p>Subscribe to receive the lastest information!</p>
              <v-text-field
                label="Name"
                hide-details
                density="compact"
              ></v-text-field>
              <v-text-field
                label="Email"
                class="mt-2"
                density="compact"
                hide-details
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn block class="bg-blue text-none">Subscribe</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBlogsStore } from "../store/blogsStore";
import { ref, onMounted, onBeforeMount } from "vue";
import { Buffer } from "buffer";

const blogsStore = useBlogsStore();
let blogs = ref(null);
let blogsByCategory = ref([]);
let categories = ref(null);
let imageBuffer = ref("");
let response = ref("");

onMounted(async () => {
  response.value = await blogsStore.getBlogs("all");

  blogs.value = response.value.blogs;

  getCategory();

  blogsByCategory = filterBlogsByCategory();
});

// const getBlogs = async () => {
//   await blogsStore.getBlogs("all");
// };

const getCategory = () => {
  categories.value = [];
  blogs.value.forEach((blog) => {
    categories.value.push(blog.category);
  });
  categories = unique(categories.value);
};

const unique = (arr) => {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const filterBlogsByCategory = () => {
  let newBlogArr = [];
  categories.forEach((category) => {
    let filteredBlogs = blogs.value.filter((blog) => {
      return blog.category == category;
    });
    newBlogArr.push(filteredBlogs);
  });
  return newBlogArr;
};

const getImageSrc = (image) => {
  if (image) {
    const imageBuffer = new Buffer(image, "base64").toString("binary");
    return imageBuffer;
  }
};
</script>

<style scoped lang="scss">
a:hover {
  color: #2196f3 !important;
}
.blog-description {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 25px;
  -webkit-line-clamp: 3;
  height: 75px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.blog-item {
  height: 120px;
  overflow: hidden;
}
</style>

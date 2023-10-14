<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
        <div v-if="categories" v-for="(category, categoryIndex) in categories" v-bind:key="'category' + categoryIndex">
          <v-row class="mt-1">
            <v-col>
              <h3 class="text-uppercase">
                <v-icon icon="mdi-newspaper-variant-outline"></v-icon>
                <router-link to="#" class="ms-1 text-decoration-none text-black">
                  {{ category }}
                </router-link>
              </h3>
              <v-divider thickness="2"></v-divider>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="6" class="border">
              <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][0].id } }"
                class="d-flex align-center">
                <v-img :src="getImageSrc(blogsByCategory[categoryIndex][0].image)" alt="" height="200" cover></v-img>
              </router-link>
            </v-col>
            <v-col cols="6">
              <div class="text-justify">
                <h3>
                  <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][0].id } }"
                    class="text-decoration-none text-black">
                    {{ blogsByCategory[categoryIndex][0].title }}
                  </router-link>
                </h3>
                <p class="blog-description">
                  <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][0].id } }"
                    class="text-decoration-none text-black">
                    {{ blogsByCategory[categoryIndex][0].description }}
                  </router-link>
                </p>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="n in [1, 2, 3]" v-bind:key="n">
              <div class="d-flex" v-if="blogsByCategory[categoryIndex][n]">
                <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                  class="d-flex align-center">
                  <v-img :src="getImageSrc(blogsByCategory[categoryIndex][n].image)" alt="" width="100" height="100%"
                    class="border" cover>
                  </v-img>
                </router-link>
                <span class="text-justify ms-2">
                  <h4>
                    <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                      class="text-decoration-none text-black">
                      {{ blogsByCategory[categoryIndex][n].title }}
                    </router-link>
                  </h4>
                  <p class="blog-description">
                    <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                      class="text-decoration-none text-black">
                      {{ blogsByCategory[categoryIndex][n].description }}
                    </router-link>
                  </p>
                </span>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="n in [4, 5, 6]" v-bind:key="n">
              <div class="d-flex" v-if="blogsByCategory[categoryIndex][n]">
                <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                  class="d-flex align-center">
                  <v-img :src="getImageSrc(blogsByCategory[categoryIndex][n].image)" alt="" width="100" height="100%"
                    class="border"></v-img>
                </router-link>
                <span class="text-justify ms-2">
                  <h4>
                    <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                      class="text-decoration-none text-black">
                      {{ blogsByCategory[categoryIndex][n].title }}
                    </router-link>
                  </h4>
                  <p class="blog-description">
                    <router-link :to="{ name: 'Blog', params: { id: blogsByCategory[categoryIndex][n].id } }"
                      class="text-decoration-none text-black">
                      {{ blogsByCategory[categoryIndex][n].description }}
                    </router-link>
                  </p>
                </span>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>
        </div>
        <div v-else class="h-75 d-flex align-center justify-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-col>

      <v-divider vertical inset></v-divider>

      <v-col cols="2">
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
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
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
            <v-card-title class="text-body-1 font-weight-bold text-center">Email Subscription</v-card-title>
            <v-card-text>
              <p>Subscribe to receive the lastest information! </p>
              <v-text-field label="Name" hide-details density="compact"></v-text-field>
              <v-text-field label="Email" class="mt-2" density="compact" hide-details></v-text-field>
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
import { ref, onMounted, onBeforeMount } from "vue"
import { Buffer } from 'buffer';

const blogsStore = useBlogsStore()
let blogs = ref(null)
let blogsByCategory = ref([])
let categories = ref(null)
let imageBuffer = ref('')

onMounted(async () => {
  await getBlogs()
  blogs.value = blogsStore.blogs

  getCategory()

  blogsByCategory = filterBlogsByCategory()

  console.log('mounted...')

  console.log(categories)
  console.log(blogsByCategory)
})

const getBlogs = async () => {
  await blogsStore.getBlogs('all');
}

const getCategory = () => {
  categories.value = []
  blogs.value.forEach((blog) => {
    categories.value.push(blog.category)
  })
  categories = unique(categories.value)
}

const unique = (arr) => {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

const filterBlogsByCategory = () => {
  let newBlogArr = []
  categories.forEach((category) => {
    let filteredBlogs = blogs.value.filter((blog) => {
      return blog.category == category
    })
    newBlogArr.push(filteredBlogs)
  })
  return newBlogArr
}

const getImageSrc = (image) => {
  if (image) {
    const imageBuffer = new Buffer(image, 'base64').toString('binary')
    return imageBuffer
  }
  console.log('No imageBuffer')
}
</script>

<style scoped lang="scss">
a:hover {
  color: #2196F3 !important;
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
</style>

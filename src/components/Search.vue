<template>
  <div class="hidden-sm-and-down">
    <v-text-field
      v-model="searchValue"
      :loading="loading"
      density="compact"
      variant="outlined"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      class="search-input"
      @click:append-inner="searchHandler"
      @keyup.enter="searchHandler"
      @click:control="onFocus"
      @blur="onBlur"
      @input="onInput"
    ></v-text-field>

    <v-card class="search-result" color="grey-lighten-3">
      <v-card-text v-if="isShow" class="text-center">
        <div v-if="loading">
          <v-progress-circular indeterminate></v-progress-circular>
          <div>Searching...</div>
        </div>

        <div v-else>
          <div v-if="!searchValue || !searchResults">
            Click Enter to search something...
          </div>

          <div v-if="searchResults">
            <div v-if="searchResults.length > 0">
              <div>Search results:</div>
              <div v-for="searchResult in searchResults">
                <router-link
                  :to="{ name: 'Blog', params: { id: searchResult.id } }"
                  >{{ searchResult.title }}</router-link
                >
              </div>
            </div>

            <div v-else>No results</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useBlogsStore } from "../store/blogsStore";
import { ref } from "vue";

let loading = ref(false);
let blogsStore = useBlogsStore();
let blogs = ref(null);
let response = ref("");
let searchValue = ref(null);
let searchResults = ref(null);
let isShow = ref(false);

const props = defineProps(["searchInputStyle"]);

const searchHandler = async () => {
  loading.value = true;
  response.value = await blogsStore.getBlogs("all");

  blogs.value = response.value.blogs;
  console.log("search value", searchValue.value.toLowerCase());
  console.log("all blogs", blogs.value);

  const filterBlogs = blogs.value.filter((blog) => {
    return (
      blog.description
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      blog.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  });
  console.log("filterBlogs", filterBlogs);

  searchResults.value = filterBlogs;

  loading.value = false;
};
const onInput = () => {
  searchResults.value = null;
};
const onFocus = () => {
  isShow.value = true;
};

const onBlur = () => {
  isShow.value = false;
};
</script>
<style>
.search-input {
  max-width: 100px;
  position: relative;
}
.search-result {
  right: -100%;
  min-width: 400px;
  position: absolute;
}
</style>

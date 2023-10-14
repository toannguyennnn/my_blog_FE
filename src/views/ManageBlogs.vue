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
                <v-img :src="getImageSrc(blog.image)" alt="" width="100" height="100"></v-img>
              </td>
              <td>{{ blog.content }}</td>
              <td>
                <v-btn icon="mdi-pencil" size="x-small" class="me-2 text-orange"></v-btn>
                <v-btn @click="deleteBlog(blog.id)" icon="mdi-delete" size="x-small" class="text-red"></v-btn>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="10" class="text-center" style="height: 100px;">
                <v-progress-circular indeterminate></v-progress-circular>
              </td>
            </tr>
          </tbody>
        </v-table>

        <!-- <v-btn @click="test">test</v-btn>
        <v-btn @click="createDialog = true">Create user</v-btn> -->
      </v-col>
    </v-row>

    <!-- <v-dialog v-model="editDialog" width="500">
      <v-card>
        <v-card-title class="text-center">Edit user</v-card-title>
        <v-card-text>
          <v-text-field
            class="mb-3"
            hide-details
            label="First name"
            v-model="firstName"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Last name"
            v-model="lastName"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Email"
            v-model="email"
            type="email"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Phonenumber"
            v-model="phonenumber"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Address"
            v-model="address"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="editDialog = false" class="bg-red">Close Dialog</v-btn>
          <v-btn @click="handleEditUser" class="bg-blue">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialog" width="500">
      <v-card>
        <v-card-title class="text-center">Create user</v-card-title>
        <v-card-text>
          <v-text-field
            class="mb-3"
            hide-details
            label="First name"
            v-model="firstName"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Last name"
            v-model="lastName"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Email"
            v-model="email"
            type="email"
          ></v-text-field
          ><v-text-field
            class="mb-3"
            hide-details
            label="Password"
            v-model="password"
            type="password"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Phonenumber"
            v-model="phonenumber"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            hide-details
            label="Address"
            v-model="address"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="createDialog = false" class="bg-red"
            >Close Dialog</v-btn
          >
          <v-btn @click="handleCreateUser" class="bg-blue">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";

import { useBlogsStore } from "../store/blogsStore";
import { Buffer } from 'buffer';

const blogsStore = useBlogsStore();
let blogs = ref(null);

// let editDialog = ref(false);
// let createDialog = ref(false);
// let firstName = ref("");
// let lastName = ref("");
// let email = ref("");
// let password = ref("");
// let harshPassword = ref("");
// let phonenumber = ref("");
// let address = ref("");
// let userId = ref("");

const getBlogs = onMounted(async () => {
  await blogsStore.getBlogs('all');
  blogs.value = blogsStore.blogs
});

const getImageSrc = (image) => {
  if (image) {
    const imageBuffer = new Buffer(image, 'base64').toString('binary')
    return imageBuffer
  }
  console.log('No imageBuffer')
}

// const test = () => {
//   console.log("user>>>>>", usersStore.users);
// };

const deleteBlog = (blogId) => {
  blogsStore.deleteBlog(blogId);
  console.log("delete blog: ", blogId);
};

// const editUser = (user) => {
//   editDialog.value = true;
//   firstName.value = user.firstName;
//   lastName.value = user.lastName;
//   email.value = user.email;
//   phonenumber.value = user.phonenumber;
//   address.value = user.address;
//   userId.value = user.id;
// };

// const handleEditUser = () => {
//   usersStore.updateUser(userId.value, {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     email: email.value,
//     phonenumber: phonenumber.value,
//     address: address.value,
//   });
//   editDialog.value = false;
//   console.log("update user: ", userId.value);
// };

// const harshPsw = (psw) => {
//   return (harshPassword.value = md5(psw));
// };

// const handleCreateUser = () => {
//   harshPsw(password.value);
//   usersStore.createUser({
//     firstName: firstName.value,
//     lastName: lastName.value,
//     email: email.value,
//     password: harshPassword.value,
//     phonenumber: phonenumber.value,
//     address: address.value,
//   });
//   createDialog.value = false;
//   console.log("create user successfully");
// };
</script>

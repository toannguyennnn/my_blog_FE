<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h3>User management</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>UserId</th>
              <th>fullname</th>
              <th>email</th>
              <th>phonenumber</th>
              <th>User group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in usersStore.users" v-bind:key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.id }}</td>
              <td>{{ user.fullname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phonenumber }}</td>
              <td>{{ user.userGroup_id }}</td>
              <td>
                <v-btn
                  @click="editUser(user)"
                  icon="mdi-pencil"
                  size="x-small"
                  class="me-2 text-orange"
                ></v-btn>
                <v-btn
                  @click="deleteUser(user.id)"
                  icon="mdi-delete"
                  size="x-small"
                  class="text-red"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-btn @click="test">test</v-btn>
        <v-btn @click="createDialog = true">Create user</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="editDialog" width="500">
      <v-card>
        <v-card-title class="text-center">Edit user</v-card-title>
        <v-card-text>
          <v-text-field
            class="mb-3"
            hide-details
            label="Fullname"
            v-model="fullname"
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
            label="Usergroup Id"
            v-model="userGroup_id"
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
            label="Fullname"
            v-model="fullname"
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
            label="Usergroup Id"
            v-model="userGroup_id"
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
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";

import { useUsersStore } from "../store/usersStore";
import md5 from "md5";

const usersStore = useUsersStore();
let users = ref([]);
let editDialog = ref(false);
let createDialog = ref(false);
let fullname = ref("");
let email = ref("");
let password = ref("");
let harshPassword = ref("");
let phonenumber = ref("");
let userId = ref("");
let userGroup_id = ref("");

const getUsers = onMounted(() => {
  usersStore.getUsers();
});

const test = () => {
  console.log("user>>>>>", usersStore.users);
};

const deleteUser = (userId) => {
  usersStore.deleteUser(userId);
  console.log("delete user: ", userId);
};

const editUser = (user) => {
  editDialog.value = true;
  userId.value = user.id;
  fullname.value = user.fullname;
  email.value = user.email;
  phonenumber.value = user.phonenumber;
  userGroup_id.value = user.userGroup_id;
};

const handleEditUser = () => {
  usersStore.updateUser(userId.value, {
    fullname: fullname.value,
    email: email.value,
    phonenumber: phonenumber.value,
    userGroup_id: userGroup_id.value,
  });
  editDialog.value = false;
  console.log("update user: ", userId.value);
};

const harshPsw = (psw) => {
  return (harshPassword.value = md5(psw));
};

const handleCreateUser = () => {
  harshPsw(password.value);
  usersStore.createUser({
    fullname: fullname.value,
    email: email.value,
    password: harshPassword.value,
    phonenumber: phonenumber.value,
    userGroup_id: userGroup_id.value || 2,
  });
  createDialog.value = false;
  console.log("create user successfully");
};
</script>

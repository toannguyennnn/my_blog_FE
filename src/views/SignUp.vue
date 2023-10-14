<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="3">
        <v-img src="../assets/logo.png"></v-img>
        <h4>Sign up to create your own blogs now!</h4>
      </v-col>
      <v-col cols="9" class="d-flex align-center justify-center">
        <v-card width="600">
          <v-card-title class="text-center">Sign Up</v-card-title>
          <v-card-text>
            <v-text-field v-model="user.firstName" label="Firstname" :rules="nameRules"></v-text-field>
            <v-text-field v-model="user.lastName" label="Lastname"></v-text-field>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <v-text-field v-model="user.phonenumber" label="Phonenumber"></v-text-field>
            <v-text-field v-model="user.address" label="Address"></v-text-field>
            <v-text-field :type="isHidePass ? 'password' : 'text'" v-model="password" label="Password"
              :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePass = !isHidePass"></v-text-field>
            <v-text-field :type="isHidePassConfirm ? 'password' : 'text'" v-model="confirmPassword"
              label="Confirm password" :append-inner-icon="isHidePassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePassConfirm = !isHidePassConfirm"></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="handleSignUp" class="bg-blue">Sign up</v-btn>
            <v-btn class="bg-grey-lighten-2">Cancel</v-btn>
          </v-card-actions>
        </v-card></v-col>

    </v-row>
  </v-container>
</template>

<script>
import { useUsersStore } from "../store/usersStore";
import md5 from "md5"

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phonenumber: "",
        harshPassword: ''
      },
      password: "",
      confirmPassword: "",
      isHidePass: true,
      isHidePassConfirm: true,
      usersStore: useUsersStore()
    };
  },
  computed: {
    nameRules() {
      (value) => !!value || "Field is required";
    },
  },
  methods: {
    handleSignUp() {
      this.user.harshPassword = md5(this.password)
      this.usersStore.createUser({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.harshPassword,
        phonenumber: this.user.phonenumber,
        address: this.user.address,
      });

      console.log("create user successfully", this.user);
    },
  },
};
</script>

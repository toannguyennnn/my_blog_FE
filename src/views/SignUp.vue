<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="6">
        <div class="d-flex align-center">
          <img src="../assets/logo.png" class="w-25" />
          <span class="ms-2 text-justify position-relative">
            <h1 class="text-blue">Blogs</h1>
            <h3>Write your own stories!</h3>
            <p>
              Choose the perfect design. Create a beautiful blog that fits your
              style. Choose from a selection of easy-to-use templates – all with
              flexible layouts and more...
            </p>

            <div class="hhhh"></div>
            <div class="hhhh2"></div>
          </span>
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-card width="600">
          <v-card-title class="text-center">Sign Up</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="user.firstName"
              label="Firstname"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              v-model="user.lastName"
              label="Lastname"
            ></v-text-field>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <v-text-field
              v-model="user.phonenumber"
              label="Phonenumber"
            ></v-text-field>
            <v-text-field v-model="user.address" label="Address"></v-text-field>
            <v-text-field
              :type="isHidePass ? 'password' : 'text'"
              v-model="password"
              label="Password"
              :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePass = !isHidePass"
            ></v-text-field>
            <v-text-field
              :type="isHidePassConfirm ? 'password' : 'text'"
              v-model="confirmPassword"
              label="Confirm password"
              :append-inner-icon="isHidePassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePassConfirm = !isHidePassConfirm"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="handleSignUp" class="bg-blue" block>Sign up</v-btn>
          </v-card-actions>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import md5 from "md5";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phonenumber: "",
        harshPassword: "",
      },
      password: "",
      confirmPassword: "",
      isHidePass: true,
      isHidePassConfirm: true,
      authStore: useAuthStore(),
    };
  },
  computed: {
    nameRules() {
      (value) => !!value || "Field is required";
    },
  },
  methods: {
    handleSignUp() {
      this.user.harshPassword = md5(this.password);
      this.authStore.signUp({
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

<style lang="scss">
.hhhh {
  border-radius: 10px;
  width: 100px;
  height: 8px;
  background-color: #6fb2e9;
  position: absolute;
  left: 0px;
}
.hhhh2 {
  border-radius: 10px;
  width: 160px;
  height: 15px;
  background-color: #2196f3;
  position: absolute;
  left: 20px;
  bottom: -30px;
}
</style>

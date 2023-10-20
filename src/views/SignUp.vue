<template>
  <v-container fluid>
    <v-row>
      <router-link to="/" class="text-decoration-none text-black py-3 px-3">
        <div class="d-flex align-center">
          <v-img src="../assets/logo.svg" alt="logo" width="30px"></v-img>
          <h2 class="mx-2">My Blog</h2>
        </div>
      </router-link>
    </v-row>

    <v-row class="align-center">
      <v-col class="d-flex align-center">
        <router-link to="/">
          <v-btn
            class="bg-grey-lighten-2 text-blue mx-1 my-1"
            icon="mdi-arrow-left-circle"
          ></v-btn>
        </router-link>
        <v-img src="../assets/p3.webp" class=""></v-img>
      </v-col>

      <v-col>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-card>
            <h2 class="text-center py-3">Sign Up</h2>
            <v-card-text>
              <v-text-field
                v-model="user.fullname"
                :readonly="loading"
                :rules="[required]"
                label="Fullname"
                density="compact"
                prepend-inner-icon="mdi-account-circle-outline"
              ></v-text-field>
              <v-text-field
                :readonly="loading"
                :rules="[required]"
                v-model="user.email"
                label="Email"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
              <v-text-field
                v-model="user.phonenumber"
                :readonly="loading"
                :rules="[required]"
                label="Phonenumber"
                density="compact"
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                :type="isHidePass ? 'password' : 'text'"
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                label="Password"
                :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isHidePass = !isHidePass"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
              <v-text-field
                :type="isHidePassConfirm ? 'password' : 'text'"
                v-model="confirmPassword"
                :readonly="loading"
                :rules="[required]"
                label="Confirm password"
                :append-inner-icon="
                  isHidePassConfirm ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="isHidePassConfirm = !isHidePassConfirm"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                :disabled="!form"
                :loading="loading"
                class="bg-blue"
                block
                size="large"
                >Sign up</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
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
        fullname: "",
        email: "",
        phonenumber: "",
        harshPassword: "",
      },
      password: "",
      confirmPassword: "",
      isHidePass: true,
      isHidePassConfirm: true,
      authStore: useAuthStore(),
      form: false,
      loading: false,
    };
  },
  // computed: {
  //   nameRules() {
  //     (value) => !!value || "Field is required";
  //   },
  // },
  methods: {
    async onSubmit() {
      if (!this.form) return;
      this.loading = true;
      try {
        this.user.harshPassword = md5(this.password);
        await this.authStore.signUp({
          fullname: this.user.fullname,
          email: this.user.email,
          password: this.user.harshPassword,
          phonenumber: this.user.phonenumber,
        });
        this.loading = false;

        console.log("create user successfully", this.user);
      } catch (error) {
        console.log(error);
      }
    },

    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<template>
  <div class="d-flex align-center justify-center pa-4 login-page">
    <v-card class="mx-auto elevation-3" width="950px" max-width="950px">
      <v-row>
        <v-col class="left-login-card d-flex align-center">
          <router-link to="/">
            <v-btn
              class="bg-grey-lighten-2 text-blue mx-1 my-1"
              icon="mdi-arrow-left-circle"
            ></v-btn>
          </router-link>
        </v-col>

        <v-col>
          <div class="d-flex align-center justify-center py-5">
            <v-img src="../assets/logo.svg" alt="logo" max-width="30px"></v-img>
            <h3 class="mx-2">My Blog</h3>
          </div>

          <v-form v-model="form" @submit.prevent="onSubmit" class="py-5">
            <h2 class="text-center">Log In</h2>
            <v-card-text>
              <v-text-field
                v-model="user.email"
                label="Email"
                :readonly="loading"
                :rules="[required]"
                prepend-inner-icon="mdi-email-outline"
              >
              </v-text-field>

              <v-text-field
                :type="isHidePass ? 'password' : 'text'"
                v-model="password"
                label="Password"
                :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isHidePass = !isHidePass"
                :readonly="loading"
                :rules="[required]"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
              <div class="text-right"><a href="#">Forget password?</a></div>

              <!-- <p class="text-red-darken-4 mt-2 font-weight-bold">
                {{ errorMessage }}
              </p> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="bg-blue"
                block
                :disabled="!form"
                :loading="loading"
                size="large"
                type="submit"
                >Log In</v-btn
              >
            </v-card-actions>

            <v-divider></v-divider>

            <div class="text-center">OR {{ errMessage }}</div>

            <div class="text-center">
              <v-btn icon="mdi-facebook" variant="text" color="blue"></v-btn>
              <v-btn icon="mdi-google" variant="text" color="blue"></v-btn>
            </div>

            <div class="text-center mt-5">
              <span class="text-grey">Not have an account yet? </span>
              <router-link :to="{ name: 'Sign Up' }">Sign up now!</router-link>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import md5 from "md5";

export default {
  data() {
    return {
      user: {
        email: "",
        harshPassword: "",
      },
      password: null,
      errorMessage: "",
      isHidePass: true,
      authStore: useAuthStore(),
      isError: false,
      errStyle: "",
      errMessage: "",
      form: false,
      loading: false,
    };
  },
  computed: {},
  methods: {
    async onSubmit() {
      if (!this.form) return;
      this.loading = true;
      try {
        this.user.harshPassword = md5(this.password);

        const data = await this.authStore.logIn({
          email: this.user.email,
          password: this.user.harshPassword,
        });

        this.loading = false;

        console.log(data);

      } catch (error) {
        console.log(error);
      }

      // const data = await this.authStore.logIn({
      //   email: this.user.email,
      //   password: this.user.harshPassword,
      // });
      // this.loading = false;
      // if (data.errMessage) {
      //   this.errorMessage = data.errMessage;
      // }
    },

    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  background-color: antiquewhite;
  .left-login-card {
    background-image: url("../assets/p2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>

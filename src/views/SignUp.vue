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
                :rules="[required, emailRule]"
                @input=""
                v-model="user.email"
                label="Email"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
              <v-text-field
                v-model="user.phonenumber"
                :readonly="loading"
                :rules="[required, phoneRule]"
                label="Phonenumber"
                density="compact"
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                :type="isHidePass ? 'password' : 'text'"
                v-model="password"
                :readonly="loading"
                :rules="[required, pswRule]"
                label="Password"
                @input="checkConfirmPsw()"
                :error-messages="checkConfirmPswMess"
                :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isHidePass = !isHidePass"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
              <v-text-field
                :type="isHidePassConfirm ? 'password' : 'text'"
                v-model="confirmPassword"
                :readonly="loading"
                :rules="[required, pswRule]"
                @input="checkConfirmPsw()"
                :error-messages="checkConfirmPswMess"
                label="Confirm password"
                :append-inner-icon="
                  isHidePassConfirm ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="isHidePassConfirm = !isHidePassConfirm"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>

              <p class="text-red-darken-4 mt-2 font-weight-bold">
                {{ errorMessage }}
              </p>
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

            <div class="text-center my-5">
              <span class="text-grey">Already had an account? </span>
              <router-link :to="{ name: 'Log In' }">Log in</router-link>
            </div>
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
      errorMessage: "",
      checkConfirmPswMess: "",
    };
  },
  methods: {
    async onSubmit() {
      if (!this.form) return;
      this.loading = true;
      try {
        this.user.harshPassword = md5(this.password);
        const data = await this.authStore.signUp({
          fullname: this.user.fullname,
          email: this.user.email,
          password: this.user.harshPassword,
          phonenumber: this.user.phonenumber,
        });
        this.loading = false;

        console.log("create user", data);

        if (data.errMessage) {
          this.errorMessage = data.errMessage;
        }
      } catch (error) {
        console.log(error);
      }
    },

    required(v) {
      return !!v || "Field is required";
    },

    pswRule(v) {
      if (v.length < 6) {
        return "Password must have more than 6 characters";
      } else return true;
    },

    emailRule(v) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isEmail = emailRegex.test(v);
      if (isEmail) {
        return true;
      } else {
        return "You have to enter correct email format like: example@email.com";
      }
    },
    phoneRule(v) {
      const phoneRegex = /^(\+\d{1,4}\s?)?(\d{10})$/;
      const isPhonenumber = phoneRegex.test(v);
      if (isPhonenumber) {
        return true;
      } else {
        return "Phonenumber format example: (+84) 123-456-7890 or 1234567890";
      }
    },

    checkConfirmPsw() {
      if (this.password && this.confirmPassword) {
        if (this.password === this.confirmPassword) {
          this.checkConfirmPswMess = "";
        } else {
          this.checkConfirmPswMess =
            "Password and confirmed password is not match";
        }
      }
    },
  },
};
</script>

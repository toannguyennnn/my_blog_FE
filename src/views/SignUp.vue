<template>
  <v-container>
    <v-row class="justify-center">
      <v-form
        ><v-card width="600">
          <v-card-title class="text-center">Sign Up</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Name"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field v-model="address" label="Address"></v-text-field>
            <v-text-field v-model="phone" label="Phone number"></v-text-field>
            <v-text-field
              :type="isHidePass ? 'password' : 'text'"
              v-model="password"
              label="Password"
              :append-inner-icon="isHidePass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePass = !isHidePass"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="confirmPassword"
              label="Confirm password"
              :append-inner-icon="isHidePassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isHidePassConfirm = !isHidePassConfirm"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="handleSignUp" class="bg-blue">Sign up</v-btn>
            <v-btn class="bg-grey-lighten-2">Cancel</v-btn>
          </v-card-actions>
        </v-card></v-form
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isHidePass: true,
      isHidePassConfirm: true,
    };
  },
  computed: {
    nameRules() {
      (value) => !!value || "Field is required";
    },
  },
  methods: {},
};
</script>

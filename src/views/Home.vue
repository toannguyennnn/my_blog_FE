<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col>
            <h3>Tourism</h3>
            <v-divider thickness="2"></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="7" class="d-flex border">
            <v-img src="../assets/logo.svg" alt="" width="500" height="200"></v-img>
          </v-col>
          <v-col cols="5">
            <div class="text-justify">
              <h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
                nemo maiores quas
              </h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquam modi deleniti quo maxime atque voluptate qui mollitia,
                velit consectetur, officiis fuga corporis officia neque debitis
                quos quisquam sunt labore! Debitis!
              </p>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="d-flex">
              <v-img src="../assets/logo.svg" alt="" width="60"></v-img>
              <span class="text-justify ms-2">
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit
                </h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
                  laudantium aliquid soluta saepe aut
                </p>
              </span>
            </div>
          </v-col>
          <v-col>
            <div class="d-flex">
              <v-img src="../assets/logo.svg" alt="" width="60"></v-img>
              <span class="text-justify ms-2">
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit
                </h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
                  laudantium aliquid soluta saepe aut
                </p>
              </span>
            </div>
          </v-col>
          <v-col>
            <div class="d-flex">
              <v-img src="../assets/logo.svg" alt="" width="60"></v-img>
              <span class="text-justify ms-2">
                <h4>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit
                </h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
                  laudantium aliquid soluta saepe aut
                </p>
              </span>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>
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
              <p>Subscribe to receive the lastest information!</p>
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

<script setup></script>

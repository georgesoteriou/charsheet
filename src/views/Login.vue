<template>
  <v-card flat height="100%">
    <v-img
      height="100%"
      gradient="to top right, rgba(34,85,144,.9), rgba(34,85,144,.7)"
      src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
      alt="bg"
    >
      <v-container style="height: 100%" mt-n12>
        <v-layout justify-center align-center style="height: 100%">
          <v-flex xs12 xl6 md8>
            <v-card class="my-2" elevation="3">
              <div style="font-size: 1.8em" class="pa-3 text-center">
                Login Page
              </div>
            </v-card>
            <v-card :loading="loading" elevation="3">
              <v-form ref="form" @keyup.native.enter="submit">
                <v-card-text>
                  <v-text-field
                    ref="user"
                    v-model="user"
                    :rules="[() => !!user || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Username"
                    placeholder="ab123"
                    required
                  ></v-text-field>
                  <v-text-field
                    ref="pass"
                    v-model="pass"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :rules="[() => !!pass || 'This field is required']"
                    label="Password"
                    placeholder="Password"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-container>
                    <v-row class="justify-center mt-n8">
                      <v-col>
                        <v-btn
                          color="primary"
                          v-if="reset"
                          absolute
                          text
                          @click="resetPass"
                        >
                          Reset<br />password
                        </v-btn>
                      </v-col>
                      <v-col cols="5">
                        <v-btn
                          block
                          class="px-10"
                          color="primary"
                          large
                          @click="submit"
                        >
                          Login
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-slide-x-reverse-transition>
                          <v-tooltip v-if="formHasErrors" left>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                absolute
                                right
                                icon
                                class="my-0"
                                @click="resetForm"
                                v-on="on"
                              >
                                <v-icon>mdi-refresh</v-icon>
                              </v-btn>
                            </template>
                            <span>Refresh form</span>
                          </v-tooltip>
                        </v-slide-x-reverse-transition>
                      </v-col>
                    </v-row>
                    <v-row class="justify-center">
                      <v-col cols="12">
                        <v-btn
                          block
                          class="px-10"
                          color="#0F9D58"
                          large
                          dark
                          @click="submitGoogle"
                        >
                          Login with Google
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-form>
            </v-card>
            <v-snackbar v-model="snackbar" :timeout="10000" class="text-center">
              {{ snackbarText }}
            </v-snackbar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import { auth, googleProvider } from "../firebase";
import store from "../store/index";

export default {
  fiery: true,
  data: function () {
    return {
      show: false,
      user: "",
      pass: "",
      reset: false,
      loading: false,
      errorMessages: "",
      formHasErrors: false,
      snackbarText: "",
      snackbar: false,
    };
  },
  computed: {
    form() {
      return {
        user: this.user,
        pass: this.pass,
      };
    },
  },
  watch: {
    user() {
      this.errorMessages = "";
    },
  },
  methods: {
    resetPass() {
      this.snackbarText = "";
      this.snackbar = false;
      this.reset = false;

      if (this.user) {
        auth
          .sendPasswordResetEmail(this.user)
          .then(() => {
            this.snackbarText = "Successfully sent reset email";
            this.snackbar = true;
            this.$refs["pass"].reset();
          })
          .catch((error) => {
            this.snackbarText = error;
            this.snackbar = true;
          });
      }
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
      this.reset = false;
    },
    submit() {
      this.reset = false;
      this.formHasErrors = false;
      this.errorMessages = [];

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        this.loading = true;
        auth
          .signInWithEmailAndPassword(this.user, this.pass)
          .then(() => {
            store.commit("loginUser", auth.currentUser);
            store.dispatch("bindChars");
            this.$router.push("/char");
          })
          .catch(() => {
            // is sponsor with wrong pass
            this.loading = false;
            this.errorMessages = "Failed to login. Try again";
            this.formHasErrors = true;
            this.reset = true;
          });
      }
    },
    submitGoogle() {
      auth.signInWithPopup(googleProvider).then(() => {
        store.commit("loginUser", auth.currentUser);
        store.dispatch("bindChars");
        this.$router.push("/char");
      });
    },
  },
};
</script>
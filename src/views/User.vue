<template>
  <v-container>
    <v-row class="text-center text-h2" justify="center">
      <v-col cols="12"> Character Sellection </v-col>
      <v-col cols="10" :key="i" v-for="(char, i) in chars">
        <v-btn color="blue" block x-large :href="`char/${char.id}`">
          {{ char.name }}
        </v-btn>
      </v-col>
      <v-col cols="10">
        <v-btn color="success" block @click="newChar" x-large>
          <v-icon>mdi-plus</v-icon>Add New Character
        </v-btn>
      </v-col>
    </v-row>
    <v-footer absolute color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-btn text block dark x-large @click="logout"> Logout </v-btn>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import { db } from "../firebase.js";

export default {
  name: "User",
  components: {},
  data() {
    return {
      chars: {},
    };
  },
  firestore() {
    return {
      chars: db
        .collection("characters")
        .where("owner", "==", this.$store.getters.user.uid),
    };
  },
  methods: {
    newChar() {
      db.collection("characters").add({
        name: "New Character",
        owner: this.$store.getters.user.uid,
      });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

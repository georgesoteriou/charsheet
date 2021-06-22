<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> User </v-col>
      <v-col cols="12" :key="i" v-for="(char, i) in chars">
        <v-btn :href="`char/${char.id}`">
          {{ char.name }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn fab @click="newChar"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>
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
  },
};
</script>

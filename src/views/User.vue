<template>
  <v-container>
    <v-row class="text-center text-h2" justify="center">
      <v-col cols="12"> Character Sellection </v-col>
      <v-col cols="10" :key="i" v-for="(char, i) in chars">
        <v-row dense>
          <v-col cols="10">
            <v-btn
              color="blue"
              block
              x-large
              class="pr-0"
              :href="`char/${char.id}`"
            >
              {{ char.name }}
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              block
              color="red"
              x-large
              @click="prepDel(char.id, char.name)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <v-btn color="success" block @click="newChar" x-large>
          <v-icon>mdi-plus</v-icon>Add New Character
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-3">
        <v-card-title class="text-h5 text-center">
          Delete? Really?
        </v-card-title>
        <v-card-text class="text-center text-h4">
          Are you sure you want to delete {{ prepForDel.name }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="deleteChar()"> Yes, Delete </v-btn>
          <v-btn color="error" @click="dialog = false"> No! Go back </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      chars: {},
      prepForDel: {},
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
    prepDel(id, name) {
      this.prepForDel = { id: id, name: name };
      this.dialog = true;
    },
    deleteChar() {
      db.collection("characters").doc(this.prepForDel.id).delete();
      this.dialog = false;
    },
  },
};
</script>

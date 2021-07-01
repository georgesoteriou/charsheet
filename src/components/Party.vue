<template>
  <v-navigation-drawer
    width="300px"
    fixed
    :permanent="$vuetify.breakpoint.mdAndUp"
    :expand-on-hover="$vuetify.breakpoint.mdAndUp"
    style="z-index: 1000"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar class="my-5" color="#FF5050">
          {{ initials }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ char.name }}</v-list-item-title>
          <v-list-item-subtitle class="mt-n2">
            ID: {{ char.id }}
            <v-btn icon plain @click="copyText(char.id)">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-n2 text-caption">
            <span v-if="copied" class="blue--text text--lighten-2">
              ID copied to clipboard
            </span>
            <span v-else> Share your ID with your party </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense class="px-0">
      <v-list-item
        class="px-0"
        link
        :key="player.ref.id"
        v-for="player in party"
      >
        <MiniChar :char="player.ref" />
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-btn text x-large block class="px-2" @click="newFriend">
        <v-list-item-avatar color="success">
          <v-icon>mdi-plus</v-icon>
        </v-list-item-avatar>
        <v-list-item-title> Add New Party Member </v-list-item-title>
      </v-btn>
      <!-- DIALOG TO ADD FRIENDS -->
      <v-dialog v-model="dialog" width="500">
        <v-card class="pa-3">
          <v-card-title class="text-h5 text-center">
            Add Party Member
          </v-card-title>
          <v-card-text class="text-center text-h4">
            <v-text-field
              v-model="newFriendId"
              label="New Friend ID"
              outlined
              dense
              :error-messages="error"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn
                  block
                  color="success"
                  @click="addFriend"
                  :loading="adding"
                >
                  Add
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  block
                  color="error"
                  :disabled="adding"
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { db } from "../firebase.js";
import MiniChar from "./MiniChar.vue";

export default {
  props: { charId: {} },
  components: { MiniChar },
  data() {
    return {
      char: {},
      party: [],
      copied: false,
      dialog: false,
      newFriendId: "",
      adding: false,
      error: "",
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
      party: db.collection("characters").doc(this.charId).collection("party"),
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
    newFriend() {
      this.newFriendId = "";
      this.error = "";
      this.adding = false;
      this.dialog = true;
    },
    addFriend() {
      this.adding = true;
      const docRef = db.collection("characters").doc(this.newFriendId);
      docRef.get().then((data) => {
        if (data.exists) {
          db.collection("characters")
            .doc(this.charId)
            .collection("party")
            .add({ ref: docRef });
          this.dialog = false;
        } else {
          this.error = "This Character ID does not exist";
        }
      });
    },
  },
  computed: {
    initials() {
      if (this.char.name) {
        return this.char.name
          .split(" ")
          .map((n) => n[0])
          .join("");
      } else {
        return "";
      }
    },
  },
};
</script>
<template>
  <span>
    <v-btn
      block
      height="70"
      @click="save"
      outlined
      text
      class="px-0"
      :color="prof ? 'warning' : ''"
    >
      <v-row no-gutters>
        <v-col cols="12" class="mod">
          {{ value }}
        </v-col>
        <v-col cols="12" class="text-caption" v-html="label"></v-col>
      </v-row>
    </v-btn>
  </span>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  props: {
    label: {
      type: String,
    },
    id: {
      type: String,
    },
    mod_func: {
      type: Function,
    },
    charId: {},
    edit: {
      default: false,
    },
  },
  data() {
    return {
      char: {},
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
    };
  },
  methods: {
    save() {
      if (this.edit) {
        this.$firestoreRefs.char.update({ [this.idProf]: !this.prof });
      }
    },
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.idProf]) {
      this.$firestoreRefs.char.set({ [this.idProf]: false }, { merge: true });
    }
  },
  computed: {
    idProf() {
      return `${this.id}-prof`;
    },
    prof() {
      return this.char[this.idProf];
    },
    toAdd() {
      return this.prof ? parseInt(this.char["proficiency"]) : 0;
    },
    value() {
      let value = parseInt(this.mod_func(this.char[this.id])) + this.toAdd;
      return `${value > 0 ? "+" : ""}${value}`;
    },
  },
};
</script>

<style lang="css">
.mod {
  font-weight: bold;
  font-size: 1.8em;
}
</style>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
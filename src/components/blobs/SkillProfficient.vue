<template>
  <span>
    <v-btn
      block
      @click="save"
      text
      class="px-0 text-md-body-1 text-caption text-left"
      :color="prof ? 'warning' : ''"
    >
      <v-row no-gutters>
        <v-col cols="2" class="mod px-2" v-if="!char[id]">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </v-col>
        <v-col v-else cols="2" class="mod2">
          {{ value }}
        </v-col>
        <v-col cols="10" v-html="label"></v-col>
      </v-row>
    </v-btn>
  </span>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  props: {
    charId: {},
    label: {
      type: String,
    },
    id: {
      type: String,
    },
    mod_func: {
      type: Function,
    },
    edit: { default: false },
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
      return `${this.label}-prof-skill`;
    },
    prof() {
      return this.char[this.idProf];
    },
    toAdd() {
      return this.prof ? parseInt(this.char["proficiency"]) : 0;
    },
    value() {
      let value = parseInt(this.mod_func(this.char[this.id])) + this.toAdd;
      return `${value > -1 ? "+" : ""}${value}`;
    },
  },
};
</script>

<style lang="css">
.mod2 {
  font-weight: bold;
}
</style>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
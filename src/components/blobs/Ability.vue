<template>
  <span>
    <v-btn
      v-if="!edit_internal"
      block
      height="70"
      @click="edit ? (edit_internal = true) : () => {}"
      outlined
      text
      class="px-0"
    >
      <v-row no-gutters justify="center">
        <v-col cols="3" class="mod py-1" v-if="!char[id]">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="mod" v-else>
          {{ mod }}
        </v-col>
        <v-col cols="12" class="text-caption" v-html="label"></v-col>
      </v-row>
    </v-btn>
    <v-text-field
      v-else
      height="70"
      :type="number ? 'number' : ''"
      v-model="char[id]"
      :label="label.substring(0, 3).toUpperCase()"
      :hide-details="true"
      dense
      outlined
      class="centered-input"
    >
      <template v-slot:append>
        <v-icon @click="save" style="font-size: 1.6em" class="mt-3">
          mdi-check
        </v-icon>
      </template>
    </v-text-field>
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
    number: {
      type: Boolean,
      default: true,
    },
    starting: {
      default: "8",
    },
    charId: {},
    edit: {
      default: false,
    },
  },
  data() {
    return {
      char: {},
      edit_internal: false,
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
    };
  },
  methods: {
    save() {
      this.$firestoreRefs.char.update({ [this.id]: this.char[this.id] });
      this.edit_internal = false;
    },
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      this.$firestoreRefs.char.set(
        { [this.id]: this.starting },
        { merge: true }
      );
    }
  },
  computed: {
    mod() {
      return `${this.mod_func(this.char[this.id])}`;
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
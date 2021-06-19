<template>
  <v-text-field
    v-model="char[id]"
    :label="label"
    outlined
    :hide-details="true"
    dense
  ></v-text-field>
</template>

<script>
import { db } from "../../db.js";

export default {
  props: ["label", "id"],
  data() {
    return {
      char: {},
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.$route.params.id),
    };
  },
  watch: {
    value() {
      this.$firestoreRefs.char.update(this.char);
    },
  },
  computed: {
    value() {
      return this.char[this.id];
    },
  },
};
</script>
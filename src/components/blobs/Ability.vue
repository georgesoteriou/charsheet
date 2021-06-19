<template>
  <v-text-field
    width="60px"
    type="number"
    v-model="char[ability]"
    :label="label"
    outlined
    :suffix="suffix"
    :hide-details="true"
    dense
    rounded
  ></v-text-field>
</template>

<script>
import { db } from "../../db.js";
import { scoreToMod } from "../../funcs.js";

export default {
  props: ["label", "ability"],
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
      return this.char[this.ability];
    },
    suffix() {
      return `${scoreToMod(this.value)}`;
    },
  },
};
</script>

<style lang="css">
.v-text-field__suffix {
  font-weight: bold;
  font-size: 1.6em;
}
</style>
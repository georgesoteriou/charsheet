<template>
  <v-text-field
    v-model="value"
    :label="label"
    outlined
    :hide-details="true"
    dense
    rounded
    :success="saved"
    prepend-inner-icon="mdi-minus"
    @click:prepend-inner="
      value--;
      debouncedSave();
    "
    @click:append="
      value++;
      debouncedSave();
    "
    append-icon="mdi-plus"
    class="centered-input"
  ></v-text-field>
</template>

<script>
import { db } from "../../db.js";
import { debounce } from "debounce";

export default {
  props: ["label", "id"],
  data() {
    return {
      char: {},
      value: 0,
      saved: false,
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.$route.params.id),
    };
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      data[this.id] = "";
      this.$firestoreRefs.char.update(data);
    }
    this.value = data[this.id];
  },
  methods: {
    save() {
      this.char[this.id] = this.value;
      this.$firestoreRefs.char.update(this.char);
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 500);
    },
    debouncedSave: debounce(function () {
      this.save();
    }, 1000),
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
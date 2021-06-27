<template>
  <v-text-field
    v-model="value"
    :label="label"
    outlined
    :hide-details="true"
    dense
    :success="saved"
    prepend-inner-icon="mdi-minus"
    type="number"
    @click:prepend-inner="
      value--;
      debouncedSave();
    "
    @click:append="
      value++;
      debouncedSave();
    "
    @input="debouncedSave()"
    append-icon="mdi-plus"
    class="centered-input"
  ></v-text-field>
</template>

<script>
import { db } from "../../firebase.js";
import { debounce } from "debounce";

export default {
  props: {
    label: {},
    id: {},
    document_ref: {},
  },
  data() {
    return {
      char: {},
      value: 0,
      saved: false,
    };
  },
  firestore() {
    return {
      char: this.document_ref,
    };
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      this.value = 0;
      this.$firestoreRefs.char.set({ [this.id]: 0 }, { merge: true });
    } else {
      this.value = data[this.id];
    }
  },
  methods: {
    decrease() {
      this.value--;
      this.save();
    },
    save() {
      this.$firestoreRefs.char.update({ [this.id]: this.value });
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
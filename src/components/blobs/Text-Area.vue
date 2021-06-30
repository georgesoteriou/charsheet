<template>
  <v-textarea
    v-model="char[id]"
    :label="label"
    outlined
    :hide-details="true"
    dense
    @input="debouncedSave"
    :success="saved"
    :readonly="!edit"
  ></v-textarea>
</template>

<script>
import { db } from "../../firebase.js";
import { debounce } from "debounce";

export default {
  props: { label: {}, id: {}, charId: {}, edit: { default: false } },
  data() {
    return {
      char: {},
      saved: false,
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
    };
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      this.$firestoreRefs.char.set({ [this.id]: "" }, { merge: true });
    }
  },
  methods: {
    save() {
      this.$firestoreRefs.char.update({ [this.id]: this.char[this.id] });
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
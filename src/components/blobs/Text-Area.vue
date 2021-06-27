<template>
  <v-textarea
    v-model="value"
    :label="label"
    outlined
    :hide-details="true"
    dense
    @input="debouncedSave"
    :success="saved"
  ></v-textarea>
</template>

<script>
import { db } from "../../firebase.js";
import { debounce } from "debounce";

export default {
  props: ["label", "id", "charId"],
  data() {
    return {
      char: {},
      value: "",
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
      this.value = "";
      this.$firestoreRefs.char.set({ [this.id]: "" }, { merge: true });
    } else {
      this.value = data[this.id];
    }
  },
  methods: {
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
<template>
  <v-text-field
    v-model="char[id]"
    :label="label"
    outlined
    :hide-details="true"
    dense
    :success="saved"
    :prepend-inner-icon="edit ? 'mdi-minus' : ''"
    type="number"
    @click:prepend-inner="
      char[id]--;
      debouncedSave();
    "
    @click:append="
      char[id]++;
      debouncedSave();
    "
    @input="debouncedSave()"
    :append-icon="edit ? 'mdi-plus' : ''"
    class="centered-input"
    :readonly="!edit"
    :loading="char[id] === undefined"
  ></v-text-field>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: {
    label: {},
    id: {},
    document_ref: {},
    edit: {
      default: true,
    },
  },
  data() {
    return {
      char: {},
      saved: false,
    };
  },
  firestore() {
    return {
      char: this.document_ref,
    };
  },
  created: async function () {
    let data = (await this.document_ref.get()).data();
    if (!data[this.id]) {
      this.document_ref.set({ [this.id]: 0 }, { merge: true });
    }
  },
  methods: {
    decrease() {
      this.char[this.id]--;
      this.save();
    },
    save() {
      this.document_ref.update({ [this.id]: this.char[this.id] });
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 500);
    },
    debouncedSave: debounce(function () {
      this.save();
    }, 300),
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
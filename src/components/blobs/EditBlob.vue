<template>
  <span>
    <v-btn v-if="!edit" block height="70" outlined rounded @click="edit = true">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" class="mod">
            {{ value }}
          </v-col>
          <v-col cols="12">
            <div v-html="label" />
          </v-col>
        </v-row>
      </v-container>
    </v-btn>
    <v-text-field
      v-else
      height="70"
      v-model="value"
      :label="label"
      outlined
      :hide-details="true"
      dense
      rounded
      class="centered-input"
    >
      <template v-slot:append>
        <v-icon @click="save" style="font-size: 2em" class="mt-2">
          mdi-check
        </v-icon>
      </template>
    </v-text-field>
  </span>
</template>

<script>
import { db } from "../../db.js";

export default {
  props: ["label", "id"],
  data() {
    return {
      char: {},
      edit: false,
      value: 8,
    };
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.$route.params.id),
    };
  },
  methods: {
    save() {
      this.char[this.id] = this.value;
      this.$firestoreRefs.char.update(this.char);
      this.edit = false;
    },
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      data[this.id] = "N/A";
      this.$firestoreRefs.char.update(data);
    }
    this.value = data[this.id];
  },
};
</script>

<style lang="css">
.mod {
  font-weight: bold;
  font-size: 2em;
}
</style>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
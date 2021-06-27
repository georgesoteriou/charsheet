<template>
  <v-card>
    <v-card-title class="text-h5"> HP </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="text-center justify-center">
        <v-col cols="5">
          <Number label="HP" id="hp" />
        </v-col>
        <v-col cols="1" class="text-h4"> / </v-col>
        <v-col cols="6">
          <Number label="Max HP" id="max-hp" />
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col>
          <v-progress-linear color="red" v-model="percent" height="60">
            <strong> {{ Math.ceil(percent) }}% </strong>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Number from "./Number.vue";
import { db } from "../../firebase.js";

export default {
  components: { Number },
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
  computed: {
    percent() {
      return (this.char["hp"] / this.char["max-hp"]) * 100;
    },
  },
};
</script>
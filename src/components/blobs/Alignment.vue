<template>
  <span>
    <v-text-field
      v-model="char['alignment']"
      label="Alignment"
      outlined
      :hide-details="true"
      dense
      readonly
      @click="dialog = true"
    >
    </v-text-field>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Choose Allignment </v-card-title>

        <v-card-text class="pa-0">
          <v-container>
            <v-row no-gutters>
              <v-col
                class="pa-1"
                cols="4"
                :key="option.id"
                v-for="option in options"
              >
                <v-btn
                  class="pa-0"
                  block
                  height="100"
                  :color="(char['alignment'] == option.id && 'success') || ''"
                  @click="
                    char['alignment'] = option.id;
                    dialog = false;
                  "
                  v-html="option.text"
                ></v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  data() {
    return {
      char: {},
      dialog: false,
      options: [
        { text: `Lawful</br>Good`, id: "LG" },
        { text: `Neutral</br>Good`, id: "NG" },
        { text: `Chaotic</br>Good`, id: "CG" },
        { text: `Lawful</br>Neutral`, id: "LN" },
        { text: `Neutral</br>Neutral`, id: "NN" },
        { text: `Chaotic</br>Neutral`, id: "CN" },
        { text: `Lawful</br>Evil`, id: "LE" },
        { text: `Neutral</br>Evil`, id: "NE" },
        { text: `Chaotic</br>Evil`, id: "CE" },
      ],
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
      return this.char["alignment"];
    },
  },
};
</script>


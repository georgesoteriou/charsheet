<template>
  <span>
    <v-text-field
      v-model="value"
      label="Alignment"
      outlined
      :hide-details="true"
      :success="saved"
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
                  @click="save(option.id)"
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
  props: ["charId"],
  data() {
    return {
      char: {},
      dialog: false,
      saved: false,
      value: "",
      id: "alignment",
      starting: "",
      options: [
        { text: `Lawful</br>Good`, id: "Lawful Good" },
        { text: `Neutral</br>Good`, id: "Neutral Good" },
        { text: `Chaotic</br>Good`, id: "Chaotic Good" },
        { text: `Lawful</br>Neutral`, id: "Lawful Neutral" },
        { text: `Neutral</br>Neutral`, id: "Neutral Neutral" },
        { text: `Chaotic</br>Neutral`, id: "Chaotic Neutral" },
        { text: `Lawful</br>Evil`, id: "Lawful Evil" },
        { text: `Neutral</br>Evil`, id: "Neutral Evil" },
        { text: `Chaotic</br>Evil`, id: "Chaotic Evil" },
      ],
    };
  },
  created: async function () {
    let data = (await this.$firestoreRefs.char.get()).data();
    if (!data[this.id]) {
      this.$firestoreRefs.char.set(
        { [this.id]: this.starting },
        { merge: true }
      );
      this.value = this.starting;
    } else {
      this.value = data[this.id];
    }
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
    };
  },
  methods: {
    save(id) {
      this.$firestoreRefs.char.update({ [this.id]: id });
      this.value = id;
      this.dialog = false;
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 500);
    },
  },
};
</script>


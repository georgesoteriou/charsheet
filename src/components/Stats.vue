<template>
  <v-card>
    <v-card-title class="text-h5"> Quick Info </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <Ability starting="3" :mod_func="same" label="Armor Class" id="ac" />
        </v-col>
        <v-col cols="4">
          <Ability
            starting="3"
            :mod_func="withPlus"
            label="Initiative"
            id="initiative"
          />
        </v-col>
        <v-col cols="4">
          <Ability starting="3" :mod_func="same" label="Speed" id="speed" />
        </v-col>
        <v-col cols="4">
          <Ability
            starting="3"
            :mod_func="same"
            label="Passive</br>Perception"
            id="passive-perception"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            starting="3"
            :mod_func="withPlus"
            label="Proficiency</br>Bonus"
            id="proficiency"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            starting="3"
            :number="false"
            :mod_func="same"
            label="Hit Dice"
            id="dice"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Ability from "./blobs/Ability.vue";
import { withPlus, same } from "../funcs.js";

export default {
  components: { Ability },
  data() {
    return {
      withPlus: withPlus,
      same: same,
    };
  },
};
</script>
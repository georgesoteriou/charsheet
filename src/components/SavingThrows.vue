<template>
  <v-card>
    <v-card-title class="text-h5"> Saving Throws </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Strength"
            ability="str-st"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Dexterity"
            ability="dex-st"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Constitution"
            ability="con-st"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Intelligence"
            ability="intel-st"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Wizdom"
            ability="wiz-st"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Charisma"
            ability="cha-st"
            :mod_func="mod_func"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Ability from "./blobs/Ability.vue";
import { scoreToMod } from "../funcs.js";

export default {
  components: { Ability },
  data() {
    return {
      mod_func: scoreToMod,
    };
  },
};
</script>
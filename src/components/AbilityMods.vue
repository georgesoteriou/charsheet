<template>
  <v-card>
    <v-card-title class="text-h5"> Ability Modifiers </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Strength"
            ability="str"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Dexterity"
            ability="dex"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Constitution"
            ability="con"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Intelligence"
            ability="intel"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Wizdom"
            ability="wiz"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :number="true"
            label="Charisma"
            ability="cha"
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
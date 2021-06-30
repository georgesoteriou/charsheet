<template>
  <v-card>
    <v-card-title class="text-h5"> Ability Modifiers </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-2">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Strength"
            id="str"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Dexterity"
            id="dex"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Constitution"
            id="con"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Intelligence"
            id="intel"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Wisdom"
            id="wiz"
            :mod_func="mod_func"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Charisma"
            id="cha"
            :mod_func="mod_func"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Ability from "./Ability.vue";
import { scoreToMod } from "../../funcs.js";

export default {
  props: {
    charId: {},
    edit: {
      default: false,
    },
  },
  components: { Ability },
  data() {
    return {
      mod_func: scoreToMod,
    };
  },
};
</script>
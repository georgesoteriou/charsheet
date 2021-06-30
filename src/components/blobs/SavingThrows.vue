<template>
  <v-card>
    <v-card-title class="text-h5"> Saving Throws </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-2">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            label="Strength"
            id="str"
            :mod_func="scoreToMod"
          />
        </v-col>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            label="Dexterity"
            id="dex"
            :mod_func="scoreToMod"
          />
        </v-col>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            label="Constitution"
            id="con"
            :mod_func="scoreToMod"
          />
        </v-col>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Intelligence"
            id="intel"
            :mod_func="scoreToMod"
          />
        </v-col>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            :number="true"
            label="Wisdom"
            id="wiz"
            :mod_func="scoreToMod"
          />
        </v-col>
        <v-col cols="4">
          <AbilityProfficient
            :edit="edit"
            :charId="charId"
            label="Charisma"
            id="cha"
            :mod_func="scoreToMod"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AbilityProfficient from "./AbilityProfficient.vue";
import { scoreToMod } from "../../funcs.js";

export default {
  components: { AbilityProfficient },
  props: { charId: {}, edit: { default: false } },
  data() {
    return {
      scoreToMod: scoreToMod,
    };
  },
};
</script>
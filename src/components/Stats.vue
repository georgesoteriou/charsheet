<template>
  <v-card>
    <v-card-title class="text-h5"> Quick Info </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row class="text-center" dense>
        <v-col cols="4">
          <Ability :mod_func="(val) => val" label="Armor Class" id="ac" />
        </v-col>
        <v-col cols="4">
          <Ability
            :mod_func="(val) => val"
            label="Initiative"
            id="initiative"
          />
        </v-col>
        <v-col cols="4">
          <Ability :mod_func="(val) => val" label="Speed" id="speed" />
        </v-col>
        <v-col cols="4">
          <Ability
            :mod_func="(val) => val"
            label="Passive</br>Perception"
            id="passive-perception"
          />
        </v-col>
        <v-col cols="4">
          <Ability
            :mod_func="(val) => val"
            label="Proficiency</br>Bonus"
            id="proficiency"
          />
        </v-col>
        <v-col cols="4">
          <Ability :mod_func="(val) => val" label="Hit Dice" id="Dice" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Ability from "./blobs/Ability.vue";

export default {
  components: { Ability },
};
</script>
<template>
  <v-card>
    <v-card-title class="text-h5"> Saving Throws </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="text-center">
        <v-col cols="4">
          <Ability label="Strength" ability="str-st" />
        </v-col>
        <v-col cols="4">
          <Ability label="Dexterity" ability="dex-st" />
        </v-col>
        <v-col cols="4">
          <Ability label="Constitution" ability="con-st" />
        </v-col>
        <v-col cols="4">
          <Ability label="Intelligence" ability="intel-st" />
        </v-col>
        <v-col cols="4">
          <Ability label="Wizdom" ability="wiz-st" />
        </v-col>
        <v-col cols="4">
          <Ability label="Charisma" ability="cha-st" />
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
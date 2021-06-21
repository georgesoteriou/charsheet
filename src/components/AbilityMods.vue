<template>
  <v-card>
    <v-card-title class="text-h5"> Ability Modifiers </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="text-center">
        <v-col cols="4">
          <Ability label="Strength" ability="str" />
        </v-col>
        <v-col cols="4">
          <Ability label="Dexterity" ability="dex" />
        </v-col>
        <v-col cols="4">
          <Ability label="Constitution" ability="con" />
        </v-col>
        <v-col cols="4">
          <Ability label="Intelligence" ability="intel" />
        </v-col>
        <v-col cols="4">
          <Ability label="Wizdom" ability="wiz" />
        </v-col>
        <v-col cols="4">
          <Ability label="Charisma" ability="cha" />
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
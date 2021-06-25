<template>
  <v-container fluid>
    <v-row class="mb-10">
      <v-col cols="12" lg="12" xl="12"><Info /></v-col>
      <v-col cols="12" lg="6" xl="3"><Stats /></v-col>
      <v-col cols="12" lg="6" xl="3"><Health /></v-col>
      <v-col cols="12" lg="6" xl="3"><AbilityMods /></v-col>
      <v-col cols="12" lg="6" xl="3"><SavingThrows /></v-col>
      <v-col cols="12" lg="6" xl="3"><Skills /></v-col>
      <v-col cols="12" lg="6" xl="3"><Armor /></v-col>
      <v-col cols="12" lg="6" xl="3"><Equipment /></v-col>
      <v-col cols="12" lg="6" xl="3"><Weapons /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Info from "../components/Info.vue";
import Health from "../components/Health.vue";
import Stats from "../components/Stats.vue";
import AbilityMods from "../components/AbilityMods.vue";
import SavingThrows from "../components/SavingThrows.vue";
import Skills from "../components/Skills.vue";
import Armor from "../components/Armor.vue";
import Equipment from "../components/Equipment.vue";
import Weapons from "../components/Weapons.vue";

export default {
  name: "Char",
  components: {
    Info,
    Health,
    Stats,
    AbilityMods,
    SavingThrows,
    Skills,
    Armor,
    Equipment,
    Weapons,
  },
};
</script>

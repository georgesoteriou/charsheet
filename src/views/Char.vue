<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12" lg="12"><Info /></v-col>
      <v-col cols="12" md="6" lg="3"><Health /></v-col>
      <v-col cols="12" md="6" lg="3"><Stats /></v-col>
      <v-col cols="12" md="6" lg="3"><AbilityMods /></v-col>
      <v-col cols="12" md="6" lg="3"><SavingThrows /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Info from "../components/Info.vue";
import Health from "../components/Health.vue";
import Stats from "../components/Stats.vue";
import AbilityMods from "../components/AbilityMods.vue";
import SavingThrows from "../components/SavingThrows.vue";

export default {
  name: "Char",
  components: {
    Info,
    Health,
    Stats,
    AbilityMods,
    SavingThrows,
  },
};
</script>

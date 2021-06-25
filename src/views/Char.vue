<template>
  <draggable v-model="order" class="container container--fluid">
    <transition-group class="row mb-10">
      <v-col draggable :key="1" cols="12" lg="12" xl="12"><Info /></v-col>
      <v-col draggable :key="2" cols="12" lg="6" xl="3"><Stats /></v-col>
      <v-col draggable :key="3" cols="12" lg="6" xl="3"><Health /></v-col>
      <v-col draggable :key="4" cols="12" lg="6" xl="3"><AbilityMods /></v-col>
      <v-col draggable :key="5" cols="12" lg="6" xl="3"><SavingThrows /></v-col>
      <v-col draggable :key="6" cols="12" lg="6" xl="3"><Skills /></v-col>
      <v-col draggable :key="7" cols="12" lg="6" xl="3"><Armor /></v-col>
      <v-col draggable :key="8" cols="12" lg="6" xl="3"><Equipment /></v-col>
      <v-col draggable :key="9" cols="12" lg="6" xl="3"><Weapons /></v-col>
    </transition-group>
  </draggable>
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

import draggable from "vuedraggable";

export default {
  name: "Char",
  data: function () {
    return {
      order: null,
    };
  },
  components: {
    draggable,
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

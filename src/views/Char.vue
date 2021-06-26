<template>
  <span>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <Info />
        </v-col>
      </v-row>
    </v-container>
    <draggable
      :list="items"
      :move="debouncedSave"
      :disabled="!drag"
      class="container container--fluid mb-10"
    >
      <transition-group class="row">
        <v-col
          draggable
          v-for="item in items"
          :key="`${item.id}${item.level}`"
          :cols="item.cols"
          :lg="item.lg"
          :xl="item.xl"
        >
          <div :is="idToItem[item.id]" :drag="drag" :level="item.level" />
        </v-col>
      </transition-group>
    </draggable>
    <v-btn
      :x-large="$vuetify.breakpoint.mdAndUp"
      :small="$vuetify.breakpoint.xs"
      fab
      bottom
      right
      fixed
      @click="toggleDrag()"
      :color="drag ? 'success' : ''"
    >
      <v-icon>mdi-drag-variant</v-icon>
    </v-btn>
  </span>
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
import Spells from "../components/Spells.vue";

import draggable from "vuedraggable";

import { db } from "../firebase.js";
import { debounce } from "debounce";

export default {
  name: "Char",
  data: function () {
    return {
      drag: false,
      items: [
        { cols: "12", lg: "6", xl: "3", id: "Stats" },
        { cols: "12", lg: "6", xl: "3", id: "Health" },
        { cols: "12", lg: "6", xl: "3", id: "AbilityMods" },
        { cols: "12", lg: "6", xl: "3", id: "SavingThrows" },
        { cols: "12", lg: "6", xl: "3", id: "Skills" },
        { cols: "12", lg: "6", xl: "3", id: "Armor" },
        { cols: "12", lg: "6", xl: "3", id: "Equipment" },
        { cols: "12", lg: "6", xl: "3", id: "Weapons" },
        { cols: "12", lg: "6", xl: "3", level: 0, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 1, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 2, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 3, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 4, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 5, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 6, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 7, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 8, id: "Spells" },
        { cols: "12", lg: "6", xl: "3", level: 9, id: "Spells" },
      ],
      idToItem: {
        Stats: Stats,
        Health: Health,
        AbilityMods: AbilityMods,
        SavingThrows: SavingThrows,
        Skills: Skills,
        Armor: Armor,
        Equipment: Equipment,
        Weapons: Weapons,
        Spells: Spells,
      },
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
    Spells,
  },
  created: async function () {
    let data = (
      await db.collection("characters").doc(this.$route.params.id).get()
    ).data();
    if (!data.items || data.items.length != this.items.length) {
      db.collection("characters")
        .doc(this.$route.params.id)
        .set({ items: this.items }, { merge: true });
    } else {
      this.items = data.items;
    }
  },
  methods: {
    save() {
      db.collection("characters")
        .doc(this.$route.params.id)
        .update({ items: this.items });
    },
    debouncedSave: debounce(function () {
      this.save();
    }, 1000),
    toggleDrag() {
      this.drag = !this.drag;
    },
  },
};
</script>

<style >
.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
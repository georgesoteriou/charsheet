<template>
  <span>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <Character />
        </v-col>
      </v-row>
    </v-container>
    <draggable
      :list="items"
      :move="debouncedSave"
      :disabled="!drag"
      class="container container--fluid mb-10"
    >
      <transition-group class="row dense">
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
import Info_Health from "../components/Info_Health.vue";
import Character from "../components/Character.vue";
import Ability_Saving from "../components/Ability_Saving.vue";
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
        { cols: "12", lg: "6", xl: "3", id: "Info_Health" },
        { cols: "12", lg: "6", xl: "3", id: "Ability_Saving" },
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
        Info_Health: Info_Health,
        Ability_Saving: Ability_Saving,
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
    Info_Health,
    Character,
    Ability_Saving,
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
<template>
  <span>
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <Character :charId="charId" :edit="edit" />
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
          v-for="item in filteredItems"
          :key="`${item.id}${item.level}${item.collection}`"
          cols="12"
          lg="6"
          xl="3"
        >
          <div
            :is="idToItem[item.id]"
            @hideToggleFunc="toggleHide(item)"
            :hide="item.hide"
            :drag="drag"
            :level="item.level"
            :name="item.name"
            :collection="item.collection"
            :no_public="item.no_public"
            :charId="charId"
            :edit="edit"
          />
        </v-col>
      </transition-group>
    </draggable>
    <v-btn
      v-if="edit"
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
import Notes from "../components/Notes.vue";
import Weapons from "../components/Weapons.vue";
import Spells from "../components/Spells.vue";

import draggable from "vuedraggable";

import { db } from "../firebase.js";
import { debounce } from "debounce";

export default {
  name: "Char",
  props: {
    charId: {
      default: function () {
        return this.$route.params.id;
      },
    },
    edit: {
      default: true,
    },
  },
  data: function () {
    return {
      drag: false,
      items: [
        { hide: false, id: "Info_Health" },
        { hide: false, id: "Ability_Saving" },
        { hide: false, id: "Skills" },
        {
          hide: false,
          id: "Notes",
          name: "Features & Traits",
          collection: "featsTraits",
        },
        {
          hide: false,
          id: "Notes",
          name: "Notes",
          collection: "notes",
          no_public: true,
        },
        {
          hide: false,
          id: "Notes",
          name: "Equipment",
          collection: "equipment",
        },
        { hide: false, id: "Armor" },
        { hide: false, id: "Weapons" },
        { hide: false, level: 0, id: "Spells" },
        { hide: false, level: 1, id: "Spells" },
        { hide: false, level: 2, id: "Spells" },
        { hide: false, level: 3, id: "Spells" },
        { hide: false, level: 4, id: "Spells" },
        { hide: false, level: 5, id: "Spells" },
        { hide: false, level: 6, id: "Spells" },
        { hide: false, level: 7, id: "Spells" },
        { hide: false, level: 8, id: "Spells" },
        { hide: false, level: 9, id: "Spells" },
      ],
      idToItem: {
        Info_Health: Info_Health,
        Ability_Saving: Ability_Saving,
        Skills: Skills,
        Armor: Armor,
        Notes: Notes,
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
    Notes,
    Weapons,
    Spells,
  },
  created: async function () {
    let data = (
      await db.collection("characters").doc(this.charId).get()
    ).data();
    if (!data.items || data.items.length != this.items.length) {
      db.collection("characters")
        .doc(this.charId)
        .set({ items: this.items }, { merge: true });
    } else {
      this.items = data.items;
    }
  },
  methods: {
    save() {
      db.collection("characters")
        .doc(this.charId)
        .update({ items: this.items });
    },
    debouncedSave: debounce(function () {
      this.save();
    }, 1000),
    toggleDrag() {
      this.drag = !this.drag;
    },
    toggleHide(item) {
      item.hide = !item.hide;
      this.save();
    },
  },
  computed: {
    filteredItems() {
      if (this.drag) {
        return this.items;
      } else {
        return this.items.filter((item) => !item.hide);
      }
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
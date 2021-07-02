<template>
  <v-main class="fill-height" style="background-color: black">
    <v-sheet
      style="background-color: black"
      :class="$vuetify.breakpoint.mdAndUp && edit ? 'ml-15' : ''"
    >
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
            <Character :charId="charId" :edit="edit" />
          </v-col>
        </v-row>
      </v-container>
      <v-container class="pa-0 mt-2" v-if="!isEqualItems">
        <v-row justify="center">
          <v-col cols="6" class="text-h4">
            Something went wrong with aranging your charsheet. To reset the
            positions
            <v-btn @click="reset" color="red" class="pa-3">click here</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <draggable
        :list="char.items"
        :move="debouncedSave"
        :disabled="!drag"
        class="container container--fluid fill-height mt-2"
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
      <v-speed-dial
        v-if="edit && $vuetify.breakpoint.mdAndUp"
        v-model="drag"
        bottom
        right
        fixed
        x-large
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="drag" x-large fab :color="drag ? 'success' : ''">
            <v-icon>mdi-drag-variant</v-icon>
          </v-btn>
        </template>
        <v-btn fab small @click="reset" :color="drag ? 'error' : ''">
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-sheet>
  </v-main>
</template>

<script>
import Info_Health from "./characterBlocks/Info_Health.vue";
import Character from "./characterBlocks/Character.vue";
import Ability_Saving from "./characterBlocks/Ability_Saving.vue";
import Skills from "./characterBlocks/Skills.vue";
import Armor from "./characterBlocks/Armor.vue";
import Notes from "./characterBlocks/Notes.vue";
import Weapons from "./characterBlocks/Weapons.vue";
import Spells from "./characterBlocks/Spells.vue";

import draggable from "vuedraggable";

import { db } from "../firebase.js";
import { debounce } from "debounce";
import { isEqualWith } from "lodash";

export default {
  name: "Char",
  props: {
    charId: {},
    edit: {},
  },
  data: function () {
    return {
      drag: false,
      char: {},
      initialItems: [
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
    if (!data.items || data.items.length != this.initialItems.length) {
      db.collection("characters")
        .doc(this.charId)
        .set({ items: this.initialItems }, { merge: true });
    }
  },
  methods: {
    reset() {
      db.collection("characters")
        .doc(this.charId)
        .set({ items: this.initialItems }, { merge: true });
    },
    save() {
      db.collection("characters")
        .doc(this.charId)
        .update({ items: this.char.items });
    },
    debouncedSave: debounce(function () {
      this.save();
    }, 1000),
    toggleHide(item) {
      item.hide = !item.hide;
      this.save();
    },
  },
  computed: {
    filteredItems() {
      if (this.char && this.char.items) {
        if (this.drag) {
          return this.char.items;
        } else {
          return this.char.items.filter((item) => !item.hide);
        }
      } else {
        return [];
      }
    },
    isEqualItems() {
      if (this.char && this.char.items) {
        const online = [...this.char.items];
        online.sort((a, b) => a.id.localeCompare(b.id));
        const initial = [...this.initialItems];
        initial.sort((a, b) => a.id.localeCompare(b.id));
        return isEqualWith(online, initial, (objValue, othValue, key) => {
          if (key === "hide") {
            return true;
          }
          return undefined;
        });
      } else {
        return true;
      }
    },
  },
  firestore() {
    return {
      char: db.collection("characters").doc(this.charId),
    };
  },
  watch: {
    charId(id) {
      this.$bind("char", db.collection("characters").doc(id));
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
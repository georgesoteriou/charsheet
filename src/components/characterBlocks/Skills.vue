<template>
  <v-card :height="$vuetify.breakpoint.lgAndUp && !drag ? '474px' : ''">
    <v-card-title class="text-h5">
      Skills
      <v-spacer></v-spacer>
      <v-btn v-if="drag" icon class="mr-3" @click="$emit('hideToggleFunc')">
        <v-icon>{{ hide ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
      </v-btn>
      <v-icon v-if="drag">mdi-drag</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="!drag" class="py-2">
      <v-row class="text-center" dense>
        <v-col cols="6" :key="i" v-for="(skill, i) in skills">
          <SkillProfficient
            :edit="edit"
            :charId="charId"
            :label="skill.name"
            :id="skill.ability"
            :mod_func="scoreToMod"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import SkillProfficient from "../blobs/SkillProfficient.vue";
import { scoreToMod } from "../../funcs.js";

export default {
  props: {
    drag: {},
    charId: {},
    edit: { default: false },
    hide: { type: Boolean },
  },
  components: { SkillProfficient },
  data() {
    return {
      scoreToMod: scoreToMod,
      skills: [
        { name: "Acrobatics", ability: "dex" },
        { name: "Medicine", ability: "wiz" },
        { name: "Animal Handling", ability: "wiz" },
        { name: "Nature", ability: "intel" },
        { name: "Arcana", ability: "intel" },
        { name: "Perception", ability: "wiz" },
        { name: "Athletics", ability: "str" },
        { name: "Performance", ability: "cha" },
        { name: "Deception", ability: "cha" },
        { name: "Persuasion", ability: "cha" },
        { name: "History", ability: "intel" },
        { name: "Religion", ability: "intel" },
        { name: "Insight", ability: "wiz" },
        { name: "Sleight of Hand", ability: "dex" },
        { name: "Intimidation", ability: "cha" },
        { name: "Stealth", ability: "dex" },
        { name: "Investigation", ability: "intel" },
        { name: "Survival", ability: "wiz" },
      ],
    };
  },
};
</script>
<template>
  <v-card :height="$vuetify.breakpoint.lgAndUp && !drag ? '474px' : ''">
    <v-card-title class="text-h5">
      Skills
      <v-spacer></v-spacer>
      <v-icon v-if="drag">mdi-drag</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="!drag" class="py-2">
      <v-row class="text-center" dense>
        <v-col cols="6" :key="i" v-for="(skill, i) in skills">
          <SkillProfficient
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
import SkillProfficient from "./blobs/SkillProfficient.vue";
import { scoreToMod } from "../funcs.js";

export default {
  props: ["drag", "charId"],
  components: { SkillProfficient },
  data() {
    return {
      scoreToMod: scoreToMod,
      skills: [
        { name: "Acrobatics", ability: "dex" },
        { name: "Animal Handling", ability: "wiz" },
        { name: "Arcana", ability: "intel" },
        { name: "Athletics", ability: "str" },
        { name: "Deception", ability: "cha" },
        { name: "History", ability: "intel" },
        { name: "Insight", ability: "wiz" },
        { name: "Intimidation", ability: "cha" },
        { name: "Investigation", ability: "intel" },
        { name: "Medicine", ability: "wiz" },
        { name: "Nature", ability: "intel" },
        { name: "Perception", ability: "wiz" },
        { name: "Performance", ability: "cha" },
        { name: "Persuasion", ability: "cha" },
        { name: "Religion", ability: "intel" },
        { name: "Sleight of Hand", ability: "dex" },
        { name: "Stealth", ability: "dex" },
        { name: "Survival", ability: "wiz" },
      ],
    };
  },
};
</script>
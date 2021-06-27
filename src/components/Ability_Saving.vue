<template>
  <span>
    <v-card v-if="drag">
      <v-card-title class="text-h5">
        Ability Mods & Saving Throws
        <v-spacer></v-spacer>
        <v-icon>mdi-drag</v-icon>
      </v-card-title>
      <v-divider></v-divider>
    </v-card>
    <v-row
      v-else
      no-gutters
      :height="$vuetify.breakpoint.lgAndUp && !drag ? '458px' : ''"
    >
      <v-col cols="12"><AbilityMods :charId="charId" /></v-col>
      <v-col cols="12" class="mt-4"><SavingThrows :charId="charId" /></v-col>
    </v-row>
  </span>
</template>

<script>
import AbilityMods from "./blobs/AbilityMods.vue";
import SavingThrows from "./blobs/SavingThrows.vue";

export default {
  props: ["drag", "charId"],
  components: { AbilityMods, SavingThrows },
};
</script>
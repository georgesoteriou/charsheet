<template>
  <v-lazy>
    <v-card v-if="drag">
      <v-card-title class="text-h5">
        Ability Mods & Saving Throws
        <v-spacer></v-spacer>
        <v-btn icon class="mr-3" @click.stop="$emit('hideToggleFunc')">
          <v-icon>{{ hide ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
        </v-btn>
        <v-icon>mdi-drag</v-icon>
      </v-card-title>
      <v-divider></v-divider>
    </v-card>
    <v-row
      v-else
      no-gutters
      :height="$vuetify.breakpoint.lgAndUp && !drag ? '458px' : ''"
    >
      <v-col cols="12" class="pb-3">
        <AbilityMods :edit="edit" :charId="charId" />
      </v-col>
      <v-col cols="12" class="pt-3">
        <SavingThrows :edit="edit" :charId="charId" />
      </v-col>
    </v-row>
  </v-lazy>
</template>

<script>
import AbilityMods from "../blobs/AbilityMods.vue";
import SavingThrows from "../blobs/SavingThrows.vue";

export default {
  props: {
    drag: {},
    charId: {},
    edit: { default: false },
    hide: { type: Boolean },
  },
  components: { AbilityMods, SavingThrows },
};
</script>
<template>
  <span>
    <v-card v-if="drag">
      <v-card-title class="text-h5">
        Quick Info & HP
        <v-spacer></v-spacer>
        <v-icon>mdi-drag</v-icon>
      </v-card-title>
    </v-card>
    <v-row
      v-else
      no-gutters
      :height="$vuetify.breakpoint.lgAndUp && !drag ? '458px' : ''"
    >
      <v-col cols="12"><Health :charId="charId" /></v-col>
      <v-col cols="12" class="mt-4"><Info :charId="charId" /></v-col>
    </v-row>
  </span>
</template>

<script>
import Health from "./blobs/Health.vue";
import Info from "./blobs/Info.vue";
export default {
  props: ["drag", "charId"],
  components: { Health, Info },
};
</script>
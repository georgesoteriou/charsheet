<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col cols="12"><Info /></v-col>
          <v-col cols="12"><AbilityScores /></v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Info from "./blobs/Info.vue";
import AbilityScores from "./blobs/AbilityScores.vue";

export default {
  name: "Char",
  components: {
    Info,
    AbilityScores,
  },
};
</script>

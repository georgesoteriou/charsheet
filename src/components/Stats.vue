<template>
  <v-card>
    <v-card-title class="text-h5"> Quick Info </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="text-center">
        <v-col cols="4">
          <EditBlob label="Armor Class" id="ac" />
        </v-col>
        <v-col cols="4">
          <EditBlob label="Initiative" id="initiative" />
        </v-col>
        <v-col cols="4">
          <EditBlob label="Speed" id="speed" />
        </v-col>
        <v-col cols="4">
          <EditBlob label="Passive</br>Perception" id="passive-perception" />
        </v-col>
        <v-col cols="4">
          <EditBlob label="Proficiency</br>Bonus" id="proficiency" />
        </v-col>
        <v-col cols="4">
          <EditBlob label="Hit Dice" id="Dice" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import EditBlob from "./blobs/EditBlob.vue";

export default {
  components: { EditBlob },
};
</script>
<template>
  <v-card>
    <v-card-title class="text-h5"> Character </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-row class="text-center" dense>
        <v-col cols="12" md="6" xl="3">
          <TextBox label="Name" id="name" />
        </v-col>
        <v-col cols="6" md="3" xl="2">
          <TextBox label="Race" id="race" />
        </v-col>
        <v-col cols="6" md="3" xl="2">
          <TextBox label="Class" id="class" />
        </v-col>
        <v-col cols="6" md="3" xl="2">
          <TextBox label="Background" id="background" />
        </v-col>
        <v-col cols="6" md="3" xl="1">
          <Alignment />
        </v-col>
        <v-col cols="6" md="3" xl="1">
          <Number label="Level" id="level" />
        </v-col>
        <v-col cols="6" md="3" xl="1">
          <NumberManual label="Exp" id="exp" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="py-1">
      <Personality />
    </v-card-actions>
  </v-card>
</template>

<script>
import TextBox from "./blobs/Text-Box.vue";
import Number from "./blobs/Number.vue";
import NumberManual from "./blobs/NumberManual.vue";
import Alignment from "./blobs/Alignment.vue";
import Personality from "./blobs/Personality.vue";

export default {
  components: { TextBox, Number, Alignment, Personality, NumberManual },
};
</script>
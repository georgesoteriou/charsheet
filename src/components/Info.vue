<template>
  <v-card>
    <v-card-title class="text-h5"> Character </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="text-center">
        <v-col lg="3" cols="6">
          <TextBox label="Name" id="name" />
        </v-col>
        <v-col lg="2" cols="3">
          <TextBox label="Race" id="race" />
        </v-col>
        <v-col lg="2" cols="3">
          <TextBox label="Class" id="class" />
        </v-col>
        <v-col lg="2" cols="4">
          <TextBox label="Background" id="background" />
        </v-col>
        <v-col lg="1" cols="2">
          <Alignment />
        </v-col>
        <v-col lg="1" cols="3">
          <Number label="Level" id="level" />
        </v-col>
        <v-col lg="1" cols="3">
          <NumberManual label="Exp" id="exp" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
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
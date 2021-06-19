<template>
  <v-row class="text-center" no-gutters>
    <v-col cols="3">
      <TextBox label="Name" id="name" />
    </v-col>
    <v-col cols="2">
      <TextBox label="Race" id="race" />
    </v-col>
    <v-col cols="2">
      <TextBox label="Class" id="class" />
    </v-col>
    <v-col cols="2">
      <TextBox label="Background" id="background" />
    </v-col>
    <v-col cols="1">
      <Alignment />
    </v-col>
    <v-col cols="2">
      <v-row no-gutters>
        <v-col cols="6">
          <Number label="Level" id="level" />
        </v-col>
        <v-col cols="6">
          <Number label="Exp" id="exp" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TextBox from "./Text-Box.vue";
import Number from "./Number.vue";
import Alignment from "./Alignment.vue";

export default {
  components: { TextBox, Number, Alignment },
};
</script>
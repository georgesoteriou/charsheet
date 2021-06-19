<template>
  <v-row class="text-center">
    <v-col cols="12">
      <TextArea id="trates" label="Personality Traits" />
    </v-col>
    <v-col cols="12">
      <TextArea id="ideals" label="Ideals" />
    </v-col>
    <v-col cols="12">
      <TextArea id="bonds" label="Bonds" />
    </v-col>
    <v-col cols="12">
      <TextArea id="flaws" label="Flaws" />
    </v-col>
  </v-row>
</template>

<script>
import TextArea from "./blobs/Text-Area.vue";

export default {
  components: {
    TextArea,
  },
  props: [],
};
</script>
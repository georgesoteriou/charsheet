<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="text-h6">
        Background
      </v-expansion-panel-header>
      <v-expansion-panel-content>
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
          <v-col cols="12">
            <TextArea id="about" label="About" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import TextArea from "./Text-Area.vue";

export default {
  components: {
    TextArea,
  },
  props: [],
};
</script>
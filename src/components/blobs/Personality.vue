<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="text-h6 px-1 py-0">
        Background
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row class="text-center" dense>
          <v-col cols="12">
            <TextArea :charId="charId" id="trates" label="Personality Traits" />
          </v-col>
          <v-col cols="12">
            <TextArea :charId="charId" id="ideals" label="Ideals" />
          </v-col>
          <v-col cols="12">
            <TextArea :charId="charId" id="bonds" label="Bonds" />
          </v-col>
          <v-col cols="12">
            <TextArea :charId="charId" id="flaws" label="Flaws" />
          </v-col>
          <v-col cols="12">
            <TextArea :charId="charId" id="about" label="About" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import TextArea from "./Text-Area.vue";

export default {
  props: { charId: {} },
  components: {
    TextArea,
  },
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
<template>
  <v-row class="text-center">
    <v-col>
      <Ability label="SRT" ability="str" />
    </v-col>
    <v-col>
      <Ability label="DEX" ability="dex" />
    </v-col>
    <v-col>
      <Ability label="CON" ability="con" />
    </v-col>
    <v-col>
      <Ability label="INT" ability="intel" />
    </v-col>
    <v-col>
      <Ability label="WIZ" ability="wiz" />
    </v-col>
    <v-col>
      <Ability label="CHA" ability="cha" />
    </v-col>
  </v-row>
</template>

<script>
import Ability from "./Ability.vue";
export default {
  components: { Ability },
};
</script>
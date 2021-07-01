<template>
  <v-list-item-content class="ma-0 pa-0">
    <v-card
      ref="parentCard"
      color="transparent"
      class="ma-0 pa-0"
      width="300px"
      style="overflow: hidden"
    >
      <v-card-title class="ma-0 px-1" style="width: 300px">
        <v-row dense>
          <v-col cols="3">
            <v-avatar color="blue">
              {{ initials }}
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <div>{{ char.name }}</div>
            <div class="text-caption">
              Level {{ char.level }}, {{ char.race }}, {{ char.class }}
            </div>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="ma-0 px-1">
        <v-row dense>
          <v-col cols="12">
            <v-progress-linear color="red" v-model="percent" height="30">
              <strong> {{ Math.ceil(percent) }}% </strong>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-list-item-content>
</template>

<script>
export default {
  props: { char: {} },
  data() {
    return {};
  },
  computed: {
    initials() {
      if (this.char.name) {
        return this.char.name
          .split(" ")
          .map((n) => n[0])
          .join("");
      } else {
        return "";
      }
    },
    percent() {
      return (this.char["hp"] / this.char["max-hp"]) * 100;
    },
  },
  mounted() {
    console.log(this.$refs.parentCard);
  },
};
</script>
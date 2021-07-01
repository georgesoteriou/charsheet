<template>
  <v-list-item-content class="ma-0 pa-0">
    <v-card
      ref="parentCard"
      color="transparent"
      class="ma-0 pa-0"
      width="300px"
      style="overflow: hidden"
    >
      <v-card-title class="ma-0 py-0 px-1" style="width: 300px">
        <v-row dense>
          <v-col cols="3">
            <v-avatar color="blue">
              {{ initials }}
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <div>{{ char.name }}</div>
            <div class="text-caption mt-n2">
              Level {{ char.level }}, {{ char.race }}, {{ char.class }}
            </div>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-btn v-if="del" icon @click.stop="$emit('delPartyMember')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-1 py-0 px-1">
        <v-row no-gutters>
          <v-col cols="12">
            <v-progress-linear
              rounded
              color="red"
              :value="percentHP"
              height="20"
            >
              <strong> {{ char["hp"] }} </strong>
            </v-progress-linear>
          </v-col>
          <v-col
            class="mt-1"
            cols="12"
            v-for="slot in spellSlots"
            :key="slot.id"
          >
            <v-progress-linear
              disabled
              rounded
              color="blue"
              :value="slot.percent"
              height="18"
            >
              <strong> {{ slot.curr }} </strong>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-list-item-content>
</template>

<script>
export default {
  props: { char: {}, del: { default: false } },
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
    percentHP() {
      return (this.char["hp"] / this.char["max-hp"]) * 100;
    },
    spellSlots() {
      let slots = [];
      for (let i = 1; i <= 9; i++) {
        let max_slot = this.char[`slots_max_${i}`];
        if (max_slot > 0) {
          let curr_slot = this.char[`slots_${i}`];
          let percent = (curr_slot / max_slot) * 100;
          slots.push({
            id: i,
            percent: percent,
            curr: curr_slot,
            max: max_slot,
          });
        }
      }
      return slots;
    },
  },
};
</script>
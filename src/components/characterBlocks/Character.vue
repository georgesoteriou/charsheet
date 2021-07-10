<template>
  <v-lazy>
    <v-card>
      <v-card-title class="text-h5"> Character </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-1">
        <v-row class="text-center" dense>
          <v-col cols="12" md="6" xl="3">
            <TextBox :edit="edit" :charId="charId" label="Name" id="name" />
          </v-col>
          <v-col cols="6" md="3" xl="2">
            <TextBox :edit="edit" :charId="charId" label="Race" id="race" />
          </v-col>
          <v-col cols="6" md="3" xl="2">
            <TextBox :edit="edit" :charId="charId" label="Class" id="class" />
          </v-col>
          <v-col cols="6" md="3" xl="2">
            <TextBox
              :edit="edit"
              :charId="charId"
              label="Background"
              id="background"
            />
          </v-col>
          <v-col cols="6" md="3" xl="1">
            <Alignment :edit="edit" :charId="charId" />
          </v-col>
          <v-col cols="6" md="3" xl="1">
            <Number
              :edit="edit"
              :document_ref="db.collection('characters').doc(charId)"
              label="Level"
              id="level"
            />
          </v-col>
          <v-col cols="6" md="3" xl="1">
            <NumberManual
              :edit="edit"
              :document_ref="db.collection('characters').doc(charId)"
              label="Exp"
              id="exp"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-1">
        <Personality :charId="charId" :edit="edit" />
      </v-card-actions>
    </v-card>
  </v-lazy>
</template>

<script>
import { db } from "../../firebase.js";

import TextBox from "../blobs/Text-Box.vue";
import Number from "../blobs/Number.vue";
import NumberManual from "../blobs/NumberManual.vue";
import Alignment from "../blobs/Alignment.vue";
import Personality from "../blobs/Personality.vue";

export default {
  props: {
    charId: {},
    edit: {
      default: false,
    },
  },
  components: { TextBox, Number, Alignment, Personality, NumberManual },
  data: function () {
    return {
      db: db,
    };
  },
};
</script>
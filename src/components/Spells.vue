<template>
  <v-card>
    <v-card-title class="text-h5">
      <span v-if="level > 0">Level {{ level }} Spells</span>
      <span v-else>Cantrips</span>
      <v-spacer></v-spacer>
      <v-btn
        fab
        x-small
        dark
        color="green"
        icon
        v-if="!drag"
        @click="$refs.new_picker.show()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-icon v-if="drag">mdi-drag</v-icon>
      <!-- ADD NEW SPELLS -->
      <SpellsPicker :charId="charId" :level="level" ref="new_picker" />
    </v-card-title>
    <v-divider></v-divider>
    <v-container class="py-2" v-if="level > 0 && !drag">
      <v-row dense>
        <v-col>
          <v-progress-linear color="blue" v-model="percent" height="20">
            <strong> {{ Math.ceil(percent) }}% </strong>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text
      v-if="!drag"
      :style="{
        height: $vuetify.breakpoint.lgAndUp
          ? level > 0
            ? '374px'
            : '410px'
          : '',
      }"
      class="pa-0 scroll"
    >
      <v-container class="py-1" v-if="level > 0 && !drag">
        <v-row class="text-center justify-center" no-gutters>
          <v-col cols="5">
            <Number
              :document_ref="db.collection('characters').doc(charId)"
              ref="slots"
              label="Slots"
              :id="`slots_${this.level}`"
            />
          </v-col>
          <v-col cols="1" class="text-h4"> / </v-col>
          <v-col cols="6">
            <Number
              :document_ref="db.collection('characters').doc(charId)"
              label="Max Slots"
              :id="`slots_max_${this.level}`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-expansion-panels multiple>
        <v-expansion-panel :key="a.id" v-for="a in mySpells">
          <v-expansion-panel-header class="py-2 px-3">
            <v-row no-gutters v-if="a.ref">
              <v-col cols="12" class="text-h6">
                <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                {{ a.ref.name }}
              </v-col>
              <v-col cols="12" class="text--secondary">
                <span v-if="a.equip" class="green--text text-caption">
                  Prepared,
                </span>
                {{ a.ref.range }}, {{ a.ref.time }}
                {{ a.ref.ritual ? "(ritual)" : "" }}
              </v-col>
            </v-row>
            <span dense v-else>Item deleted. Please remove</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="py-1">
              <v-row v-if="a.ref" no-gutters>
                <v-col cols="12">
                  <b>Components: </b> <span>{{ a.ref.components }}</span>
                </v-col>
                <v-col cols="12">
                  <b>Duration: </b>
                  <span>{{ a.ref.duration }}</span>
                </v-col>
                <v-col cols="12">
                  <b>Item shared with:</b>
                  {{ a.ref.public ? "Public" : "Just You" }}
                </v-col>
                <v-col cols="12 mt-2">
                  <span v-html="a.ref.description"> </span
                ></v-col>
                <v-col cols="12 mt-2" v-if="a.ref.high_description">
                  <span v-html="a.ref.high_description"> </span
                ></v-col>
              </v-row>
              <v-row no-gutters justify="center" v-if="a.ref">
                <v-col cols="6">
                  <v-btn
                    class="px-0"
                    text
                    color="blue"
                    block
                    @click.prevent="cast"
                  >
                    <v-icon>mdi-podcast</v-icon>
                    <div>Cast</div>
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    class="px-0"
                    text
                    :color="a.equip ? 'green' : 'grey'"
                    block
                    @click.prevent="equip(a.id, !a.equip)"
                  >
                    <v-icon>mdi-fencing</v-icon>
                    <div>Prepare</div>
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    class="px-0"
                    text
                    color="red"
                    block
                    @click.prevent="remove(a.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                    <div>Remove</div>
                  </v-btn>
                </v-col>
                <!-- Edit Button -->
                <v-col cols="6" v-if="a.ref.owner === $store.getters.user.uid">
                  <v-btn
                    text
                    class="px-0"
                    color="purple"
                    block
                    @click.prevent="$refs[`item-${a.id}`][0].show()"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <div>Edit</div>
                  </v-btn>
                  <SpellsDialog
                    :ref="`item-${a.id}`"
                    :item="{ ...a.ref }"
                    :level="level"
                    @save="(item) => save_edit_dialog(a.ref.id, item)"
                    :show_del="true"
                    @del="() => del(a.id, a.ref.id)"
                  />
                </v-col>
              </v-row>
              <v-row justify="end" v-else>
                <v-col cols="3">
                  <v-btn color="red" block @click.prevent="remove(a.id)">
                    <v-icon>mdi-close</v-icon>
                    <div>Remove</div>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from "../firebase.js";
import SpellsDialog from "./blobs/Spells/SpellsDialog.vue";
import SpellsPicker from "./blobs/Spells/SpellsPicker.vue";
import Number from "./blobs/Number.vue";

export default {
  props: {
    drag: {
      default: false,
    },
    level: {
      default: 0,
    },
    charId: {
      default: function () {
        return this.$route.params.id;
      },
    },
  },
  components: { SpellsDialog, SpellsPicker, Number },
  data() {
    return {
      db: db,
      mySpells: [],
      create_dialog: false,
      char: {},
      slots: 0,
      slots_max: 0,
    };
  },
  firestore() {
    return {
      mySpells: db
        .collection("characters")
        .doc(this.charId)
        .collection("spells")
        .where("level", "==", this.level)
        .orderBy("equip", "desc"),
      char: db.collection("characters").doc(this.charId),
    };
  },
  computed: {
    percent() {
      if (this.char[`slots_max_${this.level}`] > 0) {
        return (
          (this.char[`slots_${this.level}`] /
            this.char[`slots_max_${this.level}`]) *
          100
        );
      } else {
        return 0;
      }
    },
  },
  methods: {
    save_edit_dialog(id, newItem) {
      db.collection("spells").doc(id).update(newItem);
    },
    del(my_ref, global_ref) {
      // Delete from my list and globally
      db.collection("characters")
        .doc(this.charId)
        .collection("spells")
        .doc(my_ref)
        .delete();
      db.collection("spells").doc(global_ref).delete();
    },
    remove(id) {
      // Remove from my list
      db.collection("characters")
        .doc(this.charId)
        .collection("spells")
        .doc(id)
        .delete();
    },
    equip(id, equipt) {
      db.collection("characters")
        .doc(this.charId)
        .collection("spells")
        .doc(id)
        .update({ equip: equipt });
    },
    cast() {
      if (this.level > 0) {
        this.$refs.slots.decrease();
      }
    },
  },
};
</script>
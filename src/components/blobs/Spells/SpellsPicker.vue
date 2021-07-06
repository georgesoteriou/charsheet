<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        <span v-if="level > 0"> Pick Level {{ level }} Spell </span>
        <span v-else> Pick Cantrip </span>
        <v-spacer />
        <v-btn fab dark color="green" icon @click="$refs.new_item.show()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <SpellsDialog
          :allowPublic="allowPublic"
          ref="new_item"
          :level="level"
          @save="(a) => save_create_dialog(null, a)"
        />
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-3">
        <v-card v-if="privateSpell.length > 0">
          <v-card-title class="text-h6"> Your Private Spells </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-expansion-panels accordion>
              <v-expansion-panel :key="i" v-for="(a, i) in privateSpell">
                <v-expansion-panel-header>
                  <v-row dense>
                    <v-col cols="12" class="text-h6">
                      <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                      {{ a.name }}
                    </v-col>
                    <v-col cols="12" class="text-caption">
                      <span v-if="a.equip" class="green--text"> Prepared </span>
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      {{ a.range }}, {{ a.time }}
                      {{ a.ritual ? "(ritual)" : "" }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                    <v-row no-gutters class="pl-4">
                      <v-col cols="9">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <b>Components: </b>
                            <span>{{ a.components }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Duration: </b>
                            <span>{{ a.duration }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Item shared with:</b>
                            {{ a.public ? "Public" : "Just You" }}
                          </v-col>
                          <v-col cols="12 mt-2">
                            <span v-html="a.description"> </span
                          ></v-col>
                          <v-col cols="12 mt-2" v-if="a.high_description">
                            <span v-html="a.high_description"> </span
                          ></v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          class="px-0"
                          color="green"
                          block
                          @click.prevent="add(a.id, a.level)"
                        >
                          <v-icon>mdi-plus</v-icon>
                          <div>Add</div>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="text-h6"> Public Spells </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-expansion-panels accordion>
              <v-expansion-panel :key="i" v-for="(a, i) in publicSpell">
                <v-expansion-panel-header>
                  <v-row dense>
                    <v-col cols="12" class="text-h6">
                      <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                      {{ a.name }}
                    </v-col>
                    <v-col cols="12" class="text-caption">
                      <span v-if="a.equip" class="green--text"> Prepared </span>
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      {{ a.range }}, {{ a.time }}
                      {{ a.ritual ? "(ritual)" : "" }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                    <v-row no-gutters class="pl-4">
                      <v-col cols="9">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <b>Components: </b>
                            <span>{{ a.components }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Duration: </b>
                            <span>{{ a.duration }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Item shared with:</b>
                            {{ a.public ? "Public" : "Just You" }}
                          </v-col>
                          <v-col cols="12 mt-2">
                            <span v-html="a.description"> </span
                          ></v-col>
                          <v-col cols="12 mt-2" v-if="a.high_description">
                            <span v-html="a.high_description"> </span
                          ></v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          class="px-0"
                          color="green"
                          block
                          @click.prevent="add(a.id, a.level)"
                        >
                          <v-icon>mdi-plus</v-icon>
                          <div>Add</div>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" class="my-2">
          <v-col cols="5">
            <v-btn block color="#607D8B" @click="close">
              <v-icon>mdi-close</v-icon>
              <div>Cancel</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase.js";
import SpellsDialog from "./SpellsDialog.vue";

export default {
  props: {
    collection: {
      default: "spells",
    },
    allowPublic: {
      default: false,
    },
    level: {
      default: 0,
    },
    charId: {},
  },
  components: { SpellsDialog },
  data() {
    return {
      dialog: false,
      chosen: 0,
      publicSpell: [],
      privateSpell: [],
    };
  },
  firestore() {
    return {
      publicSpell: db
        .collection(this.collection)
        .where("public", "==", true)
        .where("level", "==", this.level)
        .orderBy("name"),
      privateSpell: db
        .collection(this.collection)
        .where("level", "==", this.level)
        .where("public", "==", false)
        .where("owner", "==", this.$store.getters.user.uid)
        .orderBy("name", "desc"),
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    add(id, level) {
      const docRef = db.collection(this.collection).doc(id);
      db.collection("characters")
        .doc(this.charId)
        .collection(this.collection)
        .add({
          ref: docRef,
          equip: false,
          prepared: false,
          level: level,
        });
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
    save_create_dialog(id, newSpell) {
      db.collection(this.collection)
        .add(newSpell)
        .then((docRef) => {
          db.collection("characters")
            .doc(this.charId)
            .collection(this.collection)
            .add({
              ref: docRef,
              equip: false,
              prepared: false,
              level: newSpell.level,
            });
          this.dialog = false;
        });
    },
  },
};
</script>
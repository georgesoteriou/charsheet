<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        <span> Pick Weapon </span>
        <v-spacer />
        <v-btn fab dark color="green" icon @click="$refs.new_item.show()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <WeaponsDialog
          ref="new_item"
          @save="(a) => save_create_dialog(null, a)"
        />
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-3">
        <v-card v-if="privateArmor.length > 0">
          <v-card-title class="text-h6"> Your Private Weapons </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-expansion-panels accordion>
              <v-expansion-panel :key="i" v-for="(a, i) in privateArmor">
                <v-expansion-panel-header>
                  <v-row dense>
                    <v-col cols="12" class="text-h6">
                      {{ a.name }}
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      Attack Bonus: +{{ a.extra_attack }}
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      Damage: {{ a.dmg }} + {{ a.extra_dmg }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                    <v-row no-gutters class="pl-4">
                      <v-col cols="9">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <span v-if="a.tags">
                              <b>Tags: </b> {{ a.tags.join(", ") }}
                            </span>
                          </v-col>
                          <v-col cols="12">
                            <b>Damage Type: </b>
                            <span>{{ a.dmg_type }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Weapon Type: </b>
                            <span>{{ a.type }}, {{ a.rarity }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Discription: </b>
                            <span v-html="a.description"> </span
                          ></v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          class="px-0"
                          color="green"
                          block
                          @click.prevent="add(a.id)"
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
          <v-card-title class="text-h6"> Public Weapons </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-expansion-panels accordion>
              <v-expansion-panel :key="i" v-for="(a, i) in publicArmor">
                <v-expansion-panel-header>
                  <v-row dense>
                    <v-col cols="12" class="text-h6">
                      {{ a.name }}
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      Attack Bonus: +{{ a.extra_attack }}
                    </v-col>
                    <v-col cols="12" class="text--secondary">
                      Damage: {{ a.dmg }} + {{ a.extra_dmg }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                    <v-row no-gutters class="pl-4">
                      <v-col cols="9">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <span v-if="a.tags">
                              <b>Tags: </b> {{ a.tags.join(", ") }}
                            </span>
                          </v-col>
                          <v-col cols="12">
                            <b>Damage Type: </b>
                            <span>{{ a.dmg_type }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Weapon Type: </b>
                            <span>{{ a.type }}, {{ a.rarity }}</span>
                          </v-col>
                          <v-col cols="12">
                            <b>Discription: </b>
                            <span v-html="a.description"> </span
                          ></v-col>
                          <v-col cols="12">
                            <b>Item shared with: </b>
                            {{ a.public ? "Public" : "Just You" }}
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          class="px-0"
                          color="green"
                          block
                          @click.prevent="add(a.id)"
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
import WeaponsDialog from "./WeaponsDialog.vue";

export default {
  props: {
    collection: {
      default: "weapons",
    },
  },
  components: { WeaponsDialog },
  data() {
    return {
      dialog: false,
      chosen: 0,
      publicArmor: [],
      privateArmor: [],
    };
  },
  firestore() {
    return {
      publicArmor: db
        .collection(this.collection)
        .where("public", "==", true)
        .orderBy("name"),
      privateArmor: db
        .collection(this.collection)
        .where("public", "==", false)
        .where("owner", "==", this.$store.getters.user.uid)
        .orderBy("name", "desc"),
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    add(id) {
      const docRef = db.collection(this.collection).doc(id);
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .add({ ref: docRef, equip: false, proficient: false });
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
    save_create_dialog(id, newArmor) {
      db.collection(this.collection)
        .add(newArmor)
        .then((docRef) => {
          db.collection("characters")
            .doc(this.$route.params.id)
            .collection(this.collection)
            .add({ ref: docRef, equip: false, proficient: false });
          this.dialog = false;
        });
    },
  },
};
</script>
<template>
  <v-card>
    <v-card-title class="text-h5">
      Weapons
      <v-spacer></v-spacer>
      <v-btn fab dark color="green" icon @click="$refs.new_picker.show()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- ADD NEW ARMOR -->
      <WeaponsPicker ref="new_picker" />
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-expansion-panels multiple>
        <v-expansion-panel :key="a.id" v-for="a in myWeapons">
          <v-expansion-panel-header>
            <v-row no-gutters v-if="a.ref">
              <v-col cols="12" class="text-h6">
                <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                {{ a.ref.name }}
              </v-col>
              <v-col cols="12" class="text-caption">
                <span v-if="a.equip" class="green--text"> Equipped </span>
              </v-col>
              <v-col
                cols="12"
                class="text--secondary"
                :class="a.proficient ? 'orange--text text--darken-1' : ''"
              >
                Attack Bonus: +
                {{
                  a.proficient
                    ? a.ref.extra_attack + parseInt(char.proficiency)
                    : a.ref.extra_attack
                }}
              </v-col>
              <v-col cols="12" class="text--secondary">
                Damage: {{ a.ref.dmg }} + {{ a.ref.extra_dmg }}
              </v-col>
            </v-row>
            <span dense v-else>Item deleted. Please remove</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row v-if="a.ref" no-gutters class="pl-4">
                <v-col cols="10">
                  <span v-if="a.ref.tags">
                    <b>Tags:</b> {{ a.ref.tags.join(", ") }}
                  </span>
                </v-col>
                <v-col cols="10">
                  <b>Damage Type:</b> <span>{{ a.ref.dmg_type }}</span>
                </v-col>
                <v-col cols="10">
                  <b>Weapon Type:</b>
                  <span>{{ a.ref.type }}, {{ a.ref.rarity }}</span>
                </v-col>
                <v-col cols="10">
                  <b>Discription:</b> <span v-html="a.ref.description"> </span
                ></v-col>
                <v-col cols="10">
                  <b>Item shared with:</b>
                  {{ a.ref.public ? "Public" : "Just You" }}
                </v-col>
              </v-row>
              <v-row dense justify="end" v-if="a.ref">
                <v-col cols="6">
                  <v-btn
                    class="px-0"
                    text
                    :color="a.proficient ? 'warning' : 'grey'"
                    block
                    @click.prevent="proficient(a.id, !a.proficient)"
                  >
                    <v-icon>mdi-professional-hexagon</v-icon>
                    <div>Proficient</div>
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
                    <div>Equip</div>
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
                  <WeaponsDialog
                    :ref="`item-${a.id}`"
                    :item="{ ...a.ref }"
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
import WeaponsDialog from "./blobs/Weapons/WeaponsDialog.vue";
import WeaponsPicker from "./blobs/Weapons/WeaponsPicker.vue";

export default {
  props: {
    collection: {
      default: "weapons",
    },
  },
  components: { WeaponsDialog, WeaponsPicker },
  data() {
    return {
      myWeapons: [],
      create_dialog: false,
      char: {},
    };
  },
  firestore() {
    return {
      myWeapons: db
        .collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .orderBy("equip"),
      char: db.collection("characters").doc(this.$route.params.id),
    };
  },
  computed: {},
  methods: {
    save_edit_dialog(id, newItem) {
      db.collection(this.collection).doc(id).update(newItem);
    },
    del(my_ref, global_ref) {
      // Delete from my list and globally
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .doc(my_ref)
        .delete();
      db.collection(this.collection).doc(global_ref).delete();
    },
    remove(my_ref) {
      // Remove from my list
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .doc(my_ref)
        .delete();
    },
    equip(id, equipt) {
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .doc(id)
        .update({ equip: equipt });
    },
    proficient(id, pro) {
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .doc(id)
        .update({ proficient: pro });
    },
  },
};
</script>
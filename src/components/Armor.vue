<template>
  <v-card>
    <v-card-title class="text-h5">
      Armor
      <v-spacer></v-spacer>
      <v-btn fab dark color="green" icon @click="$refs.new_picker.show()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- ADD NEW ARMOR -->
      <ArmorPicker ref="new_picker" />
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-expansion-panels multiple>
        <v-expansion-panel :key="i" v-for="(a, i) in myArmor">
          <v-expansion-panel-header>
            <v-row dense v-if="a.ref">
              <v-col cols="12" class="text-h6">
                <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                {{ a.ref.name }}
              </v-col>
              <v-col cols="12" class="text--secondary">
                <span v-if="a.equip" class="green--text">Equipped,</span>
                <span>
                  {{ a.ref.stealth_dis ? "Dis. on Stealth, " : "" }}
                </span>
                <span>{{ a.ref.base_ac }} + {{ a.ref.modifier }}</span>
              </v-col>
            </v-row>
            <span dense v-else>Item deleted. Please remove</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row v-if="a.ref" no-gutters class="pl-4">
                <v-col cols="10">Type: {{ a.ref.type }}</v-col>
                <v-col cols="10">Discription: {{ a.ref.description }}</v-col>
                <v-col cols="10">
                  Item shared with: {{ a.ref.public ? "Public" : "Just You" }}
                </v-col>
              </v-row>
              <v-row dense justify="end" v-if="a.ref">
                <v-col cols="2">
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
                <v-col cols="2">
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
                <v-col cols="2" v-if="a.ref.owner === $store.getters.user.uid">
                  <v-btn
                    text
                    class="px-0"
                    color="purple"
                    block
                    @click.prevent="$refs[`armor-${i}`][0].show()"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <div>Edit</div>
                  </v-btn>
                  <ArmorDialog
                    :ref="`armor-${i}`"
                    :armor="{ ...a.ref }"
                    @save="(armor) => save_edit_dialog(a.ref.id, armor)"
                    :show_del="true"
                    @del="() => del(a.id, a.ref.id)"
                  />
                </v-col>
              </v-row>
              <v-row justify="end" v-else>
                <v-col cols="3">
                  <v-btn color="red" block @click.prevent="remove(a.id)">
                    <v-icon>mdi-close</v-icon>
                    <span>Remove</span>
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
import ArmorDialog from "./blobs/ArmorDialog.vue";
import ArmorPicker from "./blobs/ArmorPicker.vue";

export default {
  components: { ArmorDialog, ArmorPicker },
  data() {
    return {
      myArmor: [],
      create_dialog: false,
    };
  },
  firestore() {
    return {
      myArmor: db
        .collection("characters")
        .doc(this.$route.params.id)
        .collection("armor"),
    };
  },
  computed: {},
  methods: {
    save_edit_dialog(id, newArmor) {
      db.collection("armor").doc(id).update(newArmor);
    },
    del(my_ref, global_ref) {
      // Delete from my list and globally
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection("armor")
        .doc(my_ref)
        .delete();
      db.collection("armor").doc(global_ref).delete();
    },
    remove(my_ref) {
      // Remove from my list
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection("armor")
        .doc(my_ref)
        .delete();
    },
    equip(id, equipt) {
      db.collection("characters")
        .doc(this.$route.params.id)
        .collection("armor")
        .doc(id)
        .update({ equip: equipt });
    },
  },
};
</script>
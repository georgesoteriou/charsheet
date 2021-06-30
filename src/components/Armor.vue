<template>
  <v-card>
    <v-card-title class="text-h5">
      Armor
      <v-spacer></v-spacer>
      <v-btn
        fab
        x-small
        dark
        color="green"
        icon
        v-if="edit && !drag"
        @click="$refs.new_picker.show()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-if="drag" icon class="mr-3" @click="$emit('hideToggleFunc')">
        <v-icon>{{ hide ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
      </v-btn>
      <v-icon v-if="drag">mdi-drag</v-icon>

      <!-- ADD NEW ARMOR -->
      <ArmorPicker :charId="charId" ref="new_picker" />
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="pa-0 scroll"
      :style="{ height: $vuetify.breakpoint.lgAndUp ? '410px' : '' }"
      v-if="!drag"
    >
      <v-expansion-panels multiple>
        <v-expansion-panel :key="a.id" v-for="a in myArmor">
          <v-expansion-panel-header class="py-2 px-3">
            <v-row no-gutters v-if="a.ref">
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
            <v-container class="py-1">
              <v-row v-if="a.ref" no-gutters>
                <v-col cols="10"><b>Type:</b> {{ a.ref.type }}</v-col>
                <v-col cols="10">
                  <b>Discription:</b> {{ a.ref.description }}
                </v-col>
                <v-col cols="10">
                  <b>Item shared with:</b>
                  {{ a.ref.public ? "Public" : "Just You" }}
                </v-col>
              </v-row>
              <v-row no-gutters justify="end" v-if="edit && a.ref">
                <v-col cols="4">
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
                <v-col cols="4">
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
                <v-col cols="4" v-if="a.ref.owner === $store.getters.user.uid">
                  <v-btn
                    text
                    class="px-0"
                    color="purple"
                    block
                    @click.prevent="$refs[`armor-${a.id}`][0].show()"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <div>Edit</div>
                  </v-btn>
                  <ArmorDialog
                    :ref="`armor-${a.id}`"
                    :armor="{ ...a.ref }"
                    @save="(armor) => save_edit_dialog(a.ref.id, armor)"
                    :show_del="true"
                    @del="() => del(a.id, a.ref.id)"
                  />
                </v-col>
              </v-row>
              <v-row justify="end" v-if="!edit && !a.ref">
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
import ArmorDialog from "./blobs/Armor/ArmorDialog.vue";
import ArmorPicker from "./blobs/Armor/ArmorPicker.vue";

export default {
  props: {
    drag: {},
    charId: {},
    edit: { default: false },
    hide: { type: Boolean },
  },
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
        .doc(this.charId)
        .collection("armor")
        .orderBy("equip", "desc"),
    };
  },
  methods: {
    save_edit_dialog(id, newArmor) {
      db.collection("armor").doc(id).update(newArmor);
    },
    del(my_ref, global_ref) {
      // Delete from my list and globally
      db.collection("characters")
        .doc(this.charId)
        .collection("armor")
        .doc(my_ref)
        .delete();
      db.collection("armor").doc(global_ref).delete();
    },
    remove(my_ref) {
      // Remove from my list
      db.collection("characters")
        .doc(this.charId)
        .collection("armor")
        .doc(my_ref)
        .delete();
    },
    equip(id, equipt) {
      db.collection("characters")
        .doc(this.charId)
        .collection("armor")
        .doc(id)
        .update({ equip: equipt });
    },
  },
};
</script>


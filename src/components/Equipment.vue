<template>
  <v-card>
    <v-card-title class="text-h5">
      Equipment
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
      <!-- ADD NEW ARMOR -->
      <EquipmentPicker ref="new_picker" />
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="pa-0 scroll"
      :style="$vuetify.breakpoint.lgAndUp ? 'height: 420px' : ''"
      v-if="!drag"
    >
      <v-expansion-panels multiple>
        <v-expansion-panel :key="a.id" v-for="a in myEquipment">
          <v-expansion-panel-header>
            <v-row no-gutters v-if="a.ref">
              <v-col cols="12" class="text-h6">
                <v-icon color="green" v-if="a.equip">mdi-fencing</v-icon>
                {{ a.ref.name }}
                <span v-if="a.ref.multiple"> x {{ a.ammount }}</span>
              </v-col>
              <v-col cols="12" class="text--secondary">
                <span v-if="a.equip" class="green--text">Holding</span>
              </v-col>
            </v-row>
            <span dense v-else>Item deleted. Please remove</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row v-if="a.ref" no-gutters class="px-4">
                <v-col cols="10">
                  <b>Discription:</b> <span v-html="a.ref.description"> </span
                ></v-col>
                <v-col cols="10">
                  <b>Item shared with:</b>
                  {{ a.ref.public ? "Public" : "Just You" }}
                </v-col>
              </v-row>
              <v-row dense class="px-4" justify="start" v-if="a.ref.multiple">
                <v-col cols="6">
                  <Number
                    label="Ammount"
                    :document_ref="get_id(a.id)"
                    id="ammount"
                  />
                </v-col>
              </v-row>
              <v-row dense v-if="a.ref">
                <v-col cols="4">
                  <v-btn
                    class="px-0"
                    text
                    :color="a.equip ? 'green' : 'grey'"
                    block
                    @click.prevent="equip(a.id, !a.equip)"
                  >
                    <v-icon>mdi-fencing</v-icon>
                    <div>Hold</div>
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
                    @click.prevent="$refs[`item-${a.id}`][0].show()"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <div>Edit</div>
                  </v-btn>
                  <EquipmentDialog
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
import EquipmentDialog from "./blobs/Equipment/EquipmentDialog.vue";
import EquipmentPicker from "./blobs/Equipment/EquipmentPicker.vue";
import Number from "./blobs/Number.vue";

export default {
  props: {
    collection: {
      default: "equipment",
    },
    drag: {
      default: false,
    },
  },
  components: { EquipmentDialog, EquipmentPicker, Number },
  data() {
    return {
      myEquipment: [],
      create_dialog: false,
    };
  },
  firestore() {
    return {
      myEquipment: db
        .collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .orderBy("equip", "desc"),
    };
  },
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
    get_id(id) {
      return db
        .collection("characters")
        .doc(this.$route.params.id)
        .collection(this.collection)
        .doc(id);
    },
  },
};
</script>
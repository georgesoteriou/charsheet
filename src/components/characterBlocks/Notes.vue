<template>
  <v-lazy>
    <v-card>
      <v-card-title class="text-h5">
        {{ name }}
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
        <v-btn
          v-if="drag"
          icon
          class="mr-3"
          @click.stop="$emit('hideToggleFunc')"
        >
          <v-icon>{{ hide ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
        </v-btn>
        <v-icon v-if="drag">mdi-drag</v-icon>
        <!-- ADD NEW ARMOR -->
        <NotesPicker
          :charId="charId"
          :name="name"
          :allowPublic="allowPublic"
          :collection="collection"
          ref="new_picker"
        />
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        class="pa-0 scroll"
        :style="{ height: $vuetify.breakpoint.lgAndUp ? '417px' : '' }"
        v-if="!drag"
      >
        <v-expansion-panels multiple>
          <v-expansion-panel :key="a.id" v-for="a in myNotes">
            <v-expansion-panel-header class="py-2 px-3">
              <v-row no-gutters v-if="a.ref">
                <v-col cols="12" class="text-h6">
                  <v-icon color="green" v-if="a.equip"
                    >mdi-priority-high</v-icon
                  >
                  {{ a.ref.name }}
                  <span v-if="a.ref.multiple"> x {{ a.ammount }}</span>
                </v-col>
              </v-row>
              <span dense v-else>Item deleted. Please remove</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container fluid class="py-0">
                <v-row v-if="a.ref" no-gutters>
                  <v-col cols="10">
                    <b>Discription:</b> <span v-html="a.ref.description"> </span
                  ></v-col>
                  <v-col cols="10" v-if="!allowPublic">
                    <b>Item shared with:</b>
                    {{ a.ref.public ? "Public" : "Just You" }}
                  </v-col>
                </v-row>
                <v-row dense v-if="edit && a.ref.multiple">
                  <v-col cols="12">
                    <Number
                      label="Ammount"
                      :document_ref="get_id(a.id)"
                      id="ammount"
                    />
                  </v-col>
                </v-row>
                <v-row dense justify="center" v-if="edit && a.ref">
                  <v-col cols="6" md="4">
                    <v-btn
                      class="px-0"
                      text
                      :color="a.equip ? 'green' : 'grey'"
                      block
                      @click.prevent="equip(a.id, !a.equip)"
                    >
                      <v-icon>mdi-priority-high</v-icon>
                      <div>Priority</div>
                    </v-btn>
                  </v-col>
                  <v-col cols="6" md="4">
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
                  <v-col
                    cols="6"
                    md="4"
                    v-if="a.ref.owner === $store.getters.user.uid"
                  >
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
                    <NotesDialog
                      :allowPublic="allowPublic"
                      :ref="`item-${a.id}`"
                      :item="{ ...a.ref }"
                      @save="(item) => save_edit_dialog(a.ref.id, item)"
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
  </v-lazy>
</template>

<script>
import { db } from "../../firebase.js";
import NotesDialog from "../blobs/Notes/NotesDialog.vue";
import NotesPicker from "../blobs/Notes/NotesPicker.vue";
import Number from "../blobs/Number.vue";

export default {
  props: {
    name: {
      default: "Notes",
    },
    collection: {
      default: "notes",
    },
    drag: {
      default: false,
    },
    allowPublic: {
      default: false,
    },
    charId: {},
    edit: { default: false },
    hide: { type: Boolean },
  },
  components: { NotesDialog, NotesPicker, Number },
  data() {
    return {
      myNotes: [],
      create_dialog: false,
    };
  },
  firestore() {
    return {
      myNotes: db
        .collection("characters")
        .doc(this.charId)
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
        .doc(this.charId)
        .collection(this.collection)
        .doc(my_ref)
        .delete();
      db.collection(this.collection).doc(global_ref).delete();
    },
    remove(my_ref) {
      // Remove from my list
      db.collection("characters")
        .doc(this.charId)
        .collection(this.collection)
        .doc(my_ref)
        .delete();
    },
    equip(id, equipt) {
      db.collection("characters")
        .doc(this.charId)
        .collection(this.collection)
        .doc(id)
        .update({ equip: equipt });
    },
    get_id(id) {
      return db
        .collection("characters")
        .doc(this.charId)
        .collection(this.collection)
        .doc(id);
    },
  },
};
</script>
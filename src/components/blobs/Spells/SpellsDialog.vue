<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        <span v-if="show_del"> Edit Spell </span>
        <span v-else>
          <span v-if="level > 0"> Add New Level {{ level }} Spell </span>
          <span v-else> Add New Cantrip </span>
        </span>
        <v-spacer></v-spacer>
        <span v-if="allowPublic">
          <v-btn
            v-if="newItem.public"
            fab
            dark
            :icon="true"
            @click="newItem.public = false"
          >
            <v-icon>mdi-earth</v-icon>
          </v-btn>
          <v-btn v-else fab dark :icon="true" @click="newItem.public = true">
            <v-icon>mdi-eye-off</v-icon>
          </v-btn>
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-1">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.name"
                label="Spell Name"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newItem.school"
                label="School"
                :items="schools"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.time"
                label="Casting Time"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.range"
                label="Range"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.duration"
                label="Duration"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.components"
                label="Components"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-combobox
                multiple
                small-chips
                v-model="newItem.classes"
                :items="classes"
                label="Classses"
                outlined
                :hide-details="true"
                dense
              ></v-combobox>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="newItem.ritual"
                label="Ritual"
                :hide-details="true"
                dense
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newItem.description"
                label="Description"
                outlined
                :hide-details="true"
                dense
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newItem.high_description"
                label="Higher Levels Description"
                outlined
                :hide-details="true"
                dense
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row dense justify="center" class="my-2">
          <v-col cols="4">
            <v-btn block color="success" @click="save">
              <v-icon>mdi-content-save</v-icon>
              <div v-if="!$vuetify.breakpoint.xs">Save</div>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block color="#607D8B" @click="close">
              <v-icon>mdi-close</v-icon>
              <div v-if="!$vuetify.breakpoint.xs">Cancel</div>
            </v-btn>
          </v-col>
          <v-col cols="4" v-if="show_del">
            <v-btn color="error" block @click.prevent="del">
              <v-icon>mdi-delete</v-icon>
              <div v-if="!$vuetify.breakpoint.xs">Delete</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    allowPublic: {
      default: false,
    },
    show_del: {
      type: Boolean,
      default: false,
    },
    level: {
      default: 0,
    },
    item: {
      default: function () {
        return {
          name: "",
          school: "Conjuration",
          ritual: false,
          time: "1 action",
          range: "30 feet",
          duration: "Instantaneous",
          components: "",
          description: "",
          high_description: "",
          classes: [],
          level: this.level,
          public: false,
          owner: this.$store.getters.user.uid,
        };
      },
    },
  },
  data() {
    return {
      dialog: false,
      newItem: this.item,
      schools: [
        "Conjuration",
        "Necromancy",
        "Evocation",
        "Abjuration",
        "Transmutation",
        "Divination",
        "Enchantment",
        "Illusion",
      ],
      classes: [
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard",
      ],
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    save() {
      this.$emit("save", this.newItem);
      this.dialog = false;
    },
    del() {
      this.$emit("del");
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        <span v-if="show_del"> Edit Armor </span>
        <span v-else> Add New Armor </span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="newArmor.public"
          fab
          dark
          :icon="true"
          @click="newArmor.public = false"
        >
          <v-icon>mdi-earth</v-icon>
        </v-btn>
        <v-btn v-else fab dark :icon="true" @click="newArmor.public = true">
          <v-icon>mdi-eye-off</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-1">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newArmor.name"
                label="Armor Name"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newArmor.description"
                label="Description"
                outlined
                :hide-details="true"
                dense
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newArmor.type"
                label="Type"
                :items="types"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newArmor.base_ac"
                label="Base AC"
                outlined
                :hide-details="true"
                dense
                prepend-inner-icon="mdi-minus"
                type="number"
                @click:prepend-inner="newArmor.base_ac--"
                @click:append="newArmor.base_ac++"
                append-icon="mdi-plus"
                class="centered-input"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newArmor.modifier"
                label="Modifier"
                :items="modifiers"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newArmor.max_bonus"
                label="Max Bonus"
                outlined
                :hide-details="true"
                dense
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newArmor.req_strength"
                label="Required Strength"
                outlined
                :hide-details="true"
                dense
                prepend-inner-icon="mdi-minus"
                type="number"
                @click:prepend-inner="newArmor.req_strength--"
                @click:append="newArmor.req_strength++"
                append-icon="mdi-plus"
                class="centered-input"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="newArmor.stealth_dis"
                label="Stealth Disadvantage"
                :hide-details="true"
                dense
              ></v-checkbox>
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
    show_del: {
      type: Boolean,
      default: false,
    },
    armor: {
      default: function () {
        return {
          name: "",
          description: "",
          type: "Light Armor",
          stealth_dis: false,
          base_ac: 10,
          modifier: "None",
          max_bonus: null,
          req_strength: 0,
          public: false,
          owner: this.$store.getters.user.uid,
        };
      },
    },
  },
  data() {
    return {
      dialog: false,
      newArmor: this.armor,
      types: ["Light Armor", "Medium Armor", "Heavy Armor", "Shield"],
      modifiers: [
        "None",
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
      ],
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    save() {
      this.$emit("save", this.newArmor);
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
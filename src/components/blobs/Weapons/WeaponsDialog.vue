<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        <span v-if="show_del"> Edit Weapon </span>
        <span v-else> Add New Weapon </span>
        <v-spacer></v-spacer>
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
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-1">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.name"
                label="Weapon Name"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
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
              <v-text-field
                v-model="newItem.type"
                label="Type"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newItem.ammo"
                label="Ammunition"
                :items="ammunition"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newItem.dmg_type"
                label="Dammage Type"
                :items="dmg_types"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newItem.attack_ability"
                label="Attack Ability"
                :items="abilities"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newItem.rarity"
                label="Rarity"
                :items="rarities"
                outlined
                :hide-details="true"
                dense
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="newItem.tags"
                :items="tags"
                :hide-details="true"
                chips
                small-chips
                :menu-props="{ bottom: true, offsetY: true }"
                label="Other Tags"
                multiple
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.extra_attack"
                label="Extra Attack Bonus"
                outlined
                :hide-details="true"
                dense
                prepend-inner-icon="mdi-minus"
                type="number"
                @click:prepend-inner="newItem.extra_attack--"
                @click:append="newItem.extra_attack++"
                append-icon="mdi-plus"
                class="centered-input"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.extra_dmg"
                label="Extra Damage Bonus"
                outlined
                :hide-details="true"
                dense
                prepend-inner-icon="mdi-minus"
                type="number"
                @click:prepend-inner="newItem.extra_dmg--"
                @click:append="newItem.extra_dmg++"
                append-icon="mdi-plus"
                class="centered-input"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newItem.dmg"
                label="Damage"
                outlined
                :hide-details="true"
                dense
              ></v-text-field>
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
    item: {
      default: function () {
        return {
          name: "",
          description: "",
          type: "Club",
          ammo: "None",
          dmg_type: "Bludgeoning",
          attack_ability: "Strength",
          rarity: "Common",
          tags: [],
          extra_attack: 0,
          extra_dmg: 0,
          dmg: "1d6",
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
      ammunition: [
        "None",
        "Arror",
        "Bolt",
        "Sling Bullet",
        "Blowgun Needle",
        "Firearm Ammunition",
      ],
      dmg_types: [
        "Slashing",
        "Piercing",
        "Bludgeoning",
        "Poison",
        "Acid",
        "Fire",
        "Cold",
        "Radiant",
        "Necrotic",
        "Lightning",
        "Thunder",
        "Force",
        "Psychic",
      ],
      abilities: [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wizdom",
        "Charisma",
      ],
      rarities: [
        "Common",
        "Uncommon",
        "Rare",
        "Very Rare",
        "Legendary",
        "Unique",
        "Artifact",
      ],
      tags: [
        "Requires Attunement",
        "Simple",
        "Finesse",
        "Thrown",
        "Two-handed",
        "Versatile",
        "Silver",
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
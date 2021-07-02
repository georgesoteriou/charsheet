<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              <TextBox
                :edit="true"
                label="Name"
                id="name"
                :charId="partyId"
                collId="parties"
              />
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" xl="4" v-for="char in chars" :key="char.id">
          <v-btn
            @click="
              partyMemberId = char.ref.id;
              partyMemberShow = true;
            "
            block
            height="100%"
            class="pa-2"
          >
            <MiniChar
              width="100%"
              :detail="true"
              :char="char.ref"
              :del="true"
              @delPartyMember="() => delPartyMember(char.id)"
            />
          </v-btn>
        </v-col>
        <!-- PARTY MEMBER -->
        <v-dialog
          v-model="partyMemberShow"
          width="90vw"
          :fullscreen="$vuetify.breakpoint.xs"
        >
          <v-card class="pa-3">
            <v-card-title class="text-h5 text-center">
              Party Member
            </v-card-title>

            <v-card-text class="pa-0">
              <CharSheet :charId="partyMemberId" :edit="false" />
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn block color="error" @click="partyMemberShow = false">
                    Close
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-footer absolute padless>
          <v-btn text x-large block class="px-2" @click="newFriend">
            <v-icon>mdi-plus</v-icon>
            <v-list-item-title> Add New Party Member </v-list-item-title>
          </v-btn>
          <!-- DIALOG TO ADD FRIENDS -->
          <v-dialog v-model="addDialog" width="500">
            <v-card class="pa-3">
              <v-card-title class="text-h5 text-center">
                Add Party Member
              </v-card-title>
              <v-card-text class="text-center text-h4">
                <v-text-field
                  v-model="newFriendId"
                  label="New Party Member ID"
                  outlined
                  dense
                  :error-messages="error"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col>
                    <v-btn
                      block
                      color="success"
                      @click="addFriend"
                      :loading="adding"
                    >
                      Add
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      block
                      color="error"
                      :disabled="adding"
                      @click="addDialog = false"
                    >
                      Cancel
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-footer>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { db } from "../firebase.js";
import TextBox from "../components/blobs/Text-Box.vue";
import MiniChar from "../components/MiniChar.vue";
import CharSheet from "../components/CharSheet.vue";

export default {
  components: { MiniChar, CharSheet, TextBox },
  data() {
    return {
      partyId: this.$route.params.id,
      chars: [],
      newFriendId: "",
      error: "",
      adding: false,
      addDialog: false,
      partyMemberId: "",
      partyMemberShow: false,
    };
  },
  firestore() {
    return {
      chars: db.collection("parties").doc(this.partyId).collection("chars"),
    };
  },
  methods: {
    newFriend() {
      this.newFriendId = "";
      this.error = "";
      this.adding = false;
      this.addDialog = true;
    },
    addFriend() {
      this.adding = true;
      const docRef = db.collection("characters").doc(this.newFriendId);
      docRef.get().then((data) => {
        if (data.exists) {
          db.collection("parties")
            .doc(this.partyId)
            .collection("chars")
            .add({ ref: docRef });
          this.addDialog = false;
        } else {
          this.error = "This Character ID does not exist";
          this.adding = false;
        }
      });
    },
    delPartyMember(id) {
      db.collection("parties")
        .doc(this.partyId)
        .collection("chars")
        .doc(id)
        .delete();
    },
  },
  computed: {
    initials() {
      if (this.char.name) {
        return this.char.name
          .split(" ")
          .map((n) => n[0])
          .join("");
      } else {
        return "";
      }
    },
  },
};
</script>
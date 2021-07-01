<template>
  <v-main>
    <PartySidebar :charId="fixedId" />
    <CharSheet :charId="fixedId" :edit="true" />
  </v-main>
</template>

<script>
import PartySidebar from "../components/PartySidebar.vue";
import CharSheet from "../components/CharSheet.vue";

export default {
  name: "Char",
  props: {},
  data: function () {
    return {
      fixedId: this.$route.params.id,
    };
  },
  components: {
    PartySidebar,
    CharSheet,
  },
  methods: {},
};
</script>

<style >
.scroll {
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
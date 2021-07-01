<template>
  <v-main>
    <Party :charId="fixedId" />
    <CharSheet :charId="fixedId" :edit="true" />
  </v-main>
</template>

<script>
import Party from "../components/Party.vue";
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
    Party,
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
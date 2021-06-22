import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../firebase'



Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loggedIn: false,
    user: null,
    dark: false,
    chars: []
  },
  mutations: {
    loginUser(state, user) {
      Vue.set(state, "user", user);
      Vue.set(state, "loggedIn", true);
    },
    logout(state) {
      Vue.set(state, "user", null);
      Vue.set(state, "loggedIn", false);
    },
    ...vuexfireMutations
  },
  getters: {
    user: state => state.user,
    chars: state => state.chars,
  },
  actions: {
    bindChars: firestoreAction(({ state, bindFirestoreRef }) => {
      console.log(state.user)
      return bindFirestoreRef('chars', db.collection('characters').where("owner", "==", state.user.uid))
    }),
    unbindChars: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('chars')
    })
  }
});
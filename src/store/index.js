import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: "Simon Kotov",
        phone: "+7 999 803 22 39",
        extra: [{ key: "Email", value: "simon.kotov.web@gmail.com" }],
      },
    ],
  },
  getters: {
    // This is property
    contactList: (state) => {
      return state.contacts;
    },
    // This is a function
    getContact: (state) => {
      return (index) => state.contacts[index];
    },
  },
  mutations: {
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    deleteContact(state, index) {
      state.contacts.splice(index, 1);
    },
    updateContact(state, { contact, index }) {
      state.contacts.splice(index, 1, contact);
    },
  },
  // contains business logic. If i want to show confirm before manipulating state, I can do it here.8j
  actions: {
    addContact({ commit }, contact) {
      commit("addContact", contact);
    },
    deleteContact({ commit }, index) {
      commit("deleteContact", index);
    },
    updateContact({ commit }, { contact, index }) {
      commit("updateContact", { contact, index });
    },
  },
  modules: {},
});

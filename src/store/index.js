import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: "Simon Kotov",
        phone: "+7 999 803 22 39",
        extra: [
          { key: "email", value: "@gmail" },
          { key: "mail", value: "@mail" },
        ],
      },
    ],
  },
  getters: {
    contactList: (state) => {
      return state.contacts;
    },
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

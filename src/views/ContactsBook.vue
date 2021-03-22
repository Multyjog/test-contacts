<template>
  <div class="background">
    <div class="logo"><h2>Contacts Book for TR Logic LLC</h2></div>
    <div class="container">
      <input v-model="name" placeholder="Name" />
      <input v-model="phone" placeholder="Phone Numer" />
      <input type="submit" @click="addContact" value="Add Contact" />
      <div
        v-for="(contact, index) in contacts"
        :key="index"
        class="contact row"
      >
        <router-link
          :to="{ name: 'Details', params: { id: index } }"
          class="col-sm-8"
        >
          <span>{{ contact.name }}</span>
          <span>{{ contact.phone }}</span>
        </router-link>
        <div class="col-sm-4">
          <button class="btn btn-danger" @click="deleteContact(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="emptyBook" v-if="contacts.length === 0">
      You dont have any contacts yet. Let's add them
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsBook",
  data: () => {
    return {
      name: "",
      phone: "",
    };
  },
  methods: {
    deleteContact(index) {
      if (!confirm("Are you sure?")) return;
      this.$store.dispatch("deleteContact", index);
    },
    addContact() {
      let contact = { name: this.name, phone: this.phone, extra: [] };
      this.$store.dispatch("addContact", contact);
      this.name = "";
      this.phone = "";
    },
  },
  computed: {
    contacts: function () {
      return this.$store.getters.contactList;
    },
  },
};
</script>

<style scoped>
.logo {
  margin-top: 3rem;
}
.container input {
  margin: 1% 1%;
}
.hide {
  display: none;
}
.confirm {
  margin-top: 2rem;
}
.confirm button {
  margin: 0 1%;
}
.emptyBook {
  margin-top: 3rem;
}

.contact {
  margin-top: 3rem;
  cursor: pointer;
}
.contact span {
  margin: 0 5%;
}
</style>

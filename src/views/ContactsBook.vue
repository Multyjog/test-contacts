<template>
  <div class="background">
    <div class="logo"><h2>Contacts Book for TR Logic LLC</h2></div>
    <div class="container">
      <input id="name" placeholder="Name" />
      <input id="phone" placeholder="Phone Numer" />
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
          <button class="deleteButton" @click="deleteContact(index)">
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
  methods: {
    deleteContact(index) {
      if (!confirm("Are you sure?")) return;
      this.$store.dispatch("deleteContact", index);
    },
    addContact() {
      let contactName = document.querySelector("#name").value;
      let contactPhone = document.querySelector("#phone").value;
      let contact = { name: contactName, phone: contactPhone, extra: [] };
      this.$store.dispatch("addContact", contact);
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
.deleteButton {
  background-image: linear-gradient(
    to right,
    #434344 0%,
    #979526 51%,
    #434344 100%
  );
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  margin: 0 auto;
  width: 30%;
}
.deleteButton:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>

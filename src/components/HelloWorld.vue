<template>
  <div>
    <div class="navbar"><h2>Contacts Book for TR Logic LLC</h2></div>
    <div class="container">
      <input id="name" placeholder="Name" />
      <input id="phone" placeholder="Phone Numer" />
      <input type="submit" @click="saveNewContact" value="Add Contact" />
    </div>
    <div class="emptyBook" v-if="contacts.length === 0">
      You dont have any contacts yet. Let's add them
    </div>
    <div v-for="(contact, index) in contacts" :key="index">
      <div class="row">
        <h3 class="col-sm-6">{{ contact.name }}</h3>
        <h3 class="col-sm-6">{{ contact.phone }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => {
    return {
      contacts: [],
    };
  },
  methods: {
    saveNewContact: function () {
      let contactName = document.querySelector("#name").value;
      let contactPhone = document.querySelector("#phone").value;
      let listEl = { name: contactName, phone: contactPhone };
      this.contacts.push(listEl);
      this.saveToLocal(this.contacts);
    },
    saveToLocal(obj) {
      localStorage.setItem("contacts", JSON.stringify(obj));
    },
  },
  mounted() {
    if (!localStorage.getItem("contacts")) this.contacts = [];
    else {
      let storedContacts = localStorage.getItem("contacts");
      this.contacts = ("storedContacts: ", JSON.parse(storedContacts));
    }
  },
};
</script>

<style scoped>
.emptyBook {
  margin-top: 3rem;
}
</style>

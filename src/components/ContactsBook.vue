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
    <div class="confirm" v-if="isMenuVisible">
      <p>Are you sure!?</p>
      <button id="yes" @click="confirmDelete">Yes</button>
      <button id="no" @click="hideConfirm">No</button>
    </div>
    <div v-for="(contact, index) in contacts" :key="index">
      <div class="contact">
        <span>{{ contact.name }}</span>
        <span>{{ contact.phone }}</span>
        <button class="deleteButton" @click="showConfirm(index)">Delete</button>
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
      indexToRemove: null,
      isMenuVisible: false,
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
    showConfirm(i) {
      this.isMenuVisible = true;
      this.indexToRemove = i;
    },
    hideConfirm() {
      this.isMenuVisible = false;
    },
    confirmDelete() {
      let i = this.indexToRemove;
      let newContacts = [...this.contacts];
      newContacts.splice(i, 1);
      this.contacts = newContacts;
      this.hideConfirm();
      this.saveToLocal(this.contacts);
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
}
.contact span {
  margin: 0 5%;
}
.deleteButton {
  background-image: linear-gradient(
    to right,
    #314755 0%,
    #26a0da 51%,
    #314755 100%
  );
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
}
.deleteButton:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>

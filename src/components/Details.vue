<template>
  <div>
    <router-link to="/">Back To Contacts</router-link>
    <div class="info">
      <div class="photo"><img src="../assets/placeholder.png" alt="" /></div>
      <div class="name">
        <h1>{{ contact.name }}</h1>
      </div>
      <div class="phone">
        <h1>{{ contact.phone }}</h1>
      </div>
      <div class="extra" v-if="contact.misc">
        <h1 v-for="miscItem in contact.misc" :key="miscItem">
          {{ Object.keys(miscItem)[0] }} :
          {{ miscItem[Object.keys(miscItem)[0]] }}
        </h1>
      </div>
    </div>
    <div class="inputs">
      <input id="key" placeholder="Type" />
      <input id="value" placeholder="Value" />
      <input type="submit" @click="addNewInfo" value="Add New Info" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data: () => {
    return {
      contact: {},
      contactId: 0,
    };
  },
  methods: {
    addNewInfo() {
      if (!this.contact.misc) {
        this.contact = { ...this.contact, misc: [] };
      }
      let infoType = document.querySelector("#key").value;
      let infoValue = document.querySelector("#value").value;
      this.contact.misc.push({ [infoType]: infoValue });
    },
  },
  mounted() {
    this.contactId = this.$route.params.id;
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    this.contact = contacts[this.contactId];
  },
};
</script>

<style scoped>
a {
  background-color: chocolate;
  font-weight: bolder;
  color: white;
  border-radius: 0 0 10px 10px;
}
input {
  margin: 5% 1%;
}
.photo {
  margin: 5% auto;
}
</style>

<template>
  <div>
    <router-link to="/">Back To Contacts</router-link>
    <div class="info">
      <div class="photo"><img src="../assets/placeholder.png" alt="" /></div>
      <button class="btn btn-danger" @click="deleteContact">
        Delete Contact
      </button>
      <button
        class="btn btn-primary"
        @click="saveContact"
        :disabled="!newExtra"
      >
        Save
      </button>
      <div class="name">
        <h1>{{ contact.name }}</h1>
      </div>
      <div class="phone">
        <h1>{{ contact.phone }}</h1>
      </div>
      <div class="extra" v-if="contactExtra">
        <h1 v-for="(extraEntry, index) in contactExtra" :key="index">
          {{ extraEntry.key }} :
          <InputWithEdit
            :value="extraEntry.value"
            @change="(value) => updateExtraEntry(index, value)"
          />
          <button
            class="btn btn-danger ml-2"
            @click="deleteExtraEntryWithConfirm(index)"
          >
            X
          </button>
        </h1>
      </div>
    </div>
    <div class="inputs">
      <input v-model="newExtraKey" placeholder="Type" />
      <button @click="addExtraEntry">Add New Field</button>
    </div>
  </div>
</template>

<script>
import InputWithEdit from "@/components/InputWithEdit.vue";
export default {
  name: "Details",
  components: {
    InputWithEdit,
  },
  data: () => {
    return {
      newExtraKey: "",
      newExtra: null,
      previousExtraState: [],
    };
  },
  methods: {
    saveActualExtraState() {},
    saveContact() {
      const contact = { ...this.contact, extra: this.contactExtra };
      this.$store.dispatch("updateContact", {
        contact,
        index: this.contactIndex,
      });
      this.$router.push("/");
    },
    deleteContact() {
      if (!confirm("Are you sure?")) return;
      this.$store.dispatch("deleteContact", this.contactIndex);
      this.$router.push("/");
    },
    addExtraEntry() {
      if (this.newExtraKey === "") return;
      if (!this.newExtra) this.newExtra = [...this.contactExtra];
      this.newExtra.push({ key: this.newExtraKey, value: "" });
      this.newExtraKey = "";
    },
    updateExtraEntry(index, value) {
      if (!this.newExtra) this.newExtra = [...this.contactExtra];
      this.newExtra[index].value = value;
    },
    deleteExtraEntryWithConfirm(index) {
      if (!confirm("Really?")) return;
      this.deleteExtraEntry(index);
    },
    deleteExtraEntry(index) {
      if (!this.newExtra) this.newExtra = [...this.contactExtra];
      this.newExtra.splice(index, 1);
    },
  },
  computed: {
    contactIndex: function () {
      return this.$route.params.id;
    },
    contact: function () {
      return this.$store.getters.getContact(this.contactIndex);
    },
    contactExtra: function () {
      if (this.newExtra) return this.newExtra;
      return this.contact.extra;
    },
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
  margin: 1% 1%;
}
.photo {
  margin: 1% auto 0 auto;
}
</style>

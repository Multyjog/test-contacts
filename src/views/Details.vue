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
        :disabled="!hasChanges"
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
        <div
          class="extraItem"
          v-for="(extraEntry, index) in contactExtra"
          :key="index"
        >
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
        </div>
      </div>
    </div>
    <div class="inputs">
      <input v-model="newExtraKey" placeholder="Type" />
      <button @click="addExtraEntry">Add New Field</button>
      <button v-if="hasChanges" @click="undoLastAction">
        Undo last action
      </button>
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
      extraStates: [],
    };
  },
  methods: {
    saveToLastExtraState() {
      this.extraStates.push(this.getExtraCopy());
      console.log(this.extraStates);
    },
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
      this.saveToLastExtraState();
      this.contactExtra.push({ key: this.newExtraKey, value: "" });
      this.newExtraKey = "";
    },
    updateExtraEntry(index, value) {
      this.saveToLastExtraState();
      this.contactExtra[index].value = value;
    },
    deleteExtraEntryWithConfirm(index) {
      if (!confirm("Really?")) return;
      this.deleteExtraEntry(index);
    },
    deleteExtraEntry(index) {
      this.saveToLastExtraState();
      this.contactExtra.splice(index, 1);
    },
    getExtraCopy() {
      return this.contactExtra.map((x) => ({ ...x }));
    },
    undoLastAction() {
      if (!this.extraStates.length) return;
      this.extraStates.pop();
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
      if (this.extraStates.length)
        return this.extraStates[this.extraStates.length - 1];
      return this.contact.extra;
    },
    hasChanges: function () {
      return this.extraStates.length > 0;
    },
  },
};
</script>

<style scoped>
.extraItem {
  font-size: 24px;
  width: 51%;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}
a {
  background-color: chocolate;
  font-weight: bolder;
  color: white;
  border-radius: 0 0 10px 10px;
}
input {
  margin: 1% 1%;
}
.inputs {
  margin-bottom: 3rem;
}
.photo {
  margin: 1% auto 0 auto;
}
button {
  margin: 1rem;
}
</style>

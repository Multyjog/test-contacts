<template>
  <div>
    <div v-if="!isEditing">
      <span>{{ currentValue }}</span>
      <button @click="enableEdit">Edit</button>
    </div>
    <div v-else>
      <input type="text" v-model="currentValue" />
      <button @click="saveValue">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWithEdit",
  data: () => {
    return {
      isEditing: false,
      currentValue: "",
    };
  },
  methods: {
    enableEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.currentValue = this.value;
    },
    saveValue() {
      this.$emit("change", this.currentValue);
      this.isEditing = false;
    },
  },
  props: { value: String },
  mounted() {
    this.currentValue = this.value;
  },
  watch: {
    value: function (newVal) {
      this.currentValue = newVal;
    },
  },
};
</script>

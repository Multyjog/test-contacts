<template>
  <div>
    <router-link to="/">Contacts</router-link>
    <div class="info">
      <div class="photo"><img src="../assets/placeholder.png" alt="" /></div>
      <div class="name"><h1>{{}}</h1></div>
      <div class="phone"><h1>{{}}</h1></div>
    </div>
    <div class="inputs">
      <input id="key" placeholder="Type" />
      <input id="value" placeholder="Value" />
      <input type="submit" value="Add New Info" />
    </div>
  </div>
</template>

<style scoped>
input {
  margin: 5% 1%;
}
.photo {
  margin: 5% auto;
}
</style>

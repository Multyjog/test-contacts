<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-image: url("assets/background.jpeg");
  background-repeat: no-repeat;
  background-position: top;
  font-weight: bolder;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #2c3e50;
  padding: 10px;
}
a:hover {
  background-color: rgba(0, 0, 0, 0.075);
  text-decoration: none;
  color: #2c3e50;
}
</style>

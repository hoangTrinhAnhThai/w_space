<template>
  <v-app>
    <v-main class="app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style src="./assets/modifyVuetify.css"></style>
<style scoped>
.v-main {
  overflow: hidden;
}
</style>

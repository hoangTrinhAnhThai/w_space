<template>
  <v-app>
    <page-loader v-bind:isloaded="isLoading" />
    <v-main class="app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import PageLoader from './components/PageLoader.vue';
export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isLoading: 'ERROR/isLoading',
    }),
  },
  components: {
    PageLoader,
  },
};
</script>
<style src="./assets/modifyVuetify.css"></style>

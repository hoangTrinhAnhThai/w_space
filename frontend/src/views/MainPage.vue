<template>
  <div class="main-page">
    <sidebar />
    <div class="content">
      <Nav class="nav" />
      <router-view class="main-container" />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Nav from '../components/Navigation.vue';
import { mapActions } from 'vuex';
export default {
  name: 'MainPage',
  components: {
    Sidebar,
    Nav,
  },
  methods: {
    ...mapActions({
      getProject: 'TASKS/getProject',
      getStatus: 'TASKS/getStatus',
      getAllRooms: 'CHAT/getAllRooms',
      getUserByToken: 'AUTH/getUserByToken',
    }),
  },
  created() {
    this.getUserByToken();
    this.getProject();
    this.getAllRooms();
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  height: 100vh;
  .sidebar {
    width: 15vw;
    min-width: 220px;
  }
  .nav {
    height: 7vh;
    min-height: 60px;
  }
  .main-container {
    width: 83vw;
  }
}
</style>

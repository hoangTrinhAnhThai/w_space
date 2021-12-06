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
    // width: 100%;
    // width: 15vw;
    // min-width: 14em;
  }
  .content {
    width: 99% !important;
  }
  .nav {
    height: 73px;
    width: 100% !important;
  }
  .main-container {
    // width: 84vw !important;

  }
}
</style>

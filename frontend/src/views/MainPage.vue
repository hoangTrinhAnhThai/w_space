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
    }),
  },
  created() {
    this.getProject();
    this.getAllRooms();
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  .sidebar {
    width: 15vw;
    min-width: 220px;
    // position: fixed;
  }
  .nav {
    height: 7vh;
    min-height: 60px;
  }
  .main-container {
    width: 83vw;
    height: 93vh;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
}
</style>

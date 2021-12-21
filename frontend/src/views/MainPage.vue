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
      getAllNotification: 'NOTIFICATION/getAllNotification',
    }),
  },
  created() {
    this.getUserByToken();
    this.getProject();
    this.getAllRooms();
    this.getAllNotification();
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  height: 100vh;
  .content {
    width: 99% !important;
  }
}
.main-container {
  background-image: linear-gradient(
    rgba(161, 161, 161, 0.2),
    rgba(187, 180, 180, 0.2)
  );
}
</style>

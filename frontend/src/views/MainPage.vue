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
      getProject: 'PROJECT/getProject',
      getStatus: 'PROJECT/getStatus',
      getAllRooms: 'CHAT/getAllRooms',
      getUserByToken: 'AUTH/getUserByToken',
      getAllNotification: 'NOTIFICATION/getAllNotification',
      getBackground: 'PROJECT/getBackground'
    }),
  },
  created() {
    this.getUserByToken();
    this.getProject();
    this.getAllRooms();
    this.getAllNotification();
    this.getBackground()
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  .content {
    width: 97% !important;
  }
}
.main-container {
  background-color: rgb(247, 248, 251);
}
.nav {
  transform: translateY(0px);
  color: rgb(21, 17, 30) !important;
  border: none !important;
  position: relative;
}
</style>

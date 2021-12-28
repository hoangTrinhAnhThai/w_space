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
import Sidebar from "../components/Sidebar.vue";
import Nav from "../components/Navigation.vue";
import { mapActions } from "vuex";
export default {
  name: "MainPage",
  components: {
    Sidebar,
    Nav,
  },
  methods: {
    ...mapActions({
      getProject: "TASKS/getProject",
      getStatus: "TASKS/getStatus",
      getAllRooms: "CHAT/getAllRooms",
      getUserByToken: "AUTH/getUserByToken",
      getAllNotification: "NOTIFICATION/getAllNotification",
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
  .content {
    width: 97% !important;
  }
}
.main-container {
  background-image: linear-gradient(
    rgba(161, 161, 161, 0.2),
    rgba(187, 180, 180, 0.2)
  );
}
.nav {
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  transform: translateY(0px);
  color: rgb(39, 102, 120) !important;
  border: none !important;
  position: relative;
}
</style>

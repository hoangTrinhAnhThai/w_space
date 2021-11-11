<template>
  <div class="main-page">
    <sidebar />
    <div class="content">
      <Nav />
      <router-view class="main-container" />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Nav from '../components/Navigation.vue';
export default {
  name: 'MainPage',
  components: {
    Sidebar,
    Nav,
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  .sidebar {
    width: 16vw;
    float: left;
  }
  .main-container {
    max-width: 83vw;
    // overflow: scroll;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
}
</style>

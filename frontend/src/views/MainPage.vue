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
import { mapActions } from 'vuex';
export default {
  name: 'MainPage',
  components: {
    Sidebar,
    Nav,
  },
  methods: {
    ...mapActions({
      getProject: "TASKS/getProject",
      getStatus: "TASKS/getStatus"
    })
  },
  created() {
    this.getProject()
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  .sidebar {
    width: 15vw;
  }
  .main-container {
    width: 85vw;
    // overflow-x: auto;
    // overflow-y: hidden;
    // white-space: nowrap;
  }
}
</style>

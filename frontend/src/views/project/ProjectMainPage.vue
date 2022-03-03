<template>
  <div class="project-main-page">
    <v-app-bar class="bar1">
      <v-toolbar-title
        ><i class="bx bxl-trello"></i>
        {{ currentProject.name }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        color="blue-grey darken-4"
        icon
        @click.stop="showGroup = !showGroup"
      >
        <v-icon> mdi-home-floor-g</v-icon>
      </v-btn>
    </v-app-bar>
    <v-tabs right>
      <v-tab>By Status</v-tab>
      <v-tab>By tasks</v-tab>
      <v-tab-item>
        <ByStatus />
      </v-tab-item>
      <v-tab-item>
        <ByTasks />
      </v-tab-item>
    </v-tabs>
    <v-navigation-drawer
      bottom
      right
      style="width: 350px"
      v-model="showGroup"
      absolute
    >
      <v-app-bar class="bar-mini">
        <v-toolbar-title>Background</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey darken-4" icon @click.stop="showGroup = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <div class="content">
        <div
          class="content-sub"
          v-for="(img, index) in backgrounds"
          :key="index"
          @click="setBackground(img._id)"
        >
          <span class="bg-title">{{ img.title }}</span>
          <img :src="img.url" alt="" />
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ByStatus from './Roadmap.vue';
import ByTasks from './TaskViewForRoadmap.vue';
export default {
  name: 'ProjectMainPage',
  data() {
    return {
      showGroup: false,
    };
  },
  components: {
    ByStatus,
    ByTasks,
  },
  computed: {
    ...mapGetters({
      currentProject: 'PROJECT/currentProject',
      dataTask: 'TASK/tasksArray',
      userInfo: 'AUTH/userInfo',
      backgrounds: 'PROJECT/backgrounds',
      allChecklist: 'TASK/allChecklist',
    }),
  },
  methods: {
    ...mapActions({
      getTaskOfProjectAction: 'TASK/getTasks',
      addCurrentProjectAction: 'PROJECT/addCurrentProject',
      getStatus: 'TASK/getStatus',
      setBackgroundAction: 'PROJECT/setBackground',
      getAllChecklist: 'TASK/getAllChecklist',
    }),
    setBackground(bg) {
      this.setBackgroundAction({
        idProject: this.currentProject._id,
        idBg: bg,
      });
      this.showGroup = false;
    },
  },
  created() {
    this.getStatus();
    this.addCurrentProjectAction(this.$route.params.id);
    this.getTaskOfProjectAction(this.$route.params.id);
    this.getAllChecklist();
    console.log(this.allChecklist);
  },
  watch: {
    $route(to) {
      this.addCurrentProjectAction(to.params.id);
      this.getTaskOfProjectAction(to.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar1 {
  box-shadow: none !important;
  background-color: rgb(247, 248, 251) !important;
  padding: 0px 20px;
  font-weight: 900;
  background-color: rgba(224, 221, 221, 0.7) !important;
}
.bar-mini {
  box-shadow: none !important;
  background-color: #fff !important;
  border-bottom: 1px solid rgb(216, 202, 202) !important;
  padding: 0px 20px;
  font-weight: 900;
}

.content {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 10px auto;
  img {
    width: 150px;
    height: 100px;
    border-radius: 10px;
    margin: 5px;
  }
  .content-sub {
    position: relative;
  }
  .bg-title {
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: white;
    font-weight: bolder;
    width: 94%;
    background-color: rgba(102, 95, 95, 0.7);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 5px;
    opacity: 0;
    padding-top: 5px;
  }
  .content-sub:hover .bg-title {
    opacity: 1;
  }
  .content-sub:hover img {
    // opacity: 0.8;
  }
}
</style>

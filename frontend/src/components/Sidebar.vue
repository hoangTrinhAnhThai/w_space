<template>
  <div class="sidebar">
    <v-navigation-drawer
      :mini-variant.sync="mini"
      permanent
      style="background-color: rgb(39, 102, 120) !important"
    >
      <v-app-bar
        style="
          background-color: rgb(39, 102, 120) !important;
          box-shadow: none !important;
        "
      >
        <v-toolbar-title style="color: white">W-space</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          style="margin-left: -10px"
          color="deep-purple lighten-5"
          icon
          @click.stop="mini = !mini"
        >
          <v-icon v-if="mini">mdi-home</v-icon>
          <v-icon v-if="!mini">mdi-chevron-left</v-icon>
        </v-btn>
      </v-app-bar>
      <v-divider></v-divider>
      <v-list v-if="userRole == 'Admin'">
        <v-list-group @click="handleClickDashboard">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                ><i class="bx bxs-dashboard" style="font-size: 20px"></i
                >Dashboard</v-list-item-title
              >
            </v-list-item-content>
          </template>
        </v-list-group>
        <v-list-group @click="handleClickUser">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                ><i class="bx bxs-user-account" style="font-size: 20px"></i>User
                management</v-list-item-title
              >
            </v-list-item-content>
          </template>
        </v-list-group>
      </v-list>
      <v-list v-else>
        <v-list-group no-action class="header-project">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title @click="handleClickProject">
                <i style="font-size: 20px" class="bx bxl-trello" />
                Project
              </v-list-item-title> </v-list-item-content
            ><v-list-item-icon>
              <v-btn
                class="add-project"
                text
                @click="showAddProjectModal({}, 'addProject')"
              >
                <i class="bx bx-plus"></i
              ></v-btn>
            </v-list-item-icon>
          </template>
          <v-list-item-group class="pl-10">
            <v-list-item
              v-for="project in projectsOfLeader"
              :key="project._id"
              link
              class="project-item"
            >
              <v-list-item-title @click="handleClickProjectItem(project)"
                ><i class="bx bxs-flag-alt" />
                {{ project.name }}</v-list-item-title
              >
              <v-list-item-icon class="project-function">
                <i
                  @click="showAddProjectModal(project, 'editProject')"
                  class="bx bx-edit-alt"
                ></i>
                <i
                  @click="showAddMemberModal(project)"
                  class="bx bx-user-plus"
                ></i>
                <i @click="deleteProject(project._id)" class="bx bx-trash"></i>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item
              v-for="project in projectsOfMember"
              :key="project._id"
              link
            >
              <v-list-item-title @click="handleClickProjectItem(project)"
                ><i class="bx bxl-trello trello1" />
                {{ project.name }}</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
        <v-list-group @click="handleClickLogtime">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                ><i class="bx bx-timer" style="font-size: 20px"></i
                >Logtime</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item-group class="pl-10"> </v-list-item-group>
        </v-list-group>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-content @click="handleClickChatRoom">
              <v-list-item-title>
                <i
                  style="font-size: 20px"
                  class="bx bx-message-rounded-dots"
                ></i>
                Chatroom</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item-group class="pl-10">
            <v-list-item v-for="(room, index) in rooms" :key="index" sub-group>
              <v-list-item-title @click="handleClickChatRoomItem(room)">
                <i class="bx bx-conversation"></i>{{ room.name }}
                <span
                  v-for="(notification, index) in notifications"
                  :key="index"
                  ><v-badge
                    v-if="
                      notification.room == room._id &&
                      notification.listContent[0].unreadCount < 5
                    "
                    color="red accent-1"
                    :content="notification.listContent[0].unreadCount"
                    :value="notification.listContent[0].unreadCount"
                    style="font-weight: lighter; margin-left: 10px"
                  ></v-badge>
                  <v-badge
                    v-else-if="
                      notification.room == room._id &&
                      notification.listContent[0].unreadCount >= 5
                    "
                    :content="'5+'"
                    color="red accent-1"
                    style="font-weight: lighter; margin-left: 10px"
                  >
                  </v-badge>
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <add-new-project-modal ref="newProjectModal"></add-new-project-modal>
    <add-member-modal ref="addMemberModal" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddNewProjectModal from '../components/modal/AddNewProject.vue';
import AddMemberModal from '../components/modal/AddMember.vue';

export default {
  name: 'Sidebar',
  data: () => ({
    drawer: true,
    mini: true,
  }),
  components: {
    AddNewProjectModal,
    AddMemberModal,
  },
  computed: {
    ...mapGetters({
      projectsOfLeader: 'TASKS/projectsOfLeader',
      projectsOfMember: 'TASKS/projectsOfMember',
      rooms: 'CHAT/rooms',
      notifications: 'NOTIFICATION/notifications',
      userInfo: 'AUTH/userInfo',
      userRole: 'AUTH/userRole',
    }),
  },
  methods: {
    showAddProjectModal(project, typeOfModal) {
      this.addProjectEditAction(project);
      this.$refs.newProjectModal.show(project, typeOfModal);
    },
    showAddMemberModal(project) {
      this.addProjectEditAction(project);
      this.$refs.addMemberModal.show(project);
    },
    ...mapActions({
      getTaskOfProjectAction: 'TASKS/getTaskOfProject',
      addCurrentProjectAction: 'TASKS/addCurrentProject',
      deleteProjectAction: 'TASKS/deleteProject',
      getProject: 'TASKS/getProject',
      addProjectEditAction: 'TASKS/addProjectEdit',
      getStatus: 'TASKS/getStatus',
      getAllChatByIdRoom: 'CHAT/getAllChatByIdRoom',
      addCurrentRoom: 'CHAT/addCurrentRoom',
      removeUnreadNotification: 'NOTIFICATION/removeUnreadNotification',
    }),
    getTaskOfProject(project) {
      this.addCurrentProjectAction(project);
      this.getTaskOfProjectAction(project);
    },
    deleteProject(idProject) {
      this.deleteProjectAction(idProject);
    },
    clearMessage() {
      this.messages = 0;
    },
    handleClickProject() {
      this.$router.push(`/roadmap/`);
    },
    handleClickProjectItem(project) {
      this.$router.push(`/roadmap/${project._id}`);
      this.mini = true;
    },
    handleClickChatRoom() {
      this.$router.push(`/chatroom/`);
    },
    handleClickChatRoomItem(room) {
      this.removeUnreadNotification(room._id);
      this.$router.push(`/chatroom/${room._id}`);
      this.mini = true;
    },
    handleClickLogtime() {
      this.$router.push(`/logtime/`);
      this.mini = true;
    },
    handleClickDashboard() {
      this.$router.push(`/admin/`);
      this.mini = true;
    },
    handleClickUser() {
      this.$router.push(`/usermanagement/`);
      this.mini = true;
    },
    handleClickProjectManagement() {},
  },
  created() {
    this.getProject();
    if (this.$route.name.name === 'Roadmap') {
      this.getStatus();
      this.getTaskOfProject(this.$route.params.id);
    } else if (this.$route.name.name === 'ChatRoom') {
      this.addCurrentRoom(this.$route.params.id);
      this.getAllChatByIdRoom(this.$route.params.id);
    }
  },
  watch: {
    $route(to) {
      if (to.name.name === 'Roadmap') {
        this.getStatus();
        this.getTaskOfProject(to.params.id);
      } else if (to.name.name === 'ChatRoom') {
        this.addCurrentRoom(to.params.id);
        this.getAllChatByIdRoom(to.params.id);
      }
    },
  },
};
</script>
<style>
.mdi-chevron-down::before {
  color: white !important;
}
.sidebar {
  height: 100vh !important;
}
</style>
<style scoped>
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  color: white !important;
}

/* .v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 40px !important;
} */
.theme--light.v-navigation-drawer .v-divider {
  position: relative;
  top: -16px;
  color: wheat;
}
.icon-sub i {
  color: white;
  font-size: 22px;
}
i {
  color: rgb(243, 240, 240);
}
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item:hover {
  background-color: rgb(110, 149, 160);
}
.list-item {
  padding-left: 25px;
}
.list-item:hover,
.v-list-item:hover {
  background-color: rgb(110, 149, 160) !important;
}
.project-function {
  opacity: 0;
}
.project-item:hover .project-function,
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item:hover
  .project-function {
  opacity: 1;
}
.add-project {
  position: absolute;
  top: 0px;
  right: 10;
  opacity: 0;
}
.add-project .v-btn i {
  color: white;
  font-size: 20px;
}
.add-project:hover .v-btn {
  background-color: #407686;
}
i {
  margin-right: 5px;
}
.header-project:hover .add-project {
  opacity: 1;
}
.bx-conversation,
.bxs-flag-alt,
.trello1 {
  padding-left: 20px;
}
.v-application .pl-10 {
  padding: 0 !important;
}
</style>

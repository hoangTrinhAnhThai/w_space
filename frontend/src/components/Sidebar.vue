<template>
  <div class="sidebar">
    <!-- <v-navigation-drawer
      :mini-variant.sync="mini"
      permanent
      style="background-color: rgb(39, 102, 120) !important; color: white"
    >
      <v-btn color="deep-purple lighten-5" icon @click.stop="mini = !mini">
        <v-icon v-if="mini">mdi-home</v-icon>
        <v-icon v-if="!mini">mdi-chevron-left</v-icon>
      </v-btn>
      <template>
        <v-treeview
          v-show="!mini"
          :items="items"
          color="red lighten-5"
          activable
          open-on-click
        >
          <template slot="label" slot-scope="{ item }">
            <div class="item">
              <span style="color: white" @click="changeActive(item)">
                <i
                  class="bx bxs-flag-alt"
                  v-if="
                    item.createdBy &&
                    userInfo._id === item.createdBy._id &&
                    item.room
                  "
                ></i>
                <i
                  class="bx bxl-trello"
                  v-else-if="
                    item.createdBy &&
                    userInfo._id !== item.createdBy._id &&
                    item.room
                  "
                ></i>
                <i
                  v-else-if="
                    item.createdBy && userInfo._id !== item.createdBy._id
                  "
                  class="bx bx-chat"
                ></i>
                {{ item.name }}
                <span
                  v-for="(notification, index) in notifications"
                  :key="index"
                  ><v-badge
                    v-if="notification.room == item._id"
                    color="red accent-1"
                    :content="notification.listContent[0].unreadCount"
                    :value="notification.listContent[0].unreadCount"
                    style="font-weight: lighter; margin-left: 10px"
                  ></v-badge>
                </span>
              </span>
              <div
                class="function"
                v-if="
                  item.createdBy &&
                  userInfo._id === item.createdBy._id &&
                  item.room
                "
              >
                <i
                  @click="showAddProjectModal(item, 'editProject')"
                  class="bx bx-edit-alt"
                ></i>
                <i
                  @click="showAddMemberModal(item)"
                  class="bx bx-user-plus"
                ></i>
                <i @click="deleteProject(item._id)" class="bx bx-trash"></i>
              </div>
              <div class="add-project" v-if="item.id == 1">
                <v-btn text @click="showAddProjectModal({}, 'addProject')">
                  <i class="bx bx-plus"></i
                ></v-btn>
              </div>
            </div>
          </template>
        </v-treeview>
      </template>
    </v-navigation-drawer> -->
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
      <v-list>
        <v-list-group no-action sub-group>
          <template v-slot:activator class="header-project">
            <v-list-item-content>
              <v-list-item-title @click="handleClickProject"
                >Project
              </v-list-item-title>
              <v-spacer></v-spacer> </v-list-item-content
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

          <v-list-item
            v-for="project in projectsOfLeader"
            :key="project._id"
            link
          >
            <v-list-item-title @click="handleClickProjectItem(project)"
              ><i class="bx bxs-flag-alt" />
              {{ project.name }}</v-list-item-title
            >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item
            v-for="project in projectsOfMember"
            :key="project._id"
            link
          >
            <v-list-item-title @click="handleClickProjectItem(project)"
              ><i class="bx bxl-trello" /> {{ project.name }}</v-list-item-title
            >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content @click="handleClickLogtime">
              <v-list-item-title>Logtime</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
        <v-list-group no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content @click="handleClickChatRoom">
              <v-list-item-title>Chatroom</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(room, index) in rooms" :key="index" link>
            <v-list-item-title @click="handleClickChatRoomItem(room)">
              <i class="bx bx-chat"></i>
              {{ room.name }}
              <span v-for="(notification, index) in notifications" :key="index"
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
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <add-new-project-modal ref="newProjectModal"></add-new-project-modal>
    <add-member-modal ref="addMemberModal" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddNewProjectModal from "../components/modal/AddNewProject.vue";
import AddMemberModal from "../components/modal/AddMember.vue";

export default {
  name: "Sidebar",
  data: () => ({
    isShowProject: false,
    isShowChat: false,
    drawer: true,
    mini: false,
  }),
  components: {
    AddNewProjectModal,
    AddMemberModal,
  },
  computed: {
    ...mapGetters({
      projectsOfLeader: "TASKS/projectsOfLeader",
      projectsOfMember: "TASKS/projectsOfMember",
      rooms: "CHAT/rooms",
      notifications: "NOTIFICATION/notifications",
      userInfo: "AUTH/userInfo",
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
      getTaskOfProjectAction: "TASKS/getTaskOfProject",
      addCurrentProjectAction: "TASKS/addCurrentProject",
      deleteProjectAction: "TASKS/deleteProject",
      getProject: "TASKS/getProject",
      addProjectEditAction: "TASKS/addProjectEdit",
      getStatus: "TASKS/getStatus",
      getAllChatByIdRoom: "CHAT/getAllChatByIdRoom",
      addCurrentRoom: "CHAT/addCurrentRoom",
      removeUnreadNotification: "NOTIFICATION/removeUnreadNotification",
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
    },
    handleClickChatRoom() {
      this.$router.push(`/chatroom/`);
    },
    handleClickChatRoomItem(room) {
      this.removeUnreadNotification(room._id);
      this.$router.push(`/chatroom/${room._id}`);
    },
    handleClickLogtime() {
      this.$router.push(`/logtime/`);
    },
  },
  created() {
    this.getProject();
    if (this.$route.name.name === "Roadmap") {
      this.getStatus();
      this.getTaskOfProject(this.$route.params.id);
    } else if (this.$route.name.name === "ChatRoom") {
      this.addCurrentRoom(this.$route.params.id);
      this.getAllChatByIdRoom(this.$route.params.id);
    }
  },
  watch: {
    $route(to) {
      if (to.name.name === "Roadmap") {
        this.getStatus();
        this.getTaskOfProject(to.params.id);
      } else if (to.name.name === "ChatRoom") {
        this.addCurrentRoom(to.params.id);
        this.getAllChatByIdRoom(to.params.id);
      }
    },
  },
};
</script>
<style>
.v-application .primary--text {
  color: white;
}
.v-application--is-ltr
  .v-list-group--no-action.v-list-group--sub-group
  > .v-list-group__items
  > .v-list-item {
  padding-left: 45px !important;
  color: white !important;
}
.v-application--is-ltr .v-list-group--sub-group .v-list-group__header {
  padding-left: 5px !important;
  color: white !important;
}
.mdi-menu-down::before {
  color: white !important;
}
</style>
<style scoped>
.add-project i {
  color: white;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 100% !important;
}

.function {
  position: absolute;
  right: 5px;
  top: 15px;
  display: none;
  color: white;
  font-weight: 100;
  font-size: 16px;
}
.function i {
  margin: 0 2px;
}
.item:hover .function {
  display: block;
}
.add-project {
  position: absolute;
  top: 0;
  right: 0;
}
.add-project {
  display: none;
}
.add-project .v-btn i {
  color: white;
  font-size: 20px;
}
.item:hover .add-project {
  display: block;
}
.add-project:hover .v-btn {
  background-color: #407686;
}
i {
  margin-right: 5px;
}
.header-project:hover i {
  display: block;
}
</style>


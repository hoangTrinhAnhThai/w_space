<template>
  <div class="sidebar">
    <v-navigation-drawer
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
          activatable
          open-on-click
          return-object
        >
          <template  slot="label" slot-scope="{ item }">
            <div class="item">
              <!-- {{ Object.keys(item).length === 0 }} -->
              <span style="color: white" @click="openDialog(item)">
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
    items() {
      const items = [
        {
          id: 1,
          name: "Project :",
          children: this.projectsOfLeader.concat(this.projectsOfMember),
        },
        {
          id: 2,
          name: "Logtime",
        },
        {
          id: 3,
          name: "Chat :",
          children: this.rooms,
        },
      ];
      return items;
    },
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
    openDialog(item) {
      if (item.id === 1 && typeof this.$route.params.id == "undefined") {
        return;
      } else if (
        item.id === 1 &&
        typeof this.$route.params.id !== "undefined"
      ) {
        this.$router.push(`/roadmap/${this.projectsOfLeader[0]._id}`);
      } else if (item.id === 2) {
        this.$router.push("/logtime");
      } else if (item.id === 3 && typeof this.$route.params.id == "undefined") {
        return;
      } else if (
        item.id === 3 &&
        typeof this.$route.params.id !== "undefined"
      ) {
        this.$router.push(`/chatroom/${this.rooms[0]._id}`);
      } else if (this.$route.params.id == item._id) {
        return;
      } else if (item.room && this.$route.params.id != item._id) {
        this.$router.push(`/roadmap/${item._id}`);
      } else if (this.$route.params.id != item._id) {
        this.removeUnreadNotification(item._id);
        this.$router.push(`/chatroom/${item._id}`);
      } else {
        return;
      }
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
.active {
  /* height: 0; */
  display: none;
background-color: red;
}
.mdi-menu-down::before {
  color: white !important;
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
</style>

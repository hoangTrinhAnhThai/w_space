<template>
  <div class="sidebar">
    <!-- <v-navigation-drawer
      :mini-variant.sync="mini"
      permanent
      style="background-color: rgb(39, 102, 120) !important"
    >
      <v-btn color="deep-purple lighten-5" icon @click.stop="mini = !mini">
        <v-icon v-if="mini">mdi-home</v-icon>
        <v-icon v-if="!mini">mdi-chevron-left</v-icon>
      </v-btn>
      <div class="workspace" v-show="!mini">
        <div class="container">
          <p class="label">W-space</p>
          <ul>
            <li>
              <span @click="isShowProject = !isShowProject">
                <i v-show="!isShowProject" class="bx bxs-right-arrow"></i>
                <i
                  @click="isShowProject = !isShowProject"
                  class="bx bxs-down-arrow"
                  v-show="isShowProject"
                ></i>

                <router-link
                  v-if="projectsOfLeader.length > 0"
                  id="roadmap-header"
                  tag="li"
                  :to="`/roadmap/${projectsOfLeader[0]._id}`"
                >
                  Project</router-link
                >
                <router-link
                  v-else
                  id="roadmap-header"
                  tag="li"
                  :to="`/roadmap`"
                >
                  Project</router-link
                >
              </span>
              <i
                class="bx bx-plus"
                @click="showAddProjectModal({}, 'addProject')"
              ></i>
              <ul v-show="isShowProject" class="list-child">
                <li v-for="project in projectsOfLeader" :key="project._id">
                  <router-link tag="li" :to="`/roadmap/${project._id}`">
                    <i class='bx bxs-flag-alt'></i>
                    {{ project.name }}</router-link
                  >
                  <div class="function">
                    <i
                      @click="showAddProjectModal(project, 'editProject')"
                      class="bx bx-edit-alt"
                    ></i>
                    <i
                      @click="showAddMemberModal(project)"
                      class="bx bx-user-plus"
                    ></i>
                    <i
                      @click="deleteProject(project._id)"
                      class="bx bx-trash"
                    ></i>
                  </div>
                </li>
                <li v-for="project in projectsOfMember" :key="project._id">
                  <router-link tag="li" :to="`/roadmap/${project._id}`">
                    <i class="bx bxl-trello"></i>
                    {{ project.name }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li>
              <i class="bx bxs-right-arrow"></i>
              <router-link tag="li" to="/logtime">Logtime</router-link>
            </li>
            <li>
              <span @click="isShowChat = !isShowChat">
                <i v-show="!isShowChat" class="bx bxs-right-arrow"></i>
                <i
                  @click="isShowChat = !isShowChat"
                  class="bx bxs-down-arrow"
                  v-show="isShowChat"
                ></i>
                <router-link
                  id="chat-header"
                  v-if="rooms && rooms.length > 0"
                  tag="li"
                  :to="`/chatroom/${rooms[0]._id}`"
                  >ChatRoom</router-link
                >
                <router-link id="chat-header" v-else tag="li" :to="`/chatroom`"
                  >ChatRoom</router-link
                >
              </span>
              <i
                class="bx bx-plus"
                @click="showAddProjectModal({}, 'addProject')"
              ></i>
              <ul v-show="isShowChat" class="list-child">
                <li
                  @click="clearMessage"
                  v-for="(room, index) in rooms"
                  :key="index"
                >
                  <router-link tag="li" :to="`/chatroom/${room._id}`"  v-for="(notification, index) in notifications" :key="index">
                    <v-badge
                      v-if="notification.room == room._id"
                      color="red accent-1"
                      inline
                      :content="(notification.listContent[0].unreadCount)"
                      :value="(notification.listContent[0].unreadCount)"
                      style="font-weight: lighter"
                    >
                      <i class="bx bx-chat"></i>{{ room.name }}
                    </v-badge>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </v-navigation-drawer> -->
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
          <template slot="label" slot-scope="{ item }">
            <div class="item">
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
      console.log(this.userInfo._id);
      console.log(item);
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
      } else if (item.room) {
        this.$router.push(`/roadmap/${item._id}`);
      } else {
        this.$router.push(`/chatroom/${item._id}`);
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
</style>
<style lang="scss" scoped>
@import "../assets/style.scss";
.sidebar {
  background-color: rgb(39, 102, 120) !important;
  // color: white !important;
  height: 100vh;
}
//   .workspace {
//     line-height: 30px;
//     min-width: 14em;
//     .container {
//       padding: 20px 15px;
//       .label {
//         text-transform: uppercase;
//         padding: 0;
//         margin: 0;
//       }
//       ul {
//         display: flex;
//         flex-direction: column;
//         padding: 0 10px;
//         cursor: pointer;
//         list-style: none;
//         li {
//           #roadmap-header,
//           #chat-header {
//             font-weight: normal;
//             background-color: none;
//           }
//           display: inline-block;
//           position: relative;
//           .list-child {
//             list-style: square;
//             position: relative;
//             left: 5px;
//             -webkit-transition: height 0.3s ease-in;
//             -moz-transition: height 0.3s ease-in;
//             -o-transition: height 0.3s ease-in;
//             -ms-transition: height 0.3s ease-in;
//             transition: height 0.3s ease-in;
//             li:hover {
//               .function {
//                 display: block;
//               }
//             }
//             li {
//               -webkit-transition: background-color 0.3s ease;
//               -moz-transition: background-color 0.3s ease;
//               -o-transition: background-color 0.3s ease;
//               -ms-transition: background-color 0.3s ease;
//               transition: background-color 0.3s ease;
//               .nameProject {
//                 display: inline-block;
//                 width: 100px;
//                 white-space: nowrap;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//               }
//               .function {
//                 position: absolute;
//                 right: -20px;
//                 top: 0;
//                 display: none;
//               }
//             }
//           }
//           .bx-plus {
//             position: absolute;
//             top: 7px;
//             right: 0;
//             border: 1px solid rgb(194, 190, 190);
//             border-radius: 3px;
//             display: none;
//           }
//         }
//         li:hover .bx-plus {
//           display: inline;
//         }
//         i {
//           margin-right: 0.5em;
//           color: rgb(167, 164, 164);
//         }
//       }
//     }
//   }
// }
// .router-link-exact-active {
//   font-weight: 700;
//   font-style: italic;
//   // color: rgb(39, 102, 120);
// }
</style>

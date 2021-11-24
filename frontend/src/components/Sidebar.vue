<template>
  <div class="sidebar">
    <div class="workspace">
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
              <router-link tag="li" to="/roadmap">Project</router-link>
            </span>
            <i class="bx bx-plus" @click="showAddProjectModal({}, 'addProject')"></i>
            <ul v-show="isShowProject" class="list-child">
              <li v-for="project in projects" :key="project._id">
                <span class="nameProject" @click="getTaskOfProject(project)"
                  ><i class="bx bx-chevron-right"></i>
                  <span id="name">{{ project.name }}</span></span
                >

                <div class="function">
                  <i
                    @click="showAddProjectModal(project, 'editProject')"
                    class="bx bx-edit-alt"
                  ></i>
                  <i  @click="showAddMemberModal(project)" class='bx bx-user-plus'></i>
                  <i
                    @click="deleteProject(project._id)"
                    class="bx bx-trash"
                  ></i>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <i class="bx bxs-right-arrow"></i>
            <router-link tag="li" to="/logtime">Logtime</router-link>
          </li>
          <li>
            <i class="bx bxs-right-arrow"></i
            ><router-link tag="li" to="/chatroom">Chat</router-link>
          </li>
        </ul>
      </div>
    </div>
    <add-new-project-modal
      ref="newProjectModal"
    ></add-new-project-modal>
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
  }),
  components: {
    AddNewProjectModal,
    AddMemberModal
  },
  computed: {
    ...mapGetters({
      projects: "TASKS/projectArray",
    }),
  },
  methods: {
    showAddProjectModal(project, typeOfModal) {
      this.addProjectEditAction(project)

      this.$refs.newProjectModal.show(project, typeOfModal);
    },
    showAddMemberModal(project) {
      this.addProjectEditAction(project)

      this.$refs.addMemberModal.show(project);
      
    },
    ...mapActions({
      getTaskOfProjectAction: "TASKS/getTaskOfProject",
      addCurrentProjectAction: "TASKS/addCurrentProject",
      deleteProjectAction: "TASKS/deleteProject",
      addProjectEditAction: "TASKS/addProjectEdit"
    }),
    getTaskOfProject(project) {
      this.addCurrentProjectAction(project);
      this.getTaskOfProjectAction(project._id);
    },
    deleteProject(idProject) {
      this.deleteProjectAction(idProject);
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  background-color: rgb(250, 250, 250);
  height: 100vh;
  color: rgb(121, 121, 119);
  .workspace {
    line-height: 30px;
    .container {
      padding: 20px 15px;
      .label {
        color: grey;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
      }
      ul {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        cursor: pointer;
        list-style: none;
        li {
          display: inline-block;
          position: relative;
          .list-child {
            list-style: square;
            position: relative;
            left: 5px;
            li:hover {
              .function {
                display: block;
              }
            }
            li {
              .nameProject {
                display: inline-block;
                width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .function {
                position: absolute;
                right: -20px;
                top: 0;
                display: none;
              }
            }
          }
          .bx-plus {
            position: absolute;
            top: 7px;
            right: 0;
            border: 1px solid rgb(194, 190, 190);
            border-radius: 3px;
            display: none;
          }
        }
        li:hover .bx-plus {
          display: inline;
        }
        i {
          margin-right: 0.5em;
          color: rgb(158, 158, 156);
        }
      }
    }
  }
}
</style>

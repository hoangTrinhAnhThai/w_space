<template>
  <div class="sidebar">
    <div class="workspace">
      <div class="container">
        <p class="label">W-space</p>
        <ul>
          <li>
            <i
              @click="isShowProject = !isShowProject"
              v-show="!isShowProject"
              class="bx bxs-right-arrow"
            ></i>
            <i
              @click="isShowProject = !isShowProject"
              class="bx bxs-down-arrow"
              v-show="isShowProject"
            ></i>
            <router-link tag="li" to="/roadmap">Project</router-link>
            <i class="bx bx-plus" @click="showAddProjectModal"></i>
            <ul v-show="isShowProject" class="list-child">
              <li v-for="project in projects" :key="project._id" @click="getTaskOfProject(project._id)">
                <i class="bx bx-chevron-right"></i> {{ project.name }}
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
    <add-new-project-modal ref="newProjectModal"></add-new-project-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddNewProjectModal from '../components/modal/AddNewProject.vue';
export default {
  name: 'Sidebar',
  data: () => ({
    isShowProject: false,
  }),
  components: {
    AddNewProjectModal,
  },
  computed: {
    ...mapGetters({
      projects: "TASKS/projectArray"
    })
  },
  methods: {
    showAddProjectModal() {
      this.$refs.newProjectModal.show();
    },
    ...mapActions({
      getTaskOfProjectAction: 'TASKS/getTaskOfProject',
      addIdProjectAction: 'TASKS/addIdProject'
    }),
    getTaskOfProject(idProject) {
      this.addIdProjectAction(idProject)
      this.getTaskOfProjectAction(idProject)
      
    }
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  background-color: rgb(247, 246, 243);
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

<template>
  <v-main>
    <v-container>
      <v-label>
        <img
          src="https://www.permacultureconsultants.com/wp-content/uploads/2020/01/service-permaculture-assesment-report.png"
          alt=""
        />
      </v-label>
      <h5 @click="showAddProjectModal({}, 'addProject')">
        <i class="bx bx-plus-circle"></i> Create new project
      </h5>
      <v-item-group mandatory>
        <v-row v-if="projectsOfLeader.length > 0">
          <h2>Leader</h2>
          <v-col
            v-for="(project, index) in projectsOfLeader"
            :key="index"
            cols="3"
            md="4"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                height="100"
                width="400px"
                @click="handleClickProject(project._id)"
              >
                <v-card-title>{{ project.name }}</v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row v-if="projectsOfMember.length > 0" style="margin-top: 50px">
          <h2>Group</h2>
          <v-col
            v-for="(project, index) in projectsOfMember"
            :key="index"
            cols="3"
            md="4"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                height="100"
                width="400px"
                @click="handleClickProject(project._id)"
              >
                <v-card-title>{{ project.name }}</v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <add-new-project-modal ref="newProjectModal"></add-new-project-modal>
  </v-main>
</template>

<script>
import AddNewProjectModal from '../../components/modal/AddNewProject.vue';

import { mapGetters } from 'vuex';
export default {
  name: 'ProjectPage',
  computed: {
    ...mapGetters({
      projectsOfLeader: 'PROJECT/projectsOfLeader',
      projectsOfMember: 'PROJECT/projectsOfMember',
    }),
  },
  methods: {
    handleClickProject(idProject) {
      this.$router.push(`/roadmap/${idProject}`);
    },
    showAddProjectModal(project, typeOfModal) {
      this.$refs.newProjectModal.show(project, typeOfModal);
    },
  },
  components: {
    AddNewProjectModal,
  },
};
</script>

<style scoped>
h5 {
  color: grey;
  margin-bottom: 50px;
  z-index: 1;
  cursor: pointer;
}
.theme--light.v-label {
  height: 150px;
}
.v-main {
  text-align: center;
  height: 100vh;
}
.container {
  text-align: start;
  margin: 0 auto;
  width: 80%;
}
img {
  width: 200px;
  margin-bottom: 50px;
}

.label {
  margin-bottom: 50px;
}
</style>

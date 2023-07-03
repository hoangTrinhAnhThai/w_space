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
            md="3"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                height="100"
                width="300"
                @click="handleClickProject(project._id)"
              >
                <v-img
                  v-if="project.background"
                  height="120"
                  class="light-blue lighten-5 align-end"
                  :src="project.background.url"
                >
                  <v-card-title>
                    <span
                      style="
                        background-color: rgba(255, 255, 255, 0.4);
                        border-radius: 5px;
                        padding: 0 5px;
                      "
                      >{{ project.name }}</span
                    ></v-card-title
                  >
                </v-img>
                <v-img
                  v-else
                  height="120"
                  class="teal darken-4 align-end"
                  src="https://i.pinimg.com/736x/2f/60/6a/2f606ad14bf9171e5f41b42a01b4441f.jpg"
                >
                  <v-card-title>{{ project.name }}</v-card-title>
                </v-img>
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
            md="3"
          >
            <v-item>
              <v-card
                class="d-flex align-center"
                height="100"
                width="300"
                @click="handleClickProject(project._id)"
              >
                <v-img
                  v-if="project.background"
                  height="120"
                  class="light-blue lighten-5 align-end"
                  :src="project.background.url"
                >
                  <v-card-title>
                    <span
                      style="
                        background-color: rgba(255, 255, 255, 0.4);
                        border-radius: 5px;
                        padding: 0 5px;
                      "
                      >{{ project.name }}</span
                    ></v-card-title
                  >
                </v-img>
                <v-img
                  v-else
                  height="120"
                  class="teal darken-4 align-end"
                  src="https://i.pinimg.com/736x/2f/60/6a/2f606ad14bf9171e5f41b42a01b4441f.jpg"
                >
                  <v-card-title>{{ project.name }}</v-card-title>
                </v-img>
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
import AddNewProjectModal from "../../components/modal/AddNewProject.vue";

import { mapGetters } from "vuex";
export default {
  name: "ProjectPage",
  computed: {
    ...mapGetters({
      projectsOfLeader: "PROJECT/projectsOfLeader",
      projectsOfMember: "PROJECT/projectsOfMember",
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
  height: 100px;
}
.v-main {
  text-align: center;
  height: calc(100vh -75px) !important;
  margin-bottom: 50px;
}
.container {
  text-align: start;
  margin: 0 auto;
  width: 80%;
}
img {
  width: 150px;
  margin-bottom: 50px;
}

.label {
  margin-bottom: 50px;
}
.v-card:hover {
  opacity: 0.8;
}
</style>

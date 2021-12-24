<template>
  <v-main>
    <v-container>
      <v-label>
        <img
          src="https://www.permacultureconsultants.com/wp-content/uploads/2020/01/service-permaculture-assesment-report.png"
          alt=""
        />
      </v-label>
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
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProjectPage',
  computed: {
    ...mapGetters({
      projectsOfLeader: 'TASKS/projectsOfLeader',
      projectsOfMember: 'TASKS/projectsOfMember',
    }),
  },
  methods: {
    handleClickProject(idProject) {
      this.$router.push(`/roadmap/${idProject}`);
    },
  },
};
</script>

<style scoped>
.v-main {
  text-align: center;
  background-image: linear-gradient(
    rgba(161, 161, 161, 0.2),
    rgba(187, 180, 180, 0.2)
  );
  background-size: cover;
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

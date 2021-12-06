<template>
  <b-modal
    ref="newProjectModal"
    hide-header-close
    hide-footer
    title="Add a new project"
  >
    <v-row>
      <v-col>
        <v-text-field
          label="Name project ..."
          class="textProject"
          v-model="project.name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="position: relative; top: -20px">
      <v-col>
        <span v-show="showErrors.emptyName" class="error"
          >Name is required</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col class="btn-container">
        <v-btn @click="hide" class="hide" text>Close</v-btn>
        <v-btn class="save-btn continue" @click="addProject" text>Continue</v-btn>
      </v-col>
    </v-row>
    <add-member ref="addMemberModal" v-on:closeModal="hide" />
  </b-modal>
</template>

<script>
import AddMember from "./AddMember.vue";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
export default {
  name: "AddNewProjectModal",
  data() {
    return {
      project: {
        name: ''
      },
      name: '',
      showErrors: {},
      typeOfModal: "",
    };
  },
  computed: {
    ...mapGetters({
      validateName: "VALIDATION/validateName",
      projectEdit: "TASKS/projectEdit",
    }),
  },
  methods: {
    show(project, typeOfModal) {
      this.project = project;
      this.typeOfModal = typeOfModal;
      this.$refs.newProjectModal.show();
    },
    hide() {
      console.log('edit', this.projectEdit.name, this.project.name);
      this.$refs.newProjectModal.hide();
    },
    ...mapActions({
      addProjectAction: "TASKS/addProject",
      editProjectAction: "TASKS/editProject",
    }),
    editProject() {
      this.editProjectAction({
        idProject: this.project._id,
        project: this.project,
      });
    },
    addProject() {
      if (!this.validateBeforeSubmit()) {
        return;
      } else {
        if (this.typeOfModal === "editProject") {
          this.editProject();
          this.hide();
        } else {
          this.addProjectAction(this.project);
          setTimeout(() => {
            this.$refs.addMemberModal.show(this.projectEdit);
            this.name = "";
          }, 1000);
        }
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateName(this.project.name);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyName",
          this.showErrors && !!errors && errors.emptyName
        );

        passedValidate = false;
      }
      return passedValidate;
    },
  },
  created() {
    this.project.name = this.projectEdit.name
  },
  components: {
    AddMember,
  },
  watch: {
    "project.name"() {
      Vue.set(this.showErrors, "emptyName", null);
    },
  },
};
</script>
<style scoped>
.v-col,
.v-row {
  padding: 0 !important;
  margin: 0 !important;
}
.v-btn {
  float: right;
}
.hide {
  margin-left: 15px !important;
}
</style>

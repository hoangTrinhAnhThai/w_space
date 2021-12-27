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
          v-on:keyup="addProjectByKey"
          id="content"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="position: relative; top: -20px">
      <v-col>
        <span v-show="showErrors.emptyName" class="errors"
          >Name is required</span
        >
        <span class="errors" v-if="errorMessage">
          {{ errorMessage }} <br />
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="btn-container">
        <v-btn @click="hide" class="hide" text>Close</v-btn>
        <v-btn class="save-btn continue" @click="addProject" text
          >Continue</v-btn
        >
      </v-col>
    </v-row>
    <add-member ref="addMemberModal" v-on:closeModal="hide" />
  </b-modal>
</template>

<script>
import AddMember from './AddMember.vue';
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
export default {
  name: 'AddNewProjectModal',
  data() {
    return {
      project: {
        name: '',
      },
      name: '',
      showErrors: {},
      typeOfModal: '',
    };
  },
  computed: {
    ...mapGetters({
      validateText: 'VALIDATION/validateText',
      projectEdit: 'TASKS/projectEdit',
      errorMessage: 'ERROR/errorMessage',
    }),
  },
  methods: {
    show(project, typeOfModal) {
      this.project = project;
      this.typeOfModal = typeOfModal;
      this.$refs.newProjectModal.show();
    },
    hide() {
      this.$refs.newProjectModal.hide();
    },
    ...mapActions({
      addProjectAction: 'TASKS/addProject',
      editProjectAction: 'TASKS/editProject',
      clearErrorMessage: 'ERROR/clearErrorMessage',
    }),
    editProject() {
      this.editProjectAction({
        idProject: this.project._id,
        project: this.project,
      });
    },
    addProject() {
      this.clearErrorMessage();

      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();

        return;
      } else {
        if (this.typeOfModal === 'editProject') {
          this.editProject();
          this.hide();
        } else {
          this.addProjectAction(this.project);
          setTimeout(() => {
            if (!this.errorMessage) {
              this.$refs.addMemberModal.show(this.projectEdit);
              this.name = '';
            }
          }, 100);
        }
      }
    },
    addProjectByKey(e) {
      this.clearErrorMessage();

      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();

          return;
        } else {
          if (this.typeOfModal === 'editProject') {
            this.editProject();
            this.hide();
          } else {
            this.addProjectAction(this.project);
            setTimeout(() => {
              if (!this.errorMessage) {
                this.$refs.addMemberModal.show(this.projectEdit);
                this.name = '';
              }
            }, 1000);
          }
        }
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateText(this.project.name);
      if (errors) {
        Vue.set(
          this.showErrors,
          'emptyName',
          this.showErrors && !!errors && errors.emptyName,
        );

        passedValidate = false;
      }
      return passedValidate;
    },
  },
  created() {
    this.project.name = this.projectEdit.name;
  },
  components: {
    AddMember,
  },
  watch: {
    'project.name'() {
      Vue.set(this.showErrors, 'emptyName', null);
      this.clearErrorMessage();
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

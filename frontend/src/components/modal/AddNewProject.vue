<template>
  <b-modal ref="newProjectModal" hide-footer title="Add a new project">
    <div class="addProject">
      <v-text-field
        label="Name project ..."
        class="textProject"
        v-model="project.name"
      ></v-text-field>
      <div class="errors">
        <p v-show="showErrors.emptyName" class="error">Name is required</p>
      </div>
      <v-btn @click="addProject" class="addProjectButton">Continue</v-btn>
    </div>
    <add-member ref="addMemberModal" />
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
      showErrors: {},
      typeOfModal: '',
    };
  },
  computed: {
    ...mapGetters({
      validateName: 'VALIDATION/validateName',
      projectEdit: 'TASKS/projectEdit',
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
        if (this.typeOfModal === 'editProject') {
          this.editProject();
          this.hide();
        } else {
          this.addProjectAction(this.project);
          setTimeout(() => {
            this.$refs.addMemberModal.show(this.projectEdit);
            this.project.name = '';
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
          'emptyName',
          this.showErrors && !!errors && errors.emptyName,
        );

        passedValidate = false;
      }
      return passedValidate;
    },
  },
  components: {
    AddMember,
  },
  watch: {
    'project.name'() {
      Vue.set(this.showErrors, 'emptyName', null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';
.errors {
  margin-bottom: 15px;
  .error {
    margin: 2px;
  }
}
</style>

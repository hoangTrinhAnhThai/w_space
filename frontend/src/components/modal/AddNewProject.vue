<template>
  <b-modal ref="newProjectModal" hide-footer title="Add a new project">
    <div class="addProject">
      <div class="label">Name</div>
      <div class="errors">
        <p v-show="showErrors.emptyName" class="error">Name is required</p>
      </div>
      <div class="d-block text-center content">
        <input
          class="textProject"
          type="text"
          placeholder="Name project ...."
          v-model="project.name"
        />
      </div>
      <button @click="addProject" class="addProjectButton">Continue</button>
    </div>
    <div class="img">
      <img
        src="https://paramountinteriors.com/documents//hypercollaboration/2-people-working-in-teams-innovate-faster-achieve-better-results-and-report-higher-job-satisfaction-8007.jpg"
        alt=""
      />
    </div>
    <add-member ref="addMemberModal" />
  </b-modal>
</template>

<script>
import AddMember from "./AddMember.vue";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
export default {
  name: "AddNewProjectModal",
  props: {
    // typeOfModal: {
    //   type: String,
    // },
  },
  data() {
    return {
      project: {
        name: "",
      },
      showErrors: {},
      typeOfModal: ''
    };
  },
  computed: {
    ...mapGetters({
      validateProject: "VALIDATION/validateProject",
      projectEdit: "TASKS/projectEdit"
    }),
  },
  methods: {
    show(project, typeOfModal) {
      this.project = project
      this.typeOfModal = typeOfModal
      this.$refs.newProjectModal.show();
    },
    hide() {
      this.$refs.newProjectModal.hide();
    },
    ...mapActions({
      addProjectAction: "TASKS/addProject",
      editProjectAction: "TASKS/editProject"
    }),
    editProject() {
      this.editProjectAction({ idProject: this.project._id, project: this.project });
    },
    addProject() {
      if (!this.validateBeforeSubmit()) {
        console.log(this.showErrors);
        return;
      } else {
        console.log('type', this.typeOfModal);
        if (this.typeOfModal === 'editProject') {
          this.editProject()
          this.hide()
        } else {
          this.addProjectAction(this.project)
          setTimeout(() => {
            console.log('edit proj',this.projectEdit);
          this.$refs.addMemberModal.show(this.projectEdit);
          this.project.name = "";
          }, 1000);
          
        }
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateProject(this.project.name);
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

<style lang="scss" scoped>
@import "../../assets/style.scss";
.content {
  border: 1px solid rgb(190, 187, 187);
  padding: none;
  width: 75%;
  margin: 0 auto;
  border-radius: 5px;
  padding: 5px;
  float: left;
  outline-color: rgb(75, 176, 99);
}
.textProject {
  width: 95%;
}
input {
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 13px;
  position: relative;
  top: -2px;
}
.addProjectButton,
.invite {
  border: 1px solid $color;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 15px;
  width: 100px;
  background-color: $color;
}
.img {
  margin: 0 auto;
  width: 350px;
}
img {
  width: 350px;
}
.errors {
  margin: 0;
  .error {
    margin: 2px;
  }
}
</style>

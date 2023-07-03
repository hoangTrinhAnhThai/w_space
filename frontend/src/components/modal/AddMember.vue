<template>
  <b-modal
    ref="addMemberModal"
    hide-header-close
    hide-footer
    title="Add members"
    style="font-family: 'Poppins', sans-serif !important"
  >
    <v-row>
      <v-col cols="10">
        <v-text-field
          v-model="email"
          append-icon="mdi-account-plus"
          label="Email"
          v-on:keyup="searchMemberByKeyUp"
          id="content"
        >
        </v-text-field>
      </v-col>
      <v-col cols="1" style="position: relative">
        <v-btn style="position: absolute; bottom: 15px" @click="searchMember">
          <i class="bx bx-search-alt"></i>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="row-member-search">
      <v-col class="col-member-search" cols="10">
        <v-btn
          style="width: 100%; text-align: left"
          text
          v-if="memberInfor && !errorMessage"
          @click="addMember(memberInfor._id)"
        >
          {{ memberInfor.email }}
        </v-btn>
        <span class="errors" v-if="errorMessage">
          {{ errorMessage }} <br />
        </span>
        <span v-show="showErrors.emptyEmail" class="errors"
          >Email is required</span
        >
        <span v-show="showErrors.invalidEmail" class="errors"
          >Email is invalid</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-chip-group v-if="project" mandatory active-class="primary--text">
        <v-chip
          v-for="member in projectEdit.members"
          :key="member._id"
          close
          @click:close="removeMember(member._id)"
        >
          {{ member.email }}
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="hide" style="margin-left: 15px; float: right"
          >Close</v-btn
        >
      </v-col>
    </v-row>
  </b-modal>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AddMemberModal',
  data() {
    return {
      email: '',
      showErrors: {},
      project: {},
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      validateEmail: 'VALIDATION/validateEmail',
      memberInfor: 'USER/memberInfor',
      errorMessage: 'ERROR/errorMessage',
      projectEdit: 'PROJECT/projectEdit',
    }),
  },
  methods: {
    ...mapActions({
      searchMemberAction: 'USER/searchMember',
      clearErrorMessage: 'ERROR/clearErrorMessage',
      addMemberAction: 'PROJECT/addMember',
      removeMemberAction: 'PROJECT/removeMember',
      removeMemberInforAction: 'USER/removeMemberInfor',
    }),
    show(project) {
      this.project = project;
      this.$refs.addMemberModal.show();
    },
    hide() {
      this.$emit('closeModal');
      this.clearErrorMessage();
      this.error = '';
      this.$refs.addMemberModal.hide();
    },
    searchMember() {
      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();
        return;
      } else {
        this.searchMemberAction({ email: this.email });
      }
    },
    searchMemberByKeyUp(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();

          return;
        } else {
          this.searchMemberAction({ email: this.email });
        }
      }
    },
    addMember(userId) {
      let project = new Object();
      project.user = userId;
      this.addMemberAction({
        project: project,
        idProject: this.project._id,
      });
      this.email = '';
      // this.hide();
    },
    removeMember(userId) {
      let project = new Object();
      project.user = userId;
      this.removeMemberAction({
        project: project,
        idProject: this.project._id,
      });
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateEmail(this.email);
      if (errors) {
        Vue.set(
          this.showErrors,
          'emptyEmail',
          this.showErrors && !!errors && errors.emptyEmail,
        );
        Vue.set(
          this.showErrors,
          'invalidEmail',
          this.showErrors && !!errors && errors.invalidEmail,
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    email() {
      Vue.set(this.showErrors, 'emptyEmail', null);
      Vue.set(this.showErrors, 'invalidEmail', null);
      this.clearErrorMessage();
      this.error = '';
      this.removeMemberInforAction(null);
    },
  },
};
</script>
<style scoped>
.row-member-search {
  position: relative;
  top: -7px;
  padding: 0 !important;
  margin: 0 !important;
}
.col-member-search {
  transition-delay: 01s;
  cursor: pointer;
  padding: 0 !important;
  margin: 0 !important;
}
.v-btn {
  margin: 0 !important;
  text-transform: lowercase !important;
  text-align: left !important;
}
</style>

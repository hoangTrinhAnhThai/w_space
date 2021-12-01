<template>
  <b-modal ref="addMemberModal" hide-footer title="Add members">
    <div class="container">
      <div class="content">
        <i class="bx bx-user-plus"></i>
        <input
          v-model="email"
          type="text"
          placeholder="Enter email address..."
        />
      </div>
      <button @click="searchMember" class="invite">
        <i class="bx bx-search-alt"></i>
      </button>
      <div class="member-search">
        <div
          class="user-found"
          v-if="memberInfor && !errorMessage"
          @click="addMember(memberInfor._id)"
        >
          <span>{{ memberInfor.email }}</span>
        </div>
        <div class="errors" v-if="errorMessage">
          {{ errorMessage }} <br />
          {{ this.error }}
        </div>
        <div class="list-user">
          <ul v-if="project">
            <li v-for="(member, index) in projectEdit.members" :key="index">
              <span class="user-joined"
                >{{ member.email }}
                <i @click="removeMember(member._id)" class="bx bx-x"></i
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
      projectEdit: 'TASKS/projectEdit',
    }),
  },
  methods: {
    ...mapActions({
      searchMemberAction: 'USER/searchMember',
      clearErrorMessage: 'ERROR/clearErrorMessage',
      addMemberAction: 'TASKS/addMember',
      removeMemberAction: 'TASKS/removeMember',
      removeMemberInforAction: 'USER/removeMemberInfor',
    }),
    show(project) {
      this.project = project;
      this.$refs.addMemberModal.show();
    },
    hide() {
      this.$refs.addMemberModal.hide();
    },
    searchMember() {
      if (!this.validateBeforeSubmit()) {
        return;
      } else {
        this.searchMemberAction({ email: this.email });
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  .content {
    border: 1px solid grey;
    padding: none;
    width: 85%;
    padding: 5px;
    input {
      background-color: #fff;
      border: none;
      outline: none;
      width: 85%;
      font-size: 13px;
      margin-left: 15px;
      position: relative;
      top: -2px;
    }
  }
  .invite {
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: rgb(177, 221, 247);
    margin-left: 10px;
  }
  .member-search {
    width: 85%;

    .user-found {
      width: 100%;
      border: 1px solid rgb(128, 128, 128);
      border-top: none;
      padding: 3px 5px;
    }
    .user-found:hover {
      background-color: rgb(177, 221, 247);
    }
    .errors {
      color: rgb(209, 104, 104);
      font-style: italic;
    }
    .list-user {
      margin-top: 15px;
      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 10px;
          margin-top: 10px;
          .user-joined {
            background-color: rgb(240, 238, 238);
            border-radius: 50px;
            padding: 3px 5px;
          }
          i {
            position: relative;
            top: 3px;
            font-size: 18px;
          }
          i:hover {
            color: grey;
          }
        }
      }
    }
  }
}
</style>

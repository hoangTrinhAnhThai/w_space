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
      <div class="user" v-if="userInfo" @click="addMember(userInfo._id)">
        <span>{{ userInfo.email }}</span>
      </div>
      <div class="errors" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  </b-modal>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddMemberModal",
  data() {
    return {
      email: "",
      showErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      validateEmail: "VALIDATION/validateEmail",
      userInfo: "USER/userInfo",
      errorMessage: "ERROR/errorMessage",
      idProject: "TASKS/idProject",
    }),
  },
  methods: {
    ...mapActions({
      searchMemberAction: "USER/searchMember",
      clearErrorMessage: "ERROR/clearErrorMessage",
      addMemberAction: "TASKS/editProject",
    }),
    show() {
      this.$refs.addMemberModal.show();
    },
    hide() {
      this.$refs.addMemberModal.hide();
    },
    searchMember() {
      if (!this.validateBeforeSubmit()) {
        console.log(this.showErrors);
        return;
      } else {
        this.searchMemberAction({ email: this.email });
        this.$refs.addMemberModal.show();
      }
    },
    addMember(userId) {
      let project = new Object();
      project.user = userId;
      this.addMemberAction({ project: project, idProject: this.idProject });
      this.email=''
      this.userInfo=''
      this.hide()
      
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateEmail(this.email);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyEmail",
          this.showErrors && !!errors && errors.emptyEmail
        );
        Vue.set(
          this.showErrors,
          "invalidEmail",
          this.showErrors && !!errors && errors.invalidEmail
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    email() {
      Vue.set(this.showErrors, "emptyEmail", null);
      Vue.set(this.showErrors, "invalidEmail", null);
      this.clearErrorMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.addMember {
  // position: relative;
  // top: 10px;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.content {
  border: 1px solid grey;
  padding: none;
  width: 85%;
  // border-radius: 5px;
  padding: 5px;
}
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
i {
  margin-top: 2px;
  font-size: 16px;
}
.invite {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: rgb(177, 221, 247);
}
.errors {
  color: red;
  padding: 5px;
  font-style: italic;
}
.user {
  padding: 5px;
  width: 85%;
  border: 1px solid grey;
}

.user:hover {
  background-color: rgb(247, 244, 244);
}
</style>

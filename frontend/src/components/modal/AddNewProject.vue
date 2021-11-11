<template>
  <b-modal ref="newProjectModal" hide-footer title="Add a new project">
    <div class="addProject">
      <div class="label">Name</div>
      <div class="d-block text-center content">
        <input
          class="textProject"
          type="text"
          placeholder="Name project ...."
        />
      </div>
      <button class="addProjectButton">Continue</button>
    </div>
    <div class="img">
      <img
        src="https://paramountinteriors.com/documents//hypercollaboration/2-people-working-in-teams-innovate-faster-achieve-better-results-and-report-higher-job-satisfaction-8007.jpg"
        alt=""
      />
    </div>
    <div class="addMember">
      <div class="content">
        <i class="bx bx-user-plus"></i>
        <input type="text" placeholder="Enter email address..." />
      </div>
      <button class="invite">Invite</button>
    </div>
  </b-modal>
</template>

<script>
export default {
  methods: {
    show() {
      this.$refs.newProjectModal.show();
    },
    hideModal() {
      this.$refs.addNewProjectModal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';
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
</style>

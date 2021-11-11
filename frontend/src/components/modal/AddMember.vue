<template>
  <div class="add-member-modal addMember">
    <b-button id="show-btn" @click="showModal">Add member</b-button>
    <b-modal ref="addMemberModal" hide-footer title="Add members">
      <div class="container d-block text-center">
        <div class="content">
          <i class="bx bx-user-plus"></i>
          <input type="text" placeholder="Enter email address..." />
        </div>
        <button class="invite">Invite</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$refs.addMemberModal.show();
    },
    hideModal() {
      this.$refs.addMemberModal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.addMember {
  position: relative;
  top: 10px;
}
.content {
  border: 1px solid grey;
  padding: none;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  padding: 5px;
  float: left;
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
</style>

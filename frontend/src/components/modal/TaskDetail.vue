<template>
  <b-modal
    ref="taskDetailModal"
    hide-footer
    title="Add a new project"
    class="task-detail"
  >
    <div class="container">
      <div class="left-container">
        <div class="description">
          <div class="note">
            <span
              tabindex="0"
              v-b-tooltip.hover
              placement="bottom"
              title="hello"
              placeholder="note"
              >Lorem ipsum do</span
            >
          </div>
          <div class="text">
            <textarea placeholder="note" rows="4" cols="32"></textarea>
          </div>
        </div>
        <div class="activity">
          <label for="">Activity</label>
          <div class="comment">
            <div class="content"></div>
            <div class="write-content"></div>
          </div>
        </div>
      </div>
      <div class="right-container">
          <div class="assign">
              <input type="text" name="" id="">
          </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "task-detail",
  methods: {
    show() {
      this.$refs.taskDetailModal.show();
    },
    hide() {
      this.$refs.taskDetailModal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.container {
  display: flex;
  .left-container {
    width: 60%;
  }
  .right-container {
    width: 35%;
  }
}
.description {
  width: 95%;
  .note {
    width: 80%;
    span {
      padding-right: 15px;
      border: 1px solid $border-color;
      text-align: left;
      padding: 5px 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
      border-radius: 7px;
      color: grey;
    }
  }
  .text {
    display: none;
  }
}
.description:focus-within {
  .text {
    width: 100%;
    display: inline-block;
    margin: 15px;
    background-color: #fff;
    color: grey;
    text-align: left;
    outline: none;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    textarea {
      padding: 15px;
      border: none;
      outline: none;
    }
  }
}
</style>
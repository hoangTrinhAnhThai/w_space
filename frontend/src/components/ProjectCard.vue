<template>
  <div class="card" >
    <div class="sign" tabindex="0">
      <i class="bx bx-dots-vertical-rounded"></i>
      <div class="function">
        <ul>
          <li @click="showTaskDetailModal">
            <span><i class="bx bx-edit-alt"  ></i> Edit</span>
          </li>
          <li @click="deleteTask">
            <span><i class="bx bx-trash"></i> Delete</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" @click="showTaskDetailModal">
    <slot />

    </div>
    <task-detail :task="card" ref="taskDetailModal"></task-detail>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskDetail from "../components/modal/TaskDetail.vue";

export default {
  name: 'Cards',
  props: {
    card: {
      type: Object,
    },
    idProject: {
      type: String,
    },
  },

  methods: {
    ...mapActions({
      deleteTaskAction: 'TASKS/deleteTask',
      getLogtimes: 'TASKS/getLogtimes'

    }),
    deleteTask() {
      this.deleteTaskAction({
        idTask: this.card._id,
        idProject: this.idProject,
      });
    },
    showTaskDetailModal() {
      this.getLogtimes(this.card._id)
      this.$refs.taskDetailModal.show();
    },
  },
  components: {
    TaskDetail,

  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.card {
  background-color: rgb(255, 255, 255);
  margin: 15px;
  padding: 8px;
  border: 1px solid rgb(214, 212, 212);
  border-radius: 5px;
  line-height: 25px;
  cursor: pointer;
  position: relative;
  .sign {
    position: absolute;
    right: 10px;
    color: grey;
    .function {
      position: absolute;
      top: 15px;
      width: 150px;
      right: -10px;
      z-index: 10000 !important;
      background-color: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      display: none;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li:hover {
          background-color: rgb(208, 231, 208);
        }
        li {
          span {
            padding: 15px 10px;
          }
        }
      }
    }
  }
  .sign:focus {
    .function {
      display: block;
    }
  }
}
</style>

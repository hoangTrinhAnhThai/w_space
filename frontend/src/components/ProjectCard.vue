<template>
  <div class="card">
    <div class="sign" tabindex="0">
      <i class="bx bx-dots-vertical-rounded"></i>
      <div class="function">
        <ul>
          <li @click="showTaskDetailModal">
            <span><i class="bx bx-edit-alt"></i> Edit</span>
          </li>
          <li @click="deleteTask">
            <span><i class="bx bx-trash"></i> Delete</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" @click="showTaskDetailModal">
      <slot />
      <div class="description" v-if="card.description">
        {{ card.description }}
      </div>
      <div class="priority" v-if="card.priority">
        <span v-if="card.priority === 'high'"
          ><b-icon variant="danger" icon="exclamation-triangle"></b-icon>
          <b-icon variant="danger" icon="exclamation-triangle"></b-icon>
          <b-icon variant="danger" icon="exclamation-triangle"></b-icon
        ></span>
        <span v-if="card.priority === 'normal'"
          ><b-icon variant="warning" icon="exclamation-triangle"></b-icon>
          <b-icon variant="warning" icon="exclamation-triangle"></b-icon
        ></span>
        <span v-if="card.priority === 'low'"
          ><b-icon variant="success" icon="exclamation-triangle"></b-icon
        ></span>
      </div>
      <div class="dueDate">
        <span v-if="card.dueDate">
          <span v-if="!deadline" style="color: red; font-weight: bolder">
            <i class="bx bx-calendar"></i> {{ date }}, {{ month }} {{ year }}
          </span>
          <span v-else
            ><i class="bx bx-calendar"></i> {{ date }}, {{ month }}
            {{ year }}</span
          >
        </span>
      </div>
    </div>
    <task-detail :task="card" ref="taskDetailModal"></task-detail>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskDetail from '../components/modal/TaskDetail.vue';
import helper from '../utils/data';
export default {
  name: 'Cards',
  props: {
    card: {
      type: Object,
    },
    project: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    deadline() {
      return new Date(this.card.dueDate) >= new Date();
    },
    date() {
      return new Date(this.card.dueDate).getDate();
    },
    year() {
      return new Date(this.card.dueDate).getFullYear();
    },
    month() {
      return helper.month[new Date(this.card.dueDate).getMonth()];
    },
  },

  methods: {
    ...mapActions({
      deleteTaskAction: 'TASKS/deleteTask',
      getLogtimes: 'TASKS/getLogtimes',
    }),
    deleteTask() {
      this.deleteTaskAction({
        idTask: this.card._id,
        idProject: this.project._id,
      });
    },
    showTaskDetailModal() {
      this.getLogtimes(this.card._id);
      this.$refs.taskDetailModal.show();
    },
  },
  components: {
    TaskDetail,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: rgb(255, 255, 255);
  margin: 5px 15px;
  padding: 8px;
  border: 1px solid $border-color;
  border-radius: 3px;
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
  .content {
    .description {
      color: grey;
      font-size: 80%;
    }
    .priority {
      b-icon {
        margin-right: 10px;
      }
    }
    .dueDate {
      font-size: 80%;
      span {
        border-radius: 3px;
      }
    }
  }
}
</style>

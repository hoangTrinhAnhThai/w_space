<template>
  <v-card elevation="2" @click="showTaskDetailModal">
    <v-card-title
      style="color: rgb(21, 17, 30); font-size: 15px; font-weight: 800"
      >{{ card.name }}</v-card-title
    >
    <v-card-subtitle class="description" style="font-size: 12px">{{
      card.description
    }}</v-card-subtitle>
    <v-card-text>
      <span v-if="card.dueDate">
        <span v-if="!deadline" style="color: red; font-size: 12px">
          <i class="bx bx-calendar"></i> {{ date }}, {{ month }} {{ year }}
        </span>
        <span v-else style="color: green; font-size: 12px"
          ><i class="bx bx-calendar"></i> {{ date }}, {{ month }}
          {{ year }}</span
        >
      </span>
      <div class="right-option">
        <span class="priority" v-if="card.priority">
          <v-icon
            v-if="card.priority == 'high'"
            style="color: rgb(233, 92, 92)"
          >
            mdi-alert-outline</v-icon
          >
          <v-icon v-if="card.priority == 'normal'" style="color: orange">
            mdi-alert-outline</v-icon
          >
          <v-icon v-if="card.priority == 'low'" style="color: green">
            mdi-alert-outline</v-icon
          >
        </span>
        <v-avatar v-if="card.assigned" color="light-blue lighten-3" size="24">
          <span v-if="assignForTask" style="font-size: 10px">
            {{ assignForTask.firstName.charAt(0)
            }}{{ assignForTask.lastName.charAt(0) }}
          </span>
        </v-avatar>
      </div>
    </v-card-text>
    <div class="menu">
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <i v-bind="attrs" v-on="on" class="bx bx-dots-vertical-rounded"></i>
        </template>
        <v-list>
          <v-list-item @click="showTaskDetailModal">
            <v-list-item-title>
              <i class="bx bx-edit-alt"></i> Edit</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="deleteTask">
            <v-list-item-title>
              <i class="bx bx-trash"></i> Delete</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <task-detail :task="card" ref="taskDetailModal"></task-detail>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
    ...mapGetters({
      currentProject: 'TASKS/currentProject',
    }),
    assignForTask() {
      let assigned = {};
      let list = [];
      if (this.currentProject.members.length > 0) {
        for (let member of this.currentProject.members) {
          list.push(member);
        }
      }
      list.push(this.currentProject.createdBy);
      for (let member of list) {
        if (member._id == this.card.assigned) {
          assigned = member;
          break;
        }
      }
      return assigned;
    },
  },

  methods: {
    ...mapActions({
      deleteTaskAction: 'TASKS/deleteTask',
      getLogtimes: 'TASKS/getLogtimes',
      addCurrentTask: 'TASKS/addCurrentTask',
      getCommentByIdTask: 'TASKS/getCommentByIdTask',
    }),
    deleteTask() {
      this.deleteTaskAction({
        idTask: this.card._id,
        idProject: this.project._id,
      });
    },
    showTaskDetailModal() {
      this.getCommentByIdTask(this.card._id);
      this.addCurrentTask(this.card);
      this.getLogtimes(this.card._id);
      this.$refs.taskDetailModal.show();
    },
  },
  components: {
    TaskDetail,
  },
};
</script>
<style scoped>
.v-card-title,
.v-card-subtitle {
  color: rgb(21, 17, 30) !important;
}
.card {
  margin: 10px 0;
  border: none;
  position: relative;
  background-color: rgb(244, 245, 254) !important;
}

.card:hover {
  background-color: rgb(231, 233, 248) !important;
}
.card .menu {
  position: absolute;
  right: 10px;
  top: 15px;
}
.description {
  display: flex;
  flex-wrap: wrap;
  word-break: inherit;
}
.theme--light.v-card > .v-card__subtitle,
.theme--light.v-card > .v-card__text {
  word-break: break-all;
}
.right-option {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.priority {
  margin-right: 5px;
}
</style>

<template>
  <v-card elevation="2" @click="showTaskDetailModal">
    <v-card-title style="color: rgb(39, 102, 120); font-size: 15px">{{
      card.name
    }}</v-card-title>
    <v-card-subtitle font-size="12">{{ card.description }}</v-card-subtitle>
    <v-card-text
      ><span v-if="card.dueDate">
        <span v-if="!deadline" style="color: red; font-size: 12px">
          <i class="bx bx-calendar"></i> {{ date }}, {{ month }} {{ year }}
        </span>
        <span v-else style="color: green; font-size: 12px"
          ><i class="bx bx-calendar"></i> {{ date }}, {{ month }}
          {{ year }}</span
        >
      </span>
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
  color: rgb(39, 102, 120) !important;
}
</style>

<style lang="scss" scoped>
.card {
  margin: 10px 0;
  border: none;
  position: relative;
  .menu {
    position: absolute;
    right: 10px;
    top: 15px;
  }
}
</style>

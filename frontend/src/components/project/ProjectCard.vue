<template>
  <v-card elevation="2" @click="showTaskDetailModal">
    <v-card-title class="title">{{ card.name }}</v-card-title>
    <v-card-subtitle class="description">{{
      card.description
    }}</v-card-subtitle>
    <v-card-text class="card-content">
      <div v-if="card.dueDate" class="due-date">
        <span v-bind:style="{ color: deadline }">
          <i class="bx bx-calendar"></i> {{ date }}, {{ month }} {{ year }}
        </span>
      </div>
      <span v-if="checklistTotal" class="checkbox">
        <v-icon>mdi-checkbox-marked-outline</v-icon>{{ checklistDone }}/{{
          checklistTotal
        }}
      </span>
      <div class="right-option">
        <span class="priority" v-if="card.priority">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="card.priority == 'high'"
                style="color: rgb(233, 92, 92)"
              >
                mdi-alert-outline</v-icon
              >
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="card.priority == 'normal'"
                style="color: orange"
              >
                mdi-alert-outline</v-icon
              >
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="card.priority == 'low'"
                style="color: green"
              >
                mdi-alert-outline</v-icon
              >
            </template>

            <span>{{ card.priority }}</span>
          </v-tooltip>
        </span>

        <span class="assigned" v-if="card.assigned">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <img
                v-bind="attrs"
                v-on="on"
                v-if="card.assigned.avatar"
                :src="card.assigned.avatar"
                alt=""
              />
              <v-avatar
                v-bind="attrs"
                v-on="on"
                v-if="
                  !card.assigned.avatar &&
                  card.assigned.firstName &&
                  card.assigned.lastName
                "
                color="light-blue lighten-3"
                size="24"
              >
                <span style="font-size: 10px">
                  {{ card.assigned.firstName.charAt(0)
                  }}{{ card.assigned.lastName.charAt(0) }}
                </span>
              </v-avatar>
            </template>
            <span
              >{{ card.assigned.firstName }} {{ card.assigned.lastName }}</span
            >
          </v-tooltip>
        </span>
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
import TaskDetail from './TaskDetail.vue';
import helper from '../../utils/data';
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
      if (
        new Date(this.card.dueDate) >= new Date() &&
        this.card.status.name !== 'Closed'
      ) {
        return 'green';
      }
      if (
        new Date(this.card.dueDate) < new Date() &&
        this.card.status.name !== 'Closed'
      ) {
        return 'red';
      }
      return 'grey';
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
      currentProject: 'PROJECT/currentProject',
      currentTask: 'TASK/currentTask',
      checklists: 'TASK/allChecklist',
    }),
    checklistTotal() {
      let initialValue = 0;
      for (let checklist of this.checklists) {
        if (checklist.items && checklist.task == this.card._id)
          initialValue += checklist.items.length;
      }
      return initialValue;
    },
    checklistDone() {
      let done = 0;
      for (let checklist of this.checklists) {
        if (checklist.items && checklist.task == this.card._id) {
          for (let item of checklist.items) {
            if (item.isDone) done++;
          }
        }
      }
      return done;
    },
  },

  methods: {
    ...mapActions({
      deleteTaskAction: 'TASK/deleteTask',
      getLogtimes: 'LOGTIME/getAllLogtimeByTask',
      addCurrentTask: 'TASK/addCurrentTask',
      getCommentByIdTask: 'TASK/getCommentByIdTask',
      getChecklistByIdTask: 'TASK/getChecklistByIdTask',
      getFiles: 'TASK/getFiles',
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
      this.getChecklistByIdTask(this.card._id);
      this.getFiles(this.card._id);
      this.$refs.taskDetailModal.show();
    },
  },
  components: {
    TaskDetail,
  },
};
</script>
<style lang="scss" scoped>
.v-card-title,
.v-card-subtitle {
  color: rgb(21, 17, 30) !important;
}
.card {
  margin: 10px 0;
  border: none;
  position: relative;
  background-color: rgb(244, 245, 254) !important;
  .menu {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .title {
    color: rgb(58, 57, 61);
    font-size: 16px !important;
    font-weight: 600;
    font-family: 'Poppins', sans-serif !important;
  }
  .description {
    display: flex;
    flex-wrap: wrap;
    word-break: inherit;
    font-size: 12px;
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    .checkbox {
      margin-top: 0px;
      .v-icon {
        font-size: 15px;
        margin-bottom: 3px;
        margin-right: 4px;
      }
    }
    .assigned {
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
    .due-date {
      .due {
        color: red;
        font-size: 12px;
      }
      .not-due {
        color: green;
      }
    }
    .right-option {
      position: relative;
      top: -5px;
    }
  }
}

.card:hover {
  background-color: rgb(231, 233, 248) !important;
}
.theme--light.v-card > .v-card__subtitle,
.theme--light.v-card > .v-card__text {
  word-break: break-all;
}
</style>

<template>
  <v-main class="task">
    <v-row class="table-task" v-if="currentProject">
      <v-row style="margin: 20px 0px">
        <h1>
          <i class="bx bxl-trello"></i>
          {{ currentProject.name }}
        </h1>
      </v-row>
      <v-data-table :headers="headers" :items="dataTask" class="elevation-1">
        <template v-slot:[`item.status.name`]="{ item }">
          <div style="color: white ; font-weight: 500; padding: 2px 5px">
            <span style="padding: 2px 5px; border-radius: 5px"
              :class="{ open: item.status.name == 'Open', inProgress: item.status.name == 'In progress', resolved: item.status.name == 'Resolved',  closed: item.status.name == 'Closed'}"
              >{{ item.status.name }}</span
            >
          </div>
        </template>
        <template v-slot:[`item.dueDate`]="{ item }">
          <div style="color: red; font-weight: 500">
            <span
              :class="{ active: new Date(item.dueDate).getTime() > new Date() }"
              >{{ item.dueDate }}</span
            >
          </div>
        </template>
      </v-data-table>
    </v-row>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Roadmap",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Task", value: "name" },
        {
          text: "Description",
          value: "description",
        },

        {
          text: "Status",
          value: "status.name", align: 'center'
        },
        {
          text: "Priority",
          value: "priority",align: 'center'
        },
        {
          text: "Due date",
          value: "dueDate",
        },
        {
          text: "CreatedAt",
          value: "createdAt",
        },
        
      ],
    };
  },
  computed: {
    ...mapGetters({
      dataTask: "TASK/taskList",
      currentProject: "PROJECT/currentProject",
    }),
    getColor(dueDate) {
      let today = new Date();
      let date = new Date(dueDate);
      if (today.getTime() > date.getTime()) return "red";
      else return "green";
    },
  },
};
</script>

<style scoped>
.task {
  height: calc(100vh - 65px);

}
.active {
  color: green;
}

.table-task {
  width: 90%;
  margin: 0 auto;
}
.open {
  background-color: rgba(0, 54, 56);
}

.inProgress {
  background-color: rgba(142, 5, 194);
}
.resolved {
  background-color: rgba(120, 29, 66);
}
.closed {
background-color: rgba(243, 139, 160);
}
</style>


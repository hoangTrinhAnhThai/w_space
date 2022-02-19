<template>
  <v-main class="task-page"  v-bind:style="{ backgroundImage: currentProject.background ?  `url('${currentProject.background.url}')` : ''}">
    <v-row class="table-task">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="dataTask"
        class="elevation-1"
        :items-per-page="5"
      >
        <template v-slot:[`header.name`]="{ header }">
          <v-icon>mdi-text-box-outline</v-icon>{{ header.text }}
        </template>
        <template v-slot:[`header.description`]="{ header }">
          <v-icon>mdi-format-letter-case-upper</v-icon>{{ header.text }}
        </template>
        <template v-slot:[`header.status.name`]="{ header }">
          <v-icon>mdi-adjust</v-icon>{{ header.text }}
        </template>
        <template v-slot:[`header.priority`]="{ header }">
          <v-icon>mdi-fire</v-icon>{{ header.text }}
        </template>
        <template v-slot:[`header.dueDate`]="{ header }">
          <v-icon>mdi-calendar-clock-outline</v-icon>{{ header.text }}
        </template>
        <template v-slot:[`header.createdAt`]="{ header }">
          <v-icon>mdi-clock-time-three-outline</v-icon>{{ header.text }}
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <table-cell class="name-cell" :item="item" />
            </td>
            <td>{{ item.description }}</td>
            <td class="text">
              <div style="color: white; font-weight: 300; padding: 2px 5px">
                <span
                  style="padding: 2px 5px; border-radius: 5px"
                  :class="{
                    open: item.status.name == 'Open',
                    inProgress: item.status.name == 'In progress',
                    resolved: item.status.name == 'Resolved',
                    closed: item.status.name == 'Closed',
                  }"
                  >{{ item.status.name }}</span
                >
              </div>
            </td>
            <td class="text" style="text-align: left">
              <Avatar v-if="item.assigned" :user="item.assigned"/>
            </td>
            <td class="text">
              <div style="font-weight: 500">
                <span
                  style="padding: 2px 5px; border-radius: 5px"
                  :class="{
                    high: item.priority == 'high',
                    normal: item.priority == 'normal',
                    low: item.priority == 'low',
                  }"
                  >{{ item.priority
                  }}<v-icon
                    style="color: #ef6c00 !important"
                    v-if="item.priority"
                    >mdi-fire</v-icon
                  ></span
                >
              </div>
            </td>
            <td class="text">
              <div style="color: red; font-weight: 500">
                <span
                  :class="{
                    dueDate: new Date(item.dueDate).getTime() > new Date(),
                  }"
                  ><date-table-cell :date="item.dueDate"
                /></span>
              </div>
            </td>
            <td class="text"><date-table-cell :date="item.dueDate" /></td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import TableCell from "../../components/tableCell/NameTableCell.vue";
import DateTableCell from "../../components/tableCell/DateTableCell.vue";
import Avatar from '../../components/Avatar.vue'

export default {
  name: "Roadmap",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Task",
          value: "name",
          width: "250px",
        },
        {
          text: "Description",
          value: "description",
          width: "250px",
        },
        {
          text: "Status",
          value: "status.name",
          align: "center",
        },
        {
          text: "Assigned",
          value: "assigned.firstName",
          align: "center",
        },
        {
          text: "Priority",
          value: "priority",
          align: "center",
        },
        {
          text: "Due date",
          value: "dueDate",
          align: "center",
        },
        {
          text: "CreatedAt",
          value: "createdAt",
          align: "center",
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
  components: {
    TableCell,
    DateTableCell,
    Avatar
  },
};
</script>

<style lang="scss" scoped>
.task-page {
  width: 100%;
  min-width: 1000px;
  height: calc(100vh - 181px);
  overflow-y: scroll !important;
  background-size: cover;
  background-position: center;
}
.text {
  text-align: center;
}
// .task {
//   height: calc(100vh - 65px);
// }
.dueDate {
  color: green;
}

.table-task {
  width: 90%;
  margin: 0 auto;
}
.open {
  background-color: rgba(0, 54, 56, .9);
}

.inProgress {
  background-color: rgba(186, 58, 236, 0.9);
}
.resolved {
  background-color: rgba(120, 29, 66, .9);
}
.closed {
  background-color: rgba(243, 139, 160, .9);
}

.low {
  background-color: #cfd8dc;
}
.normal {
  background-color: #ffe0b2;
}

.high {
  background-color: #ffa726;
}

.v-icon {
  font-size: 17px !important;
  top: -1px;
  margin-right: 5px;
}
.v-application .elevation-1 {
  // box-shadow: none !important;
}
</style>
<style>
#open-task-table-cell {
  opacity: 0;
}
tr:hover #open-task-table-cell {
  opacity: 1;
}
</style>

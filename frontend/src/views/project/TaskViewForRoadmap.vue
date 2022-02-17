<template>
  <v-main class="task">
    <v-row class="table-task" v-if="currentProject">
      <v-row style="margin: 20px 0px">
        <h1>
          <i class="bx bxl-trello"></i>
          {{ currentProject.name }}
        </h1>
      </v-row>
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
        :items-per-page="10"
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
            <td class="text">
              <span v-if="item.assigned"
                >{{ item.assigned.firstName }}
                {{ item.assigned.lastName }}</span
              >
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
                  ><date-table-cell :dueDate="item.dueDate"
                /></span>
              </div>
            </td>
            <td class="text"><date-table-cell :dueDate="item.dueDate" /></td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
    <div style="width: 80%; margin: 0 auto">
      <vue-horizontal-list :items="items" :options="options">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </div>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import TableCell from "../../components/table/NameTableCell.vue";
import DateTableCell from "../../components/table/DateTableCell.vue";
import VueHorizontalList from 'vue-horizontal-list';

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
          value: "assigned",
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
      options: {
          responsive: [
            {end: 576, size: 1}, 
            {start: 576, end: 768, size: 2},
            {start: 768, end: 992, size: 3},
            {size: 4}
          ],
          list: {
            // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
            windowed: 1200,
            
            // Because: #app {padding: 80px 24px;}
            padding: 24
          }
        },  
        items: [
          {title: 'Item 0', content: 'Content item with description'},
          {title: 'Item 0', content: 'Content item with description'},
          {title: 'Item 0', content: 'Content item with description'},
          {title: 'Item 0', content: 'Content item with description'},
          {title: 'Item 0', content: 'Content item with description'},
        ]
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
    VueHorizontalList
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 1200px) {
    #app {
      padding-left: 80px;
      padding-right: 80px;
    }
  }
.text {
  text-align: center;
}
.task {
  height: calc(100vh - 65px);
}
.dueDate {
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
</style>
<style>
#open-task-table-cell {
  opacity: 0;
}
tr:hover #open-task-table-cell {
  opacity: 1;
}
</style>
<style>
.v-dialog {
  margin: 0 !important;
}
.v-dialog__content {
  position: fixed !important;
  bottom: 0 !important;
  right: 0 !important;
  height: 400px !important;
  justify-content: end;
}

.v-dialog__content {
    align-items: end !important;
    display: flex;
    /* height: 100%; */
    justify-content: end !important;
    pointer-events: none;
    position: fixed;
    bottom: 0 !important;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
    width: 100%;
    z-index: 6;
    outline: none;
    position: fixed !important;
    bottom: 0 !important;
    top: calc(100vh - 400px) !important
}
.v-overlay__scrim {
  /* background-color: white !important; */
}
</style>

<template>
  <v-main>
    <v-row class="row1">
      <v-col cols="1">
        <v-btn-toggle class="calendar">
          <v-btn style="width: 70px !important" @click="getAllLogtime">
            All
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="1">
        <v-btn-toggle class="calendar">
          <v-btn>
            <i class="bx bxs-calendar"></i>
            <DatePicker v-model="date" :clearable="false" class="datepicker" />
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <div class="function-btn">
        <v-btn class="save-btn" @click="createLogtime"
          >Add new time entry</v-btn
        >
        <div @click="fetchData">
          <export-excel
            v-if="date"
            :data="list"
            :name="`Logtime ${dateName}.xls`"
          >
            <v-btn>Download Data</v-btn>
          </export-excel>
          <export-excel v-else :data="list" :name="`All logtimes.xls`">
            <v-btn>Download Data</v-btn>
          </export-excel>
        </div>
      </div>
    </v-row>
    <v-row>
      <DateTableCell :date="date" />
      <v-card>
        <v-list shaped>
          <v-list-item-group>
            <logtime-card
              v-for="(logtime, index) in logtimeArray"
              :key="index"
              v-bind:logtime="logtime"
              class="logtime-content"
            />
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-row>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LogtimeCard from "../../components/logtime/LogtimeCard.vue";
import data from "../../utils/data";
import DatePicker from "vue2-datepicker";
import DateTableCell from "../../components/tableCell/DateTableCell.vue";

export default {
  name: "Logtime",
  data() {
    return {
      logtime: {},
      date: "",
      logtimeList: JSON.parse(localStorage.getItem("logtimeList")),
      list: [],
    };
  },
  computed: {
    ...mapGetters({
      logtimeArray: "LOGTIME/logtimeArray",
    }),
    dateWeek() {
      return data.weekday[new Date(this.date).getDay()];
    },
    dateMonth() {
      return new Date(this.date).getDate();
    },
    month() {
      return data.month[new Date(this.date).getMonth()];
    },
    dateName() {
      if (sessionStorage.getItem("date")) {
        let date = new Date(sessionStorage.getItem("date"));
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      } else {
        return `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
      }
    },
    // dataFormat() {

    // }
  },
  methods: {
    ...mapActions({
      getAllLogtimeAction: "LOGTIME/getAllLogtime",
      createLogtimeAction: "LOGTIME/createLogtime",
      getAllLogtimeByDate: "LOGTIME/getAllLogtimeByDate",
    }),
    createLogtime() {
      this.createLogtimeAction();
    },
    startDownload() {
      alert("show loading");
    },
    finishDownload() {
      alert("hide loading");
    },
    async fetchData() {
      // if (this.date) {
      //   this.getAllLogtimeByDate(this.date);
      // } else {
      //   this.getAllLogtimeByDate();
      // }
      this.list = this.logtimeArray.map((logtime) => ({
        Id: logtime._id,
        Task_id: logtime.task ? logtime.task._id : "",
        Task_name: logtime.task ? logtime.task.name : "",
        CreatedBy_Email: logtime.createdBy.email,
        CreatedBy_Full_Name: `${logtime.createdBy.firstName} ${logtime.createdBy.lastName}`,
        CreatedAt: `${new Date(logtime.createdAt).getDate()} ${
          data.month[new Date(logtime.createdAt).getMonth()]
        },  ${new Date(logtime.createdAt).getFullYear()}`,
        StartTime: logtime.startTime
          ? `${new Date(logtime.startTime).getHours()}h${new Date(
              logtime.startTime
            ).getMinutes()} ${new Date(logtime.startTime).getDate()} ${
              data.month[new Date(logtime.startTime).getMonth()]
            },  ${new Date(logtime.startTime).getFullYear()}`
          : "",
        StopTime: logtime.stopTime
          ? `${new Date(logtime.stopTime).getHours()}h${new Date(
              logtime.stopTime
            ).getMinutes()} ${new Date(logtime.stopTime).getDate()} ${
              data.month[new Date(logtime.stopTime).getMonth()]
            },  ${new Date(logtime.stopTime).getFullYear()}`
          : "",
        TimeInMiliseconds: logtime.timeInMiliseconds
          ? logtime.timeInMiliseconds
          : "",
      }));
    },
    getAllLogtime() {
      this.date = null;
      this.getAllLogtimeByDate();
    },
  },
  components: {
    LogtimeCard,
    DatePicker,
    DateTableCell,
  },
  created() {
    this.getAllLogtimeByDate();
  },
  watch: {
    date() {
      sessionStorage.setItem("date", this.date);
      this.getAllLogtimeByDate(this.date);
    },
  },
};
</script>
<style lang="scss" scoped>
.v-main {
  width: 100%;
  min-width: 1000px;
  min-height: 92vh;
  height: 92vh;
  white-space: nowrap;
  overflow: scroll !important;
  .row {
    width: 95%;
    margin: 0 auto;
  }

  .row1 {
    i {
      font-size: 16px;
    }
    .v-btn {
      width: 70px !important;
      height: 40px !important;
    }
    .datepicker {
      opacity: 0;
      width: 40px;
      margin: 0;
      padding: 0;
      position: absolute;
      right: 0;
    }
  }
}

.date-week2 .v-btn {
  margin-left: 5px;
  background-color: rgb(247, 247, 247);
}

.theme--light.v-btn-toggle:not(.v-btn-toggle--group) {
  background-color: rgb(247, 248, 251) !important;
}

.function-btn {
  display: flex;
  flex-direction: row-reverse;
  margin: 10px 0 20px;
  .v-btn {
    margin-left: 15px;
  }
}
</style>

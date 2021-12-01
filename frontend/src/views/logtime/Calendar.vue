<template>
  <div class="logtime">
    <div class="container-logtime">
      <div class="header">
        <div class="content1 content">
          <div class="left">
            <i class="bx bxs-chevron-left"></i>
          </div>
          <div class="calendar">
            <i class="bx bxs-calendar"></i>
            <DatePicker v-model="date" :clearable="false" class="datepicker" />
          </div>
          <div class="right">
            <i class="bx bxs-chevron-right"></i>
          </div>
          <div class="nowDate">{{ dateWeek }}, {{ dateMonth }} {{ month }}</div>
        </div>
        <div class="content2 content">
          <div class="day">Day</div>
          <div class="week">Week</div>
          <div class="sync">
            <i class="bx bx-sync"></i>
          </div>
          <div class="user">
            <i class="bx bx-user"></i>
          </div>
          <div class="edit">
            <i class="bx bx-edit"></i>
          </div>
        </div>
      </div>
      <v-row style="margin-top: 20px" sm="6">
        <v-col cols="3">
          <v-text-field
            label="Search"
            placeholder="Placeholder"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn style="width: 100%" elevation="2"
            ><i class="bx bx-filter-alt"></i
          ></v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="primary" elevation="2" @click="createLogtime"
            >Add new time entry</v-btn
          >
        </v-col>
      </v-row>
      <div class="logtime-card">
        <logtime-card
          v-for="(logtime, index) in logtimeArray"
          :key="index"
          v-bind:logtime="logtime"
          class="logtime-content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogtimeCard from '../../components/LogtimeCard.vue';
import data from '../../utils/data';
import DatePicker from 'vue2-datepicker';
export default {
  name: 'Logtime',
  data() {
    return {
      logtime: {},
      date:
        sessionStorage.getItem('date') ||
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
    };
  },
  computed: {
    ...mapGetters({
      logtimeArray: 'LOGTIME/logtimeArray',
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
  },
  methods: {
    ...mapActions({
      getAllLogtimeAction: 'LOGTIME/getAllLogtime',
      createLogtimeAction: 'LOGTIME/createLogtime',
      getAllLogtimeByDate: 'LOGTIME/getAllLogtimeByDate',
    }),
    createLogtime() {
      this.createLogtimeAction();
    },
  },
  components: {
    LogtimeCard,
    DatePicker,
  },
  created() {
    this.getAllLogtimeByDate(this.date);
  },
  watch: {
    date() {
      sessionStorage.setItem('date', this.date);
      this.getAllLogtimeByDate(this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';
.logtime {
  margin: 0 auto;
  .container-logtime {
    margin: 20px auto;
    width: 90%;
    min-width: 870px;
    i {
      font-size: 21px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      .content {
        display: flex;
        div {
          padding: 5px 10px;
        }
      }
      .content {
        .left,
        .day {
          border: 1px solid $border-color;
          border-top-left-radius: 7px;
          border-bottom-left-radius: 7px;
        }
        .calendar {
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
          border-right: 1px solid $border-color;
          position: relative;

          .datepicker {
            opacity: 0;
            width: 40px;
            margin: 0;
            height: 20px;
            padding: 0;
            position: absolute;
            right: 0;
          }
          .bxs-calendar {
          }
        }
        .right,
        .week {
          border: 1px solid $border-color;
          border-top-right-radius: 7px;
          border-bottom-right-radius: 7px;
          border-left: none;
        }
        .sync,
        .user,
        .edit {
          border: 1px solid $border-color;
          border-radius: 7px;
          margin-left: 7px;
        }
        div:hover {
          background-color: rgb(226, 224, 224);
        }
        .nowDate:hover {
          background-color: #fff;
        }
      }
    }
    .add-time-entry {
      margin: 20px 0 50px;
      display: flex;

      div {
        display: flex;
        align-self: center;
        margin-right: 20px;
        input,
        button {
          outline: none;
          border: none;
        }
        i {
          font-size: 17px;
          margin-top: 5px;
        }
        button {
          background-color: $color;
          color: rgb(255, 255, 255);
          font-weight: 500;
          padding: 7px 15px;
          border-radius: 7px;
        }
      }
      .filter,
      .search {
        border-radius: 7px;
        border: 1px solid $border-color;
        border-radius: 7px;
        padding: 5px 15px;
      }
      .filter:hover {
        background-color: rgb(226, 224, 224);
      }
      button:hover {
        background-color: rgb(132, 199, 132);
      }
    }
    .logtime-card {
      .logtime-content {
        border-top: 1px solid $border-color;
        border-right: 1px solid $border-color;
        border-left: 1px solid $border-color;
      }
      .logtime-content:last-child {
        border-bottom: 1px solid $border-color;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .logtime-content:first-child {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
  }
}
</style>

<template>
  <v-main>
    <v-row class="row1">
      <v-col cols="8">
        <v-btn-toggle class="calendar">
          <v-btn>
            <i style="font-size: 20px" class="bx bxs-chevron-left"></i>
          </v-btn>
          <v-btn>
            <i class="bx bxs-calendar"></i>
            <DatePicker v-model="date" :clearable="false" class="datepicker" />
          </v-btn>
          <v-btn>
            <i class="bx bxs-chevron-right"></i>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="1">
        <v-btn-toggle class="date-week1">
          <v-btn> Day </v-btn>
          <v-btn> Week </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="2">
        <div class="date-week2">
          <v-btn text>
            <i class="bx bx-sync"></i>
          </v-btn>
          <v-btn text>
            <i class="bx bx-user"></i>
          </v-btn>
          <v-btn text>
            <i class="bx bx-edit"></i>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field label="Search"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn style="height: 80%; width: 100%"
          ><i class="bx bx-filter-alt"></i
        ></v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          elevation="2"
          style="
            height: 80%;
            color: white !important;
            background-color: rgb(39, 102, 120);
          "
          @click="createLogtime"
          >Add new time entry</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
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
        sessionStorage.getItem('date') ? sessionStorage.getItem('date'):
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
<style scoped>
.v-main {
  width: 100%;
  min-width: 1000px;
  min-height: 92vh;
  height: 92vh;
  white-space: nowrap;
  overflow: scroll !important;
}
.row {
  width: 95%;
  margin: 0 auto;
}
.row1 .v-btn {
  width: 50px !important;
  height: 40px !important;
}

i {
  font-size: 15px;
}
.datepicker {
  opacity: 0;
  width: 40px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
}

.date-week2 .v-btn {
  margin-left: 5px;
  background-color: rgb(247, 247, 247);
}
</style>

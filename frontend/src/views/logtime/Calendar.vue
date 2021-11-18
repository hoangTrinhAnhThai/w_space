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
            <i class="bx bxs-chevron-up"></i>
            <i class="bx bxs-chevron-down"></i>
          </div>
          <div class="right">
            <i class="bx bxs-chevron-right"></i>
          </div>
          <div class="nowDate">Tuesday, 14 November</div>
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
      <div class="add-time-entry">
        <div class="search">
          <i class="bx bx-search-alt-2"></i>
          <input type="text" />
        </div>
        <div class="filter"><i class="bx bx-filter-alt"></i> Filter</div>
        <div class="add-project">
          <button @click="addLogtime">Add new time entry</button>
        </div>
      </div>
      <div class="logtime-card">
          <logtime-card v-for="(logtime, index) in logtimeArray" :key="index"  v-bind:logtime="logtime" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LogtimeCard from "../../components/LogtimeCard.vue";
export default {
  name: "Logtime",
  computed: {
    ...mapGetters({
      logtimeArray: 'LOGTIME/logtimeArray'
    })
  },
  methods: {
    ...mapActions({
      getAllLogtimeAction: "LOGTIME/getAllLogtime",
      addStartTimeAction: "LOGTIME/addStartTime",
    }),
    addLogtime() {
      this.addStartTimeAction();
    },
  },
  components: {
    LogtimeCard,
  },
  created() {
    this.getAllLogtimeAction()
  }
};
</script>

<style lang="scss" scoped>
.logtime {
  float: left;
  .container {
    margin-top: 50px;
  }
}
</style>

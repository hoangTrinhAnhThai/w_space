<template>
  <div class="logtime-card">
    <div class="container-card">
      <div class="project">
        <select name="" id="" v-model="logtime.task">
          <optgroup
            v-for="(project, index) in projectArray"
            :key="index"
            :label="project.name"
          >
            <option
              v-for="(task, index) in project.tasks"
              :key="index"
              :value="task._id"
            >
              {{ task.name }}
            </option>
          </optgroup>
        </select>
      </div>
      <div class="function">
        <ul>
          <li><i class="bx bx-trash" @click="deteleLogtime"></i></li>
          <li><i class="bx bx-calendar"></i></li>
        </ul>
      </div>
      <div class="description">
        <b-button id="description-tooltip"
          >Note</b-button
        >
        <b-tooltip target="description-tooltip" triggers="hover"
          >description-tooltip</b-tooltip
        >
      </div>
      <div class="timer">
        <div class="start-time">08:00</div>
        <div class="sign">-</div>
        <div class="end-time">09:00</div>
      </div>
      <div class="report">{{timeReport.hours}}h{{timeReport.minutes}}m{{timeReport.seconds}}</div>
      <div class="play-time">
        <i id="play" class="bx bx-play" @click="startTime" v-show="!isPlay"></i>
        <i id="stop" @click="stopTime" v-show="isPlay" class="bx bx-stop"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LogtimeCard",
  props: {
    logtime: {
      type: Object
    }
  },

  data: () => ({
    isOpen: false,
    isPlay: false,
    nowTime: new Date(),
    myInterval: function () {},
    timeReport: {
      hours: "",
      minutes: "",
      seconds: "",
    },
  }),
  computed: {
    ...mapGetters({
      projectArray: "TASKS/projectArray",
      timeStart: "LOGTIME/timeStart",
    }),
  },
  components: {},
  methods: {
    // ...mapActions({
    //   getTasks: 'TASKS/getTasksArray',
    // }),
    ...mapActions({
      addStartTimeAction: "LOGTIME/addStartTime",
      addRealTimeAction: "LOGTIME/addRealTime",
      addStopTimeAction: "LOGTIME/addStopTime",
      deteleLogtimeAction: "LOGTIME/deteleLogtime"
    }),
    startTime() {
      this.myInterval = setInterval(this.showTime, 5000);
      this.addStartTimeAction({startTime: this.nowTime, idTask: this.logtime.task});
      localStorage.startTime = this.nowTime
      this.isPlay = true;
    },
    stopTime() {
      clearInterval(this.myInterval);
      this.isPlay = false;
      // this.addStopTime(this.nowTime);
      localStorage.stopTime = this.nowTime

    },
    showTime() {
      let timeNow = new Date();
      this.addRealTimeAction(timeNow - this.nowTime);
      var start = Date.parse(localStorage.startTime)
      var timeInMiliseconds = timeNow - start 
      this.timeReport.hours = Math.floor(timeInMiliseconds/1000/60/60);
      this.timeReport.minutes = Math.floor((timeInMiliseconds/1000/60/60 - this.timeReport.hours)*60)
      this.timeReport.seconds = Math.floor(((timeInMiliseconds/1000/60/60 - this.timeReport.hours)*60 - this.timeReport.minutes)*60)
        
    },
    deteleLogtime() {
      this.deteleLogtimeAction(this.logtime._id)
    }
  },
  watch: {
    // dataTask: {
    //   handler(value) {
    //     this.seletedTask = value.opening[0].id;
    //   },
    //   deep: true,
    // },

    'seletedTask'() {
      if(this.isPlay == true) {
        console.log(this.seletedTask, localStorage.startTime);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

.logtime-card {
  margin-top: 50px;
  width: 100%;
  .container-card {
    width: 100%;
    display: flex;
    border: 1px solid $border-color;
    border-radius: 10px;
    justify-content: space-between;
    padding: 20px 15px;
    div {
      display: flex;
      align-self: center;
    }
    .project {
      width: 30%;
      position: relative;

      select {
        border: 1px solid rgb(224, 221, 221);
        width: 350px;
        outline: none;
        padding: 5px;
        border-radius: 5px;
      }
    }

    .function {
      width: 10%;
      text-align: center;
      ul {
        margin: 0 auto;
        list-style: none;
        color: grey;
        display: flex;
        padding: 0;
        li {
          margin-right: 5px;
          border: 1px solid white;
          padding: 0 5px;
          border-radius: 5px;
          font-size: 20px;
          color: white;
        }
      }
    }
    .description {
      width: 20%;
      button {
        margin: 0;
        background-color: #fff;
        color: grey;
        border: 1px solid white;
        padding: 5px 15px;
        width: 300px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .timer {
      width: 10%;
      .sign {
        margin: 0 10px;
      }
    }
    .report {
      width: 15% p {
        margin: 0 auto;
        background-color: rgb(218, 214, 214);
        border-radius: 5px;
      }
    }
    .play-time {
      #play {
        right: 0;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        color: white;
      }
      #stop {
        right: 0;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        color: white;
        background-color: rgb(248, 51, 51);
      }
    }
  }
  .container-card:hover {
    .play-time {
      #play {
        background-color: #fff;
        color: grey;
      }
      #stop {
        background-color: rgb(197, 49, 49);
        color: rgb(209, 207, 207);
      }
    }
    .play-time:hover #play {
      background-color: $color;
      color: white;
    }
    .function {
      display: flex;
      align-self: center;
      li {
        display: inline;
        color: grey;
        border: 1px solid rgb(201, 198, 198);
      }
      li:hover {
        background-color: rgb(219, 219, 223);
      }
    }
  }
  .description:hover {
    button {
      border: 1px solid $border-color;
    }
  }
}
</style>

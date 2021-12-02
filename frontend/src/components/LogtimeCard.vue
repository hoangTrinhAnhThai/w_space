<template>
  <div class="logtime-card">
    <div class="container-card">
      <div class="project">
        <v-select
          v-model="logtime.task"
          :items="tasks"
          item-text="taskName"
          item-value="taskId"
          label="Your task"
        >
        </v-select>
      </div>
      <div class="function">
        <ul v-show="!logtime.isPlaying">
          <li>
            <i class="bx bx-trash" @click="deteleLogtime"></i>
          </li>
          <li><i class="bx bx-calendar"></i></li>
        </ul>
      </div>
      <div class="description" tabindex="0">
        <div class="note">
          <span
            v-if="logtime.note"
            v-b-tooltip.hover
            placement="bottom"
            :title="logtime.note"
            placeholder="note"
            >{{ logtime.note }}</span
          >
          <span
            v-else
            v-b-tooltip.hover
            placement="bottom"
            :title="logtime.note"
            placeholder="note"
            >note</span
          >
        </div>
        <div class="textarea">
          <v-textarea
            v-on:blur="handleBlur"
            v-model="logtime.note"
            solo
            name="input-7-4"
            label="Note"
          ></v-textarea>
        </div>
      </div>
      <div class="timer">
        <div class="start-time">
          {{ new Date(logtime.createdAt).getHours() }}h{{
            new Date(logtime.createdAt).getMinutes()
          }}
        </div>
        <div class="sign">-</div>
        <div v-if="logtime.stopTime" class="end-time">
          {{ new Date(logtime.stopTime).getHours() }}h{{
            new Date(logtime.stopTime).getMinutes()
          }}
        </div>
        <div v-else class="end-time">
          {{ new Date(logtime.createdAt).getHours() }}h{{
            new Date(logtime.createdAt).getMinutes()
          }}
        </div>
      </div>
      <div class="report">
        <span v-if="!logtime.isPlaying">
          <span v-if="Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)">{{
            Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)
          }}</span>
          <span v-else>00</span>h
          <span
            v-if="
              Math.floor(
                (logtime.timeInMiliseconds / 1000 / 60 / 60 -
                  Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                  60,
              )
            "
          >
            {{
              Math.floor(
                (logtime.timeInMiliseconds / 1000 / 60 / 60 -
                  Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                  60,
              )
            }}</span
          ><span v-else>00</span>m
          <span
            v-if="
              Math.floor(
                ((logtime.timeInMiliseconds / 1000 / 60 / 60 -
                  Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                  60 -
                  Math.floor(
                    (logtime.timeInMiliseconds / 1000 / 60 / 60 -
                      Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                      60,
                  )) *
                  60,
              )
            "
            >{{
              Math.floor(
                ((logtime.timeInMiliseconds / 1000 / 60 / 60 -
                  Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                  60 -
                  Math.floor(
                    (logtime.timeInMiliseconds / 1000 / 60 / 60 -
                      Math.floor(logtime.timeInMiliseconds / 1000 / 60 / 60)) *
                      60,
                  )) *
                  60,
              )
            }}</span
          >
        </span>
        <span v-else>
          <span v-if="timeReport.hours">{{ timeReport.hours }}</span>
          <span v-else>00</span>h
          <span v-if="timeReport.minutes">{{ timeReport.minutes }}</span>
          <span v-else>00</span>m
          <span v-if="timeReport.seconds">{{ timeReport.seconds }}</span>
          <span v-else>00</span>
        </span>
      </div>
      <div class="play-time">
        <i
          id="play"
          class="bx bx-play"
          @click="startTime"
          v-show="!logtime.isPlaying"
        ></i>
        <i
          id="stop"
          @click="stopTime"
          v-show="logtime.isPlaying"
          class="bx bx-stop"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'LogtimeCard',
  props: {
    logtime: {
      type: Object,
    },
  },

  data: () => ({
    isOpen: false,
    myInterval: function () {},
    timeReport: {
      hours: '00',
      minutes: '00',
      seconds: '00',
    },
  }),
  computed: {
    ...mapGetters({
      projectArray: 'TASKS/projectArray',
      timeStart: 'LOGTIME/timeStart',
      logtimeArray: 'LOGTIME/logtimeArray',
      logtimeIsPlaying: 'LOGTIME/logtimeIsPlaying',
    }),
    tasks() {
      let list = [];
      for (let project of this.projectArray) {
        list.push({ header: `${project.name}` });
        for (let task of project.tasks) {
          list.push({ taskName: task.name, taskId: task._id });
        }
      }
      return list;
    },
  },
  components: {},
  methods: {
    ...mapActions({
      deteleLogtimeAction: 'LOGTIME/deteleLogtime',
      createLogtimeAction: 'LOGTIME/createLogtime',
      updateLogtimeAction: 'LOGTIME/updateLogtime',
    }),
    startTime() {
      this.updateLogtimeAction({
        logtime: {
          isPlaying: false,
          stopTime: new Date(),
          timeInMiliseconds:
            new Date() - new Date(this.logtimeIsPlaying.startTime),
        },
        _id: this.logtimeIsPlaying._id,
      });
      if (this.logtime.stopTime) {
        this.createLogtimeAction({
          startTime: new Date(),
          task: this.logtime.task,
          isPlaying: true,
        });
      } else {
        this.updateLogtimeAction({
          logtime: { isPlaying: true, startTime: new Date() },
          _id: this.logtime._id,
        });
      }
      this.myInterval = setInterval(this.showTime, 1000);
    },
    stopTime() {
      clearInterval(this.myInterval);
      this.updateLogtimeAction({
        logtime: {
          isPlaying: false,
          stopTime: new Date(),
          timeInMiliseconds: new Date() - new Date(this.logtime.startTime),
        },
        _id: this.logtime._id,
      });
    },

    showTime() {
      var start = new Date(this.logtimeIsPlaying.startTime);
      var timeInMiliseconds = new Date() - start;
      this.timeReport.hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
      this.timeReport.minutes = Math.floor(
        (timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60,
      );
      this.timeReport.seconds = Math.floor(
        ((timeInMiliseconds / 1000 / 60 / 60 - this.timeReport.hours) * 60 -
          this.timeReport.minutes) *
          60,
      );
    },
    deteleLogtime() {
      this.deteleLogtimeAction(this.logtime._id);
    },
    handleBlur() {
      this.updateLogtimeAction({
        logtime: { note: this.logtime.note },
        _id: this.logtime._id,
      });
    },
  },
  watch: {
    // dataTask: {
    //   handler(value) {
    //     this.seletedTask = value.opening[0].id;
    //   },
    //   deep: true,
    // },

    'logtime.task'() {
      this.updateLogtimeAction({
        logtime: this.logtime,
        _id: this.logtime._id,
      });
    },
  },
  created() {
    this.myInterval = setInterval(this.showTime, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';

.logtime-card {
  width: 100%;
  .container-card {
    width: 100%;
    display: flex;
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
      .note {
        width: 180px;
        span {
          width: 180px;
          padding-right: 15px;
          border: 1px solid $border-color;
          text-align: left;
          padding: 5px 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          outline: none;
          border-radius: 7px;
          color: grey;
        }
      }
      .textarea {
        display: none;
      }
    }
    .description:focus-within {
      position: relative;
      .textarea {
        position: absolute;
        top: 0;
        display: inline-block;
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
    textarea {
      // border: 1px solid $border-color;
      // outline: none;
      border-radius: 10px;
    }
  }
}
</style>

<template>
  <div class="logtime-card">
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="logtime.task"
          :items="tasks"
          item-text="taskName"
          item-value="taskId"
          label="Your task" 
        >
        </v-select>
      </v-col>
      <v-col cols="1" class="functions">
        <ul v-show="!logtime.isPlaying">
          <li>
            <i class="bx bx-trash" @click="deteleLogtime"></i>
          </li>
          <li><i class="bx bx-calendar"></i></li>
        </ul>
      </v-col>
      <v-col cols="2" class="description" tabindex="0">
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
            label="Note"
            cols="40"
          ></v-textarea>
        </div>
      </v-col>
      <v-col cols="2">
        <span>{{ timeStart }} - {{ timeStop }}</span>
      </v-col>
      <v-col cols="1">
        <span v-if="!logtime.isPlaying">
          {{ timeReportIsNotPlaying }}
        </span>
        <span v-else>
          <span>{{ hours >= 10 ? hours : `0${hours}` }}:</span>
          <span>{{ minutes >= 10 ? minutes : `0${minutes}` }}:</span>
          <span>{{ seconds >= 10 ? seconds : `0${seconds}` }}</span>
        </span>
      </v-col>
      <v-col cols="1" class="play-time">
        <v-btn text id="play" @click="startTime" v-show="!logtime.isPlaying">
          <i class="bx bx-play"></i>
        </v-btn>
        <v-btn text id="stop" @click="stopTime" v-show="logtime.isPlaying">
          <i class="bx bx-stop"></i>
        </v-btn>
      </v-col>
    </v-row>
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
    hours: 0,
    minutes: 0,
    seconds: 0,
  }),
  computed: {
    ...mapGetters({
      projectsOfLeader: 'TASKS/projectsOfLeader',
      projectsOfMember: 'TASKS/projectsOfMember',
      logtimeArray: 'LOGTIME/logtimeArray',
      logtimeIsPlaying: 'LOGTIME/logtimeIsPlaying',
    }),
    tasks() {
      let list = [];
      for (let project of this.projectsOfLeader) {
        list.push({ header: `${project.name}` });
        for (let task of project.tasks) {
          list.push({ taskName: task.name, taskId: task._id });
        }
      }
      for (let project of this.projectsOfMember) {
        list.push({ header: `${project.name}` });
        for (let task of project.tasks) {
          list.push({ taskName: task.name, taskId: task._id });
        }
      }
      return list;
    },
    timeReportIsNotPlaying() {
      let totalSecond = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      if (this.logtime.timeInMiliseconds) {
        totalSecond = this.logtime.timeInMiliseconds / 1000 / 60 / 60;
        hour = Math.floor(totalSecond);
        minute = Math.floor((totalSecond - hour) * 60);
        second = Math.floor(((totalSecond - hour) * 60 - minute) * 60);
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return `${hour}:${minute}:${second}`;
    },
    timeStart() {
      let hour = 0;
      let minute = 0;
      if (this.logtime.createdAt) {
        hour = new Date(this.logtime.createdAt).getHours();
        minute = new Date(this.logtime.createdAt).getMinutes();
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      return `${hour}h${minute}`;
    },
    timeStop() {
      let hour = 0;
      let minute = 0;
      if (this.logtime.stopTime) {
        hour = new Date(this.logtime.stopTime).getHours();
        minute = new Date(this.logtime.stopTime).getMinutes();
        if (hour < 10) {
          hour = `0${hour}`;
        }
        if (minute < 10) {
          minute = `0${minute}`;
        }
        return `${hour}h${minute}`;
      } else {
        return this.timeStart;
      }
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
      this.hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
      this.minutes = Math.floor(
        (timeInMiliseconds / 1000 / 60 / 60 - this.hours) * 60,
      );
      this.seconds = Math.floor(
        ((timeInMiliseconds / 1000 / 60 / 60 - this.hours) * 60 -
          this.minutes) *
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
<style scoped>
.logtime-card {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
#play {
  font-size: 20px;
  border: none;
  height: 40px;
}

#stop {
  border: none;
  font-size: 20px;
  background-color: rgb(250, 71, 71);
  height: 40px;
}
#stop:hover {
  background-color: rgb(241, 111, 111);
}
.play-time i {
  color: white;
}
.logtime-card:hover #play i {
  color: rgb(39, 102, 120);
}
#play:hover {
  background-color: rgba(39, 102, 120, 0.9);
}
#play:hover i {
  color: white !important;
}
.col {
  margin: 0 auto;
  text-align: center;
}
ul {
  display: flex;
  list-style: none;
}
ul i {
  font-size: 25px;
}
.col {
  display: flex;
  align-self: center;
}
.v-textarea {
  display: none;
  padding: 15px 5px;
}
.description {
  cursor: pointer;
}
.description:focus-within {
  position: relative;
}
.description:focus-within .v-textarea {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
}
.note {
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.functions {
  color: white;
}

.logtime-card:hover .functions i {
  border: 1px solid rgba(39, 102, 120, 0.3);
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
}
.logtime-card:hover .functions {
  color: rgba(39, 102, 120, 0.7);
}

.functions i:hover {
  background-color: rgba(39, 102, 120, 0.4);
}
</style>

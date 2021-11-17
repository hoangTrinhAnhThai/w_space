<template>
  <div class="logtime-card">
    <div class="container">
      <div class="project">
        <b-form-select
          :options="dataTask.opening"
          v-model="seletedTask"
          value-field="id"
          text-field="text"
        >
        </b-form-select>
      </div>
      <div class="function">
        <ul>
          <li><i class="bx bx-trash"></i></li>
          <li><i class="bx bx-calendar"></i></li>
        </ul>
      </div>
      <div class="description">
        <b-button id="description-tooltip"
          >Nop de xuat Lorem ipsu. pariatur rerum quo cumque dignissimos dolorum
          impedit.</b-button
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
      <div class="report">1h00</div>
      <div class="play-time"><i class="bx bx-play"></i></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LogtimeCard",

  data: () => ({
    seletedTask: "",
    isOpen: false,
  }),
  computed: {
    ...mapGetters({
      dataTask: "TASKS/tasksArray",
    }),
  },
  components: {},
  created() {
    this.getTasks();
  },
  methods: {
    ...mapActions({
      getTasks: "TASKS/getTasksArray",
    }),
  },
  watch: {
    dataTask: {
      handler(value) {
        this.seletedTask = value.opening[0].id;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

.logtime-card {
  margin-top: 50px;
  width: 100%;
  .container {
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
      i {
        right: 0;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        color: white;
      }
    }
  }
  .container:hover {
    .play-time {
      i {
        background-color: #fff;
        color: grey;
      }
    }
    .play-time:hover i {
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

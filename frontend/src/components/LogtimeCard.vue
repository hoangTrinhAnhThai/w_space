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
          >Nop de xuat Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Qui numquam molestias itaque, ipsa iure doloremque sint blanditiis
          recusandae cupiditate exercitationem voluptatum suscipit reprehenderit
          pariatur rerum quo cumque dignissimos dolorum impedit.</b-button
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LogtimeCard',

  data: () => ({
    seletedTask: '',
    isOpen: false,
  }),
  computed: {
    ...mapGetters({
      dataTask: 'TASKS/tasksArray',
    }),
  },
  components: {},
  created() {
    this.getTasks();
  },
  methods: {
    ...mapActions({
      getTasks: 'TASKS/getTasksArray',
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
@import '../assets/style.scss';

.logtime-card {
  width: 100%;
  .container {
    width: 100%;
    display: flex;
    border: 1px solid grey;
    border-radius: 10px;
    justify-content: space-between;
    padding: 10px 15px;
    div {
      display: flex;
      align-self: center;
    }
    .project {
      flex-basis: 40%;
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
      flex-basis: 10%;
      ul {
        list-style: none;
        color: grey;
        display: flex;
        padding: 0;
        margin: 0;
        li {
          display: none;
          margin-right: 5px;
          border: 1px solid rgb(201, 198, 198);
          padding: 0 5px;
          border-radius: 5px;
          font-size: 20px;
        }
      }
    }
    .description {
      flex-basis: 30%;
      button {
        margin: 0;
        background-color: #fff;
        color: grey;
        border: 1px solid white;
        padding: 3.5px 15px;
        width: 300px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .timer {
      flex-basis: 10%;
      .sign {
        margin: 0 10px;
      }
    }
    .report {
      p {
        background-color: rgb(218, 214, 214);
        border-radius: 5px;
      }
    }
    .play-time {
      flex-basis: 5%;
      i {
        right: 0;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
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
      }
      li:hover {
        background-color: rgb(219, 219, 223);
      }
    }
    .description {
      button {
        border: 1px solid $border-color;
      }
    }
  }
}
</style>

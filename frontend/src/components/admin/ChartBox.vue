<template>
  <div class="box-chart">
    <div class="container">
      <div class="content content1">
        <p>Number of registered users today</p>
        <h5>{{ numberOfRegisteredUsersToday }}</h5>
        <span> {{ compareUserDate }} </span>
      </div>
      <div class="content content2">
        <p>Number of registered users this month</p>
        <h5>{{ numberOfRegisteredUsersThisMonth }}</h5>
        <span> data more than last month </span>
      </div>
      <div class="content content3">
        <p>Number of registered projects today</p>
        <h5>{{ numberOfRegisteredProjectsToday }}</h5>
        <span>{{ compareProjectDate }}</span>
      </div>
      <div class="content content4">
        <p>Number of registered projects this month</p>
        <h5>{{ numberOfRegisteredProjectsThisMonth }}</h5>
        <span> {{ compareProjectMonth }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ChartBox',
  computed: {
    ...mapGetters({
      numberOfRegisteredUsersToday: 'ADMIN/numberOfRegisteredUsersToday',
      numberOfRegisteredUsersYesterday:
        'ADMIN/numberOfRegisteredUsersYesterday',
      numberOfRegisteredProjectsToday: 'ADMIN/numberOfRegisteredProjectsToday',
      numberOfRegisteredProjectsYesterday:
        'ADMIN/numberOfRegisteredProjectsYesterday',
      numberOfRegisteredUsersThisMonth:
        'ADMIN/numberOfRegisteredUsersThisMonth',
      numberOfRegisteredUsersLastMonth:
        'ADMIN/numberOfRegisteredUsersLastMonth',
      numberOfRegisteredProjectsThisMonth:
        'ADMIN/numberOfRegisteredProjectsThisMonth',
      numberOfRegisteredProjectsLastMonth:
        'ADMIN/numberOfRegisteredProjectsLastMonth',
    }),
    compareUserDate() {
      if (
        this.numberOfRegisteredUsersToday >=
        this.numberOfRegisteredUsersYesterday
      ) {
        return `more ${
          this.numberOfRegisteredUsersToday -
          this.numberOfRegisteredUsersYesterday
        } users than yesterday`;
      } else {
        return `less ${
          this.numberOfRegisteredUsersYesterday -
          this.numberOfRegisteredUsersToday
        } users than yesterday`;
      }
    },
    compareUserMonth() {
      if (
        this.numberOfRegisteredUsersThisMonth >=
        this.numberOfRegisteredUsersLastMonth
      ) {
        return `more ${
          this.numberOfRegisteredUsersThisMonth -
          this.numberOfRegisteredUsersLastMonth
        } users than last month`;
      } else {
        return `less ${
          this.numberOfRegisteredUsersLastMonth -
          this.numberOfRegisteredUsersThisMonth
        } users than last month`;
      }
    },
    compareProjectDate() {
      if (
        this.numberOfRegisteredProjectsToday >=
        this.numberOfRegisteredProjectsYesterday
      ) {
        return `more ${
          this.numberOfRegisteredProjectsToday -
          this.numberOfRegisteredProjectsYesterday
        } projects than yesterday`;
      } else {
        return `less ${
          this.numberOfRegisteredProjectsYesterday -
          this.numberOfRegisteredProjectsToday
        } projects than yesterday`;
      }
    },
    compareProjectMonth() {
      if (
        this.numberOfRegisteredProjectsThisMonth >=
        this.numberOfRegisteredProjectsLastMonth
      ) {
        return `more ${
          this.numberOfRegisteredProjectsThisMonth -
          this.numberOfRegisteredProjectsLastMonth
        } projects than last month`;
      } else {
        return `less ${
          this.numberOfRegisteredProjectsLastMonth -
          this.numberOfRegisteredProjectsThisMonth
        } projects than last month`;
      }
    },
  },
};
</script>
<style>
p {
  box-shadow: none;
}
</style>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0px;
  max-width: 90vw !important;
  .content {
    flex-basis: 24%;
    padding: 10px 10px 0px;
    border: 1px solid rgb(209, 206, 206);
    border-radius: 5px;
    color: white;
    p {
      text-transform: uppercase;
      font-size: 11px;
      padding: 0;
      margin: 0;
    }
    h5 {
      padding: 0;
      margin: 0;
      font-size: 25px;
    }
    span {
      font-size: 11px;
    }
  }
  .content1 {
    background-color: rgb(76,60,224);
  }
  .content2 {
    background-color: rgb(250,112,35);
  }
  .content3 {
    background-color: rgb(49,184,124);
  }
  .content4 {
    background-color: rgb(246,53,65);
  }
}
</style>

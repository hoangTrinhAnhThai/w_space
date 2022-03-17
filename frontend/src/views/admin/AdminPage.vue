<template>
  <div class="dashboard">
    <box-chart />
    <v-select :items="items" v-model="year"></v-select>
    <bar-chart class="bar-chart" />
    <p>Statistical graph of the number of registered user accounts</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "../../components/admin/Chart.vue";
import BoxChart from "../../components/admin/ChartBox.vue";
export default {
  components: {
    BarChart,
    BoxChart,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      items: [
        new Date().getFullYear() - 3,
        new Date().getFullYear() - 2,
        new Date().getFullYear() - 1,
        new Date().getFullYear(),
      ],
    };
  },
  methods: {
    ...mapActions({
      getStatistical: "ADMIN/getStatistical",
      getAllUsers: "ADMIN/getAllUsers",
      getAllProjects: "ADMIN/getAllProjects",
    }),
  },
  computed: {
    ...mapGetters({
      statistical: "ADMIN/statistical",
    }),
  },
  created() {
    this.getAllUsers({year: this.year});
    this.getAllProjects({year: this.year});
  },
  watch: {
    year() {
      this.getAllUsers({year: this.year});
    this.getAllProjects({year: this.year});
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 12px;
  text-align: center;
  font-style: italic;
  color: grey;
  margin-top: 15px;
}
.dashboard {
  height: calc(100vh - 65px);
  padding: 10px 50px 0;
}
.v-select {
  width: 70px;
}
</style>

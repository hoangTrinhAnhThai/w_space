<template>
  <div class="dashboard">
    <box-chart />
    <bar-chart />
    <p>Statistical graph of the number of registered user accounts</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BarChart from "../../components/admin/BarChart.vue";
import BoxChart from "../../components/admin/ChartBox.vue";
export default {
  components: {
    BarChart,
    BoxChart,
  },
  methods: {
    ...mapActions({
      getStatistical: "ADMIN/getStatistical",
      getAllUsers: "ADMIN/getAllUsers",
      getAllProjects: 'ADMIN/getAllProjects'
    }),
  },
  computed: {
    ...mapGetters({
      statistical: "ADMIN/statistical",
    }),
  },
  created() {
    this.getAllUsers();
    this.getAllProjects()
  },
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
  padding: 50px 50px 0;
}
</style>

<template>
  <div class="dashboard">
    <box-chart />
    <bar-chart />
    <p>Đồ thị thống kê số lượng tài khoản người dùng đăng ký</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BarChart from '../../components/admin/BarChart.vue';
import BoxChart from '../../components/admin/ChartBox.vue';
export default {
  components: {
    BarChart,
    BoxChart,
  },
  methods: {
    ...mapActions({
      getStatistical: 'ADMIN/getStatistical',
    }),
  },
  computed: {
    ...mapGetters({
      statistical: 'ADMIN/statistical',
    }),
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
  height: 95vh;
}
</style>

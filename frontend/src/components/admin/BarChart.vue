<script>
import { Bar } from 'vue-chartjs';
import { mapGetters } from 'vuex';
import helper from '../../utils/data';
export default {
  extends: Bar,
  computed: {
    ...mapGetters({
      userList: 'ADMIN/userListMonth',
      projectList: 'ADMIN/projectList',
    }),
  },
  data() {
    return {
      shortMonth: helper.shortMonth,
    };
  },
  mounted() {
    setTimeout(() => {
      this.renderChart(
        {
          labels: this.shortMonth,
          datasets: [
            {
              label: 'User',
              backgroundColor: '#f87979',
              data: this.userList,
            },
            {
              label: 'Project',
              backgroundColor: '#8AF5FF',
              data: this.projectList,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  stepSize: 2,
                  reverse: false,
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      );
    }, 500);
  },
};
</script>

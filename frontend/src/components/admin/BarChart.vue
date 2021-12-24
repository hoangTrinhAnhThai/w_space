<script>
import { Bar } from 'vue-chartjs';
export default {
  extends: Bar,
  mounted() {
    setTimeout(() => {
      this.renderChart(
        {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'User',
              backgroundColor: '#f87979',
              data: [5, 3, 12, 14, 18],
            },
            {
              label: 'Project',
              backgroundColor: '#8AF5FF',
              data: ['ha', 'thai', 'admin', 'hello'],
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
    }, 2000);
  },
};
</script>

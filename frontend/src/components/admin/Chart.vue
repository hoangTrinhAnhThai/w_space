<script>
import { Line } from "vue-chartjs";
import labelChart from '../../utils/data';
import { mapActions } from 'vuex';
export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
      saleStatisticals: [51, 42,63 , 45, 44, 67, 33, 36, 87, 54]
    };

  },
//   props: ["saleStatisticals"],
  
  mounted() {
    this.setIsLoading(true)
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    setTimeout(() => {
      this.renderChart(
      {
        labels: labelChart.shortMonth,
        datasets: this.saleStatisticals,
      },
      { responsive: true, maintainAspectRatio: false, scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                reverse: false,
                beginAtZero: true,
              },
            },
          ],
        }, }
    );
    // this.setIsLoading(false)
    }, 2000);
  },
  methods: {
    ...mapActions({
      setIsLoading: "ERROR/setLoading"
    })
  }
};
</script>
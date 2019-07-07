<template>
  <div>
    <apexchart width="400px" ref="chart" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "LineChart",
  props: {
    data: Array,
    categories: Array
  },
  data: function() {
    return {
      options: {
        chart: {
          id: "unit-chart"
        },
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          categories: this.$props.categories
        }
      },
      series: [
        {
          name: "unit-1",
          data: this.$props.data
        }
      ]
    };
  },
  watch: {
    data(val) {
      this.$refs.chart.updateSeries([
        {
          data: val
        }
      ]);
    },
    categories(val) {
      this.$refs.chart.updateOptions({
        xaxis: {
          categories: val
        }
      });
    }
  }
};
</script>
<style scoped>
</style>

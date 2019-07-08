<template>
  <div>
    <apexchart width="380px" ref="chart" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "LineChart",
  props: {
    data: Array,
    categories: Array,
    curve: String,
    seriesName: String,
    yTitle: String,
    colors: Array
  },
  data: function() {
    return {
      options: {
        chart: {
          id: "unit-chart"
        },
        stroke: {
          curve: this.$props.curve
        },
        yaxis: {
          title: {
            text: this.$props.yTitle
          }
        },
        xaxis: {
          categories: this.$props.categories,
          title: {
            text: "Time"
          }
        },
        colors: this.$props.colors
      },
      series: [
        {
          name: this.$props.seriesName,
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

<template>
  <section class="main">
    <LineChart
      v-if="data.length > 0 && categories.length > 0"
      :data="data"
      :categories="categories"
    />
    <ul>
      <li
        v-for="(unit, index) in units"
        :key="index"
        @click="showUnitChart(unit)"
      >unit-{{ index + 1 }}</li>
      <li @click="categories = []; data = [];">close</li>
    </ul>
  </section>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/LineChart.vue";

export default {
  name: "home",
  components: {
    LineChart
  },
  methods: {
    showUnitChart(unit) {
      this.categories = unit.categories;
      this.data = unit.data;
    }
  },
  data() {
    return {
      categories: [],
      data: [],
      units: [
        {
          categories: [
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00"
          ],
          data: [100, 90, 88, 67, 49, 40, 35, 21]
        },
        {
          categories: [
            "22:00",
            "23:00",
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00"
          ],
          data: [98, 92, 90, 88, 67, 45, 32, 1]
        },
        {
          categories: [
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00"
          ],
          data: [88, 87, 86, 80, 70, 33, 21, 13]
        }
      ]
    };
  }
};
</script>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<template>
  <section>
    <div class="modal-window">
      <LineChart
        v-if="data.length > 0 && categories.length > 0"
        :data="data"
        :categories="categories"
        style="position: absolute; background-color: #fff; z-index: 1000;"
      />
    </div>
    <el-tabs type="border-card" class="main">
      <el-tab-pane label="Star">
        <KonvaStar @unit-clicked="changeCurrentUnit"></KonvaStar>
      </el-tab-pane>
      <el-tab-pane label="Bus" style="width: 100%;">
        <KonvaBus @unit-clicked="changeCurrentUnit"></KonvaBus>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/LineChart.vue";
import KonvaStar from "@/components/Konva-star.vue";
import KonvaBus from "@/components/Konva-bus.vue";

const axios = require("axios");

export default {
  name: "home",
  components: {
    LineChart,
    KonvaStar,
    KonvaBus
  },
  // async created() {
  //   await axios
  //     .get("http://192.168.1.51/data:5000")
  //     .then(function(response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function() {
  //       // always executed
  //     });
  // },
  methods: {
    changeCurrentUnit(unitName) {
      var unitIndex = +unitName.split("-")[1] - 1;
      if (unitIndex > this.units.length - 1) {
        this.categories = [];
        this.data = [];
      } else {
        this.showUnitChart(this.units[unitIndex]);
      }
    },
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
.modal-window {
  width: 500px;
}
</style>

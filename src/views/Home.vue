<template>
  <div style="height: 98vh;">
    <div class="wrapper">
      <drag-it-dude
        v-for="(item, index) in activeUnits"
        :key="index"
        :style="`top: ${item.top}px; left: ${item.left}px;`"
      >
        <div class="modal-window">
          <span style="font-size: 18px; font-weight: 800;">
            <span>{{ item.name }}</span>
            <i
              style="float: right; margin: 2px 6px 0 0;"
              class="el-icon-close"
              @click="deleteFromActiveUnits(item)"
            ></i>
            <div class="unit-description">
              <p>Device ID: {{ item.d_id }}</p>
              <p>Date: {{ item.date }}</p>
            </div>
          </span>
          <el-tabs style="margin: 10px;" v-model="item.activeName" @tab-click="changeActiveName">
            <el-tab-pane label="Counter" :name="item.name + '_first'">
              <LineChart
                v-if="item.activeName == item.name + '_first'"
                :data="item.counter"
                :categories="item.time"
                :curve="'smooth'"
                :seriesName="item.name"
                :colors="['#2E93fA']"
              />
            </el-tab-pane>
            <el-tab-pane label="Light" :name="item.name + '_second'">
              <LineChart
                v-if="item.activeName == item.name + '_second'"
                :data="item.light"
                :categories="item.time"
                :curve="'smooth'"
                :seriesName="item.name"
                :colors="['#66DA26']"
              />
            </el-tab-pane>
            <el-tab-pane label="Presence" :name="item.name + '_third'">
              <LineChart
                v-if="item.activeName == item.name + '_third'"
                :data="item.presence"
                :categories="item.time"
                :curve="'stepline'"
                :seriesName="item.name"
                :colors="['#546E7A']"
              />
            </el-tab-pane>
            <el-tab-pane label="Payload" :name="item.name + '_fourth'">
              <LineChart
                v-if="item.activeName == item.name + '_fourth'"
                :data="item.payload"
                :categories="item.time"
                :curve="'smooth'"
                :seriesName="item.name"
                :colors="['#E91E63']"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </drag-it-dude>
    </div>
    <el-tabs type="border-card" id="main" @tab-click="activeUnits = []" v-loading="loading">
      <el-tab-pane label="Star">
        <KonvaStar @unit-clicked="addUnitToActiveUnits"></KonvaStar>
      </el-tab-pane>
      <el-tab-pane label="Bus">
        <KonvaBus @unit-clicked="addUnitToActiveUnits"></KonvaBus>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

// @ is an alias to /src
import LineChart from "@/components/LineChart.vue";
import KonvaStar from "@/components/Konva-star.vue";
import KonvaBus from "@/components/Konva-bus.vue";
import DragItDude from "vue-drag-it-dude";

const axios = require("axios");

export default {
  name: "home",
  components: {
    LineChart,
    KonvaStar,
    KonvaBus,
    DragItDude
  },
  async created() {
    var vm = this;
    for (var device in vm.data) {
      await axios
        .get(
          "https://iot-platform-server.herokuapp.com/device_info?dev_id=" +
            device
        )
        .then(function(response) {
          vm.data[device].d_id = response.data[0].d_id;
          vm.data[device].date = new Date(
            response.data[0].date
          ).toLocaleDateString("ru");

          for (let i = 0; i < response.data.length; i++) {
            vm.data[device].counter.push(+response.data[i].log.counter);
            vm.data[device].light.push(+response.data[i].log.light);
            vm.data[device].presence.push(+response.data[i].log.presence);
            vm.data[device].payload.push(+response.data[i].log.payload);
            let date = new Date(response.data[i].date);
            vm.data[device].time.push(
              `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    vm.loading = false;
  },
  methods: {
    addUnitToActiveUnits(unitObject) {
      if (
        !this.activeUnits.some(element => {
          return element.name == unitObject.name;
        })
      ) {
        var unitIndex = +unitObject.name.split("-")[1];

        if (!unitIndex * 10 + "" in this.data) {
          // Error
        } else {
          var newActiveUnit = Object.assign(this.data[unitIndex * 10], {
            left:
              unitObject.x + 410 > width ? unitObject.x - 410 : unitObject.x,
            top: unitObject.y + 470 > height ? unitObject.y - 470 : unitObject.y
          });

          this.$set(newActiveUnit, "activeName", `${unitObject.name}_first`);
          this.activeUnits.push(newActiveUnit);
        }
      }
    },
    deleteFromActiveUnits(unitObject) {
      this.activeUnits.splice(this.activeUnits.indexOf(unitObject), 1);
      this.activeName = "first";
    },
    changeActiveName(tab, event) {
      var name = tab._props.name.split("_")[0];

      this.activeUnits.find(item => item.name === name).activeName =
        tab._props.name;
    }
  },
  data() {
    return {
      loading: true,
      data: {
        "10": {
          name: "Unit-1",
          d_id: "10",
          date: "",
          counter: [],
          light: [],
          presence: [],
          payload: [],
          time: []
        },
        "20": {
          name: "Unit-2",
          d_id: "20",
          date: "",
          counter: [],
          light: [],
          presence: [],
          payload: [],
          time: []
        },
        "30": {
          name: "Unit-3",
          d_id: "30",
          date: "",
          counter: [],
          light: [],
          presence: [],
          payload: [],
          time: []
        },
        "40": {
          name: "Unit-4",
          d_id: "40",
          date: "",
          counter: [],
          light: [],
          presence: [],
          payload: [],
          time: []
        }
      },
      activeUnits: []
    };
  }
};
</script>
<style scoped>
.modal-window {
  cursor: pointer;
  width: 400px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  position: absolute;
  background-color: #fff;
  z-index: 1000;
  text-align: center;
}

.wrapper {
  width: calc(100% - 400px);
  height: calc(100% - 460px);
  position: relative;
  top: 40px;
  left: 0px;
}

#main {
  position: absolute;
  width: 99.5vw;
  height: 99.5vh;
  top: 0.2vh;
  left: 0.2vw;
}

.unit-description {
  text-align: left;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 400;
}
</style>

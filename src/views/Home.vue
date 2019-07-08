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
    // for (var device in vm.data) {
    //   await axios
    //     .get("http://192.168.1.51:5000/device_info?dev_id=" + device)
    //     .then(function(response) {
    //       vm.data[device] = response.data;
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
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
          date: "2019-07-07",
          counter: [
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
            128,
            129,
            130,
            131,
            132,
            133,
            134,
            135
          ],
          light: [
            291,
            292,
            300,
            302,
            303,
            320,
            333,
            340,
            355,
            366,
            370,
            380,
            390,
            332,
            343,
            299,
            320,
            356,
            375,
            364
          ],
          presence: [
            1,
            0,
            1,
            1,
            0,
            1,
            0,
            0,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            1,
            0
          ],
          payload: [
            336,
            340,
            339,
            338,
            337,
            339,
            340,
            341,
            342,
            350,
            333,
            334,
            336,
            337,
            338,
            340,
            321,
            322,
            330,
            332
          ],
          time: [
            "14:15:34",
            "14:15:36",
            "14:15:38",
            "14:15:40",
            "14:15:42",
            "14:15:44",
            "14:15:46",
            "14:15:48",
            "14:15:50",
            "14:15:52",
            "14:15:54",
            "14:15:56",
            "14:15:58",
            "14:16:00",
            "14:16:02",
            "14:16:04",
            "14:16:06",
            "14:16:08",
            "14:16:10",
            "14:16:12"
          ]
        },
        "20": {
          name: "Unit-2",
          d_id: "20",
          date: "2019-07-07",
          counter: [
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29
          ],
          light: [
            300,
            299,
            320,
            321,
            322,
            324,
            299,
            301,
            350,
            355,
            370,
            366,
            356,
            368,
            345,
            300,
            299,
            321,
            311,
            333
          ],
          presence: [
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            0,
            1,
            0,
            1,
            1,
            1,
            1,
            0,
            0,
            1,
            0,
            1,
            0
          ],
          payload: [
            200,
            220,
            231,
            234,
            245,
            251,
            231,
            267,
            301,
            302,
            323,
            303,
            298,
            299,
            280,
            390,
            389,
            370,
            330,
            301
          ],
          time: [
            "14:15:34",
            "14:15:36",
            "14:15:38",
            "14:15:40",
            "14:15:42",
            "14:15:44",
            "14:15:46",
            "14:15:48",
            "14:15:50",
            "14:15:52",
            "14:15:54",
            "14:15:56",
            "14:15:58",
            "14:16:00",
            "14:16:02",
            "14:16:04",
            "14:16:06",
            "14:16:08",
            "14:16:10",
            "14:16:12"
          ]
        },
        "30": {
          name: "Unit-3",
          d_id: "30",
          date: "2019-07-07",
          counter: [
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109
          ],
          light: [
            390,
            389,
            328,
            298,
            291,
            290,
            295,
            296,
            301,
            313,
            342,
            356,
            367,
            378,
            399,
            400,
            380,
            388,
            325,
            300
          ],
          presence: [
            1,
            0,
            1,
            1,
            0,
            1,
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            0,
            0,
            0
          ],
          payload: [
            380,
            399,
            299,
            278,
            255,
            240,
            239,
            250,
            278,
            259,
            234,
            266,
            270,
            290,
            287,
            300,
            320,
            327,
            330,
            345
          ],
          time: [
            "14:15:34",
            "14:15:36",
            "14:15:38",
            "14:15:40",
            "14:15:42",
            "14:15:44",
            "14:15:46",
            "14:15:48",
            "14:15:50",
            "14:15:52",
            "14:15:54",
            "14:15:56",
            "14:15:58",
            "14:16:00",
            "14:16:02",
            "14:16:04",
            "14:16:06",
            "14:16:08",
            "14:16:10",
            "14:16:12"
          ]
        },
        "40": {
          name: "Unit-4",
          d_id: "40",
          date: "2019-07-07",
          counter: [
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79
          ],
          light: [
            350,
            356,
            370,
            372,
            380,
            390,
            380,
            390,
            399,
            400,
            378,
            367,
            374,
            368,
            355,
            299,
            290,
            301,
            311,
            320
          ],
          presence: [
            1,
            1,
            0,
            0,
            0,
            0,
            1,
            1,
            0,
            0,
            1,
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            1,
            1
          ],
          payload: [
            340,
            321,
            339,
            350,
            351,
            352,
            360,
            367,
            368,
            389,
            400,
            399,
            390,
            389,
            370,
            377,
            360,
            367,
            365,
            345
          ],
          time: [
            "14:15:34",
            "14:15:36",
            "14:15:38",
            "14:15:40",
            "14:15:42",
            "14:15:44",
            "14:15:46",
            "14:15:48",
            "14:15:50",
            "14:15:52",
            "14:15:54",
            "14:15:56",
            "14:15:58",
            "14:16:00",
            "14:16:02",
            "14:16:04",
            "14:16:06",
            "14:16:08",
            "14:16:10",
            "14:16:12"
          ]
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

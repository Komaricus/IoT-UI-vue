<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-line ref="line-1" :config="lineConfig1"></v-line>
      <v-line ref="line-2" :config="lineConfig2"></v-line>
      <v-line ref="line-3" :config="lineConfig3"></v-line>
      <v-group
        @click="handleClick(0)"
        @dragmove="handleDragMove"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: stageSize.width / 2,
          y: 150,
          draggable: true,
          dragBoundFunc: function(pos) {
            var newX = pos.x < 100 ? 100 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            return {
                x: newX > stageSize.width - 100 ? stageSize.width - 100 : newX,
                y: newY > stageSize.height - 100 ? stageSize.height - 100 : newY
            };
            }
        }"
        name="line-1"
      >
        <v-circle
          :config="{
            radius: 70,
            fill: this.isDragging['line-1'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-1',
            fill: isDragging['line-1'] ? 'white' : 'black'
          }"
        />
      </v-group>
      <v-group
        @click="handleClick(1)"
        @dragmove="handleDragMove"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: stageSize.width / 3 - 50,
          y: stageSize.height / 2 + 100,
          draggable: true,
          dragBoundFunc: function(pos) {
            var newX = pos.x < 100 ? 100 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            return {
                x: newX > stageSize.width - 100 ? stageSize.width - 100 : newX,
                y: newY > stageSize.height - 100 ? stageSize.height - 100 : newY
            };
            }
        }"
        name="line-2"
      >
        <v-circle
          :config="{
            radius: 70,
            fill: this.isDragging['line-2'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-2',
            fill: isDragging['line-2'] ? 'white' : 'black'
          }"
        />
      </v-group>

      <v-group
        @click="handleClick(2)"
        @dragmove="handleDragMove"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: 2* stageSize.width / 3 + 50,
          y: stageSize.height / 2 + 100,
          draggable: true,
          dragBoundFunc: function(pos) {
            var newX = pos.x < 100 ? 100 : pos.x;
            var newY = pos.y < 100 ? 100 : pos.y;
            return {
                x: newX > stageSize.width - 100 ? stageSize.width - 100 : newX,
                y: newY > stageSize.height - 100 ? stageSize.height - 100 : newY
            };
            }
        }"
        name="line-3"
      >
        <v-circle
          :config="{
            radius: 70,
            fill: this.isDragging['line-3'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-3',
            fill: isDragging['line-3'] ? 'white' : 'black'
          }"
        />
      </v-group>

      <v-group
        @click="handleClick(3)"
        @dragmove="handleDragMove"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: stageSize.width / 2 - 75,
          y: stageSize.height / 2 - 130,
          draggable: true,
          dragBoundFunc: function(pos) {
            var newX = pos.x < 50 ? 50 : pos.x;
            var newY = pos.y < 50 ? 50 : pos.y;
            return {
                x: newX > stageSize.width - 160 ? stageSize.width - 160 : newX,
                y: newY > stageSize.height - 150 ? stageSize.height - 150 : newY
            };
            }
        }"
        name="line-4"
      >
        <v-rect
          :config="{
            width: 150,
            height: 100,
            fill: this.isDragging['line-4'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-rect>
        <v-text
          :config="{
            text: 'Unit-4',
            x: 40,
            y: 20,
            fill: isDragging['line-4'] ? 'white' : 'black'
          }"
        />
      </v-group>
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth - 100;
const height = window.innerHeight - 100;

export default {
  name: "Konva-star",
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: {
        "line-1": false,
        "line-2": false,
        "line-3": false,
        "line-4": false
      },
      lineConfig1: {
        points: [width / 2, 150, width / 2, height / 2 - 100],
        stroke: "black",
        tension: 1,
        pointerLength: 10,
        pointerWidth: 12
      },
      lineConfig2: {
        points: [width / 3 - 50, height / 2 + 100, width / 2, height / 2 - 100],
        stroke: "black",
        tension: 1
      },
      lineConfig3: {
        points: [
          (2 * width) / 3 + 50,
          height / 2 + 100,
          width / 2,
          height / 2 - 100
        ],
        stroke: "black",
        tension: 1
      },
      unitsPosisions: [
        { x: width / 2, y: 150 },
        { x: width / 3 - 50, y: height / 2 + 100 },
        { x: (2 * width) / 3 + 50, y: height / 2 + 100 },
        { x: width / 2 - 75, y: height / 2 - 130 }
      ]
    };
  },
  methods: {
    handleClick(index) {
      this.$emit("unit-clicked", {
        name: "Unit-" + (index + 1),
        x: this.unitsPosisions[index].x,
        y: this.unitsPosisions[index].y
      });
    },
    handleDragMove(e) {
      if (e.target.attrs.name == "line-4") {
        var lines = ["line-1", "line-2", "line-3"];
        for (var i = 0; i < lines.length; i++) {
          var points = [
            this.$refs[lines[i]].getStage().points()[0],
            this.$refs[lines[i]].getStage().points()[1],
            e.target.position().x + 75,
            e.target.position().y + 50
          ];
          this.$refs[lines[i]].getStage().points(points);
        }
      } else {
        var points = [
          e.target.position().x,
          e.target.position().y,
          this.$refs[e.target.attrs.name].getStage().points()[2],
          this.$refs[e.target.attrs.name].getStage().points()[3]
        ];
        this.$refs[e.target.attrs.name].getStage().points(points);
      }
    },
    handleDragStart(e) {
      this.isDragging[e.target.attrs.name] = true;
    },
    handleDragEnd(e) {
      var unitIndex = +e.target.attrs.name.split("-")[1] - 1;
      this.unitsPosisions[unitIndex] = e.target.position();
      this.isDragging[e.target.attrs.name] = false;
    }
  }
};
</script>
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-line ref="line-1" :config="lineConfig1"></v-line>
      <v-line ref="line-2" :config="lineConfig2"></v-line>
      <v-line ref="line-3" :config="lineConfig3"></v-line>
      <v-group
        @click="handleClick(0)"
        @dragmove="handleDragMove1"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: stageSize.width / 5,
          y: stageSize.height / 2,
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
            radius: 50,
            fill: this.isDragging['line-1'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-1',
            x: -15,
            fill: isDragging['line-1'] ? 'white' : 'black'
          }"
        />
      </v-group>
      <v-group
        @click="handleClick(1)"
        @dragmove="handleDragMove2"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: 2*stageSize.width / 5,
          y: stageSize.height / 2,
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
            radius: 50,
            fill: this.isDragging['line-2'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-2',
            x: -15,
            fill: isDragging['line-2'] ? 'white' : 'black'
          }"
        />
      </v-group>

      <v-group
        @click="handleClick(2)"
        @dragmove="handleDragMove3"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: 3*stageSize.width / 5,
          y: stageSize.height / 2,
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
            radius: 50,
            fill: this.isDragging['line-3'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-3',
            x: -15,
            fill: isDragging['line-3'] ? 'white' : 'black'
          }"
        />
      </v-group>

      <v-group
        @click="handleClick(3)"
        @dragmove="handleDragMove4"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          x: 4*stageSize.width / 5,
          y: stageSize.height / 2,
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
        name="line-4"
      >
        <v-circle
          :config="{
            radius: 50,
            fill: this.isDragging['line-4'] ? 'blue' : 'red',
            stroke: 'black',
            strokeWidth: 2
          }"
        ></v-circle>
        <v-text
          :config="{
            text: 'Unit-4',
            x: -15,
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
        points: [width / 5, height / 2, (2 * width) / 5, height / 2],
        stroke: "black",
        tension: 1,
        pointerLength: 10,
        pointerWidth: 12
      },
      lineConfig2: {
        points: [(2 * width) / 5, height / 2, (3 * width) / 5, height / 2],
        stroke: "black",
        tension: 1
      },
      lineConfig3: {
        points: [(3 * width) / 5, height / 2, (4 * width) / 5, height / 2],
        stroke: "black",
        tension: 1
      },
      unitsPosisions: [
        { x: width / 5, y: height / 2 },
        { x: (2 * width) / 5, y: height / 2 },
        { x: (3 * width) / 5, y: height / 2 },
        { x: (4 * width) / 5, y: height / 2 }
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
    handleDragMove1(e) {
      var points = [
        e.target.position().x,
        e.target.position().y,
        this.$refs["line-1"].getStage().points()[2],
        this.$refs["line-1"].getStage().points()[3]
      ];
      this.$refs["line-1"].getStage().points(points);
    },
    handleDragMove2(e) {
      var points1 = [
        this.$refs["line-1"].getStage().points()[0],
        this.$refs["line-1"].getStage().points()[1],
        e.target.position().x,
        e.target.position().y
      ];

      var points2 = [
        e.target.position().x,
        e.target.position().y,
        this.$refs["line-2"].getStage().points()[2],
        this.$refs["line-2"].getStage().points()[3]
      ];

      this.$refs["line-1"].getStage().points(points1);
      this.$refs["line-2"].getStage().points(points2);
    },
    handleDragMove3(e) {
      var points1 = [
        this.$refs["line-2"].getStage().points()[0],
        this.$refs["line-2"].getStage().points()[1],
        e.target.position().x,
        e.target.position().y
      ];

      var points2 = [
        e.target.position().x,
        e.target.position().y,
        this.$refs["line-3"].getStage().points()[2],
        this.$refs["line-3"].getStage().points()[3]
      ];

      this.$refs["line-2"].getStage().points(points1);
      this.$refs["line-3"].getStage().points(points2);
    },
    handleDragMove4(e) {
      var points = [
        this.$refs["line-3"].getStage().points()[0],
        this.$refs["line-3"].getStage().points()[1],
        e.target.position().x,
        e.target.position().y
      ];
      this.$refs["line-3"].getStage().points(points);
    },
    handleDragStart(e) {
      this.isDragging[e.target.attrs.name] = true;
    },
    handleDragEnd(e) {
      this.isDragging[e.target.attrs.name] = false;
    }
  }
};
</script>
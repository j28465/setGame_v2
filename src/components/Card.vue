<template>
  <div :data-ary="target.dt" class="card" :class="target.color" :style="target.style">
    <div @click="emit('chooseCard', $event.target)">
      <i v-for="i in target.ct" :key="i" v-html="target.iconfont"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import CSS from "csstype";
// eslint-disable-next-line no-undef
const props = defineProps({
  v: { type: String, required: true },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["chooseCard"]);
//Card Detail
class cardPack {
  color: string;
  iconfont: string;
  style: CSS.Properties;
  dt: string;
  ct: number;

  constructor() {
    this.color = "";
    this.iconfont = "";
    this.style = {};
    this.dt = "";
    this.ct = 0;
  }
}
const target = new cardPack();
if (props.v.length > 0) {
  //拆成NUMBER陣列
  let p: number[] = props.v.split(",").map((v) => Number(v));
  //形狀, 填充
  switch (p[0]) {
    //circle
    case 1:
      target.iconfont = "&#xa00" + p[2];
      target.style.transform = "rotate(180deg)";
      break;
    //square
    case 2:
      target.iconfont = "&#xb00" + p[2];
      break;
    //star
    case 3:
      target.iconfont = "&#xc00" + p[2];
      target.style.fontWeight = "bolder";
      break;
  }
  //顏色
  switch (p[1]) {
    case 1:
      target.color = "red";
      break;
    case 2:
      target.color = "green";
      break;
    case 3:
      target.color = "blue";
      break;
  }
  //數量
  target.ct = p[3];
  //data
  target.dt = p.join(",");
}
</script>

<style lang="scss">
@font-face {
  src: url("../css/fonts/icomoon.eot?v00024"), url("../css/fonts/icomoon.eot?#iefixv00024") format("embedded-opentype"), url("../css/fonts/icomoon.woff?v00024") format("woff"),
    url("../css/fonts/icomoon.ttf?v00024") format("truetype"), url("../css/fonts/icomoon.svg?v00024#icomoon") format("svg");
  font: {
    family: "icomoon";
    style: normal;
    weight: normal;
  }
}
.card {
  cursor: pointer;
  font-size: 2.8vw;
  justify-content: space-between;
  line-height: 2em;
  margin: 0.2%;
  width: 25%-0.4%;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  &.red {
    color: #c90202;
  }
  &.green {
    color: #1b6206;
  }
  &.blue {
    color: #001eca;
  }
  > div {
    background: #fff;
    border: 1px solid #ccc;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    margin: 1px;
    height: 2em;
    &:hover {
      border-color: #146ebe;
    }
    i {
      font: {
        family: "icomoon";
        style: normal;
        variant: normal;
      }
      text-transform: none;
      margin: 0 1px;
      -webkit-text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-text-rendering: optimizeLegibility;
      -moz-font-smoothing: antialiased;
      -ms-text-rendering: optimizeLegibility;
      -ms-font-smoothing: antialiased;
      -o-text-rendering: optimizeLegibility;
      -o-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
  }
}
</style>

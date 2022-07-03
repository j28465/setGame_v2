<template>
  <div :data-ary="target.dt" class="card" :class="[target.color, lock ? 'lock' : '']" :style="target.style">
    <div @click="emit('chooseCard', $event.target)">
      <i v-for="i in target.ct" :key="i" v-html="target.iconfont"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import CSS from 'csstype';
// eslint-disable-next-line no-undef
const props = defineProps({
  v: { type: String, required: true },
  lock: { type: Boolean },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(['chooseCard']);
//Card Detail
class cardPack {
  color: string;
  iconfont: string;
  style: CSS.Properties;
  dt: string;
  ct: number;

  constructor() {
    this.color = '';
    this.iconfont = '';
    this.style = {};
    this.dt = '';
    this.ct = 0;
  }
}
const target = new cardPack();
if (props.v.length > 0) {
  //拆成NUMBER陣列
  let p: number[] = props.v.split(',').map((v) => Number(v));
  //形狀, 填充
  switch (p[0]) {
    //circle
    case 1:
      target.iconfont = '&#xa00' + p[2];
      target.style.transform = 'rotate(180deg)';
      break;
    //square
    case 2:
      target.iconfont = '&#xb00' + p[2];
      break;
    //star
    case 3:
      target.iconfont = '&#xc00' + p[2];
      target.style.fontWeight = 'bolder';
      break;
  }
  //顏色
  switch (p[1]) {
    case 1:
      target.color = 'red';
      break;
    case 2:
      target.color = 'green';
      break;
    case 3:
      target.color = 'blue';
      break;
  }
  //數量
  target.ct = p[3];
  //data
  target.dt = p.join(',');
}
</script>

<style lang="scss">
@font-face {
  src: url('../css/cards/icomoon.eot?v00024'), url('../css/cards/icomoon.eot?#iefixv00024') format('embedded-opentype'), url('../css/cards/icomoon.woff?v00024') format('woff'),
    url('../css/cards/icomoon.ttf?v00024') format('truetype'), url('../css/cards/icomoon.svg?v00024#icomoon') format('svg');
  font: {
    family: 'icomoon';
    style: normal;
    weight: normal;
  }
}
.card {
  cursor: pointer;
  font-size: 2.8vw;
  display: flex;
  justify-content: center;
  margin: 3px 0;
  width: 25%;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  &.red {
    color: #b63c3a;
  }
  &.green {
    color: #648a55; //a5d3b2
  }
  &.blue {
    color: #415a6b;
  }
  &.lock {
    > div {
      background: #f3d877;
      border-color: #146ebe;
    }
  }
  > div {
    background: #fff;
    border: 1px solid #ccc;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    margin: 0 2px;
    display: flex;
    flex-wrap: wrap;
    height: 113.5px;
    justify-content: center;
    align-content: center;
    width: 65px;
    &:hover {
      border-color: #183153;
    }
    i {
      font-size: 36px;
    }
  }
}
@media (min-width: 576px) {
  .card{
    > div {
      width: 100%;
      height: auto;
      i {
        line-height: 2em;
      }
    }
  }
}
</style>

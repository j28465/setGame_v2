<template>
  <div id="index">
    <div>
      <h4>遊戲等級</h4>
      <div id="level">
        <label><input type="radio" value="1" v-model="lib.level" />新手(18張牌)</label>
        <label><input type="radio" value="2" v-model="lib.level" />初級(36張牌)</label>
        <label><input type="radio" value="3" v-model="lib.level" />中級(54張牌)</label>
        <label><input type="radio" value="4" v-model="lib.level" />正式開始(81張牌)</label>
      </div>
      <div id="btn">
        <Button title="遊戲開始" name="start" @onClick="start"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/Button.vue';
import { onMounted } from 'vue-demi';
import { libStore } from '../store/lib';
import router from '@/router';
const lib = libStore()
onMounted(() => {
  lib.level = 1;
  lib.msgState = false;
});
const start = () => {
  router.push('/Park');
};
</script>

<style lang="scss">
#index {
  // margin-top: 28px;
  display: flex;
  height: 100vh;
  align-items: center;
  > div {
    max-width: 606px;
    #level {
      align-content: space-between;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      span {
        color: #5f697d;
      }
      label {
        background: #fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border: {
          style: solid;
          color: #fff;
          radius: 20px;
          width: 1px;
        }
        cursor: pointer;
        margin: 8px 4px;
        padding: 8px 10px;
        &:hover {
          border-color: #183153;
        }
      }
    }
    #btn {
      margin-top: 18px;
    }
  }
}
</style>

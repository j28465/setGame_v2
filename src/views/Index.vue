<template>
  <div id="index">
    遊戲等級：
    <label><input type="radio" value="1" v-model="lib.level" />新手(18張牌)</label>
    <label><input type="radio" value="2" v-model="lib.level" />中級(36張牌)</label>
    <label><input type="radio" value="3" v-model="lib.level" />高級(54張牌)</label>
    <label><input type="radio" value="4" v-model="lib.level" />正式開始(81張牌)</label>
    <div id="btn">
      <Button title="遊戲開始" name="start" @onClick="start"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../components/Button.vue";
import { onMounted } from "vue-demi";
import { libStore } from "../store/lib";
import router from "@/router";
const lib = libStore();
onMounted(() => {
  lib.level = 1;
  lib.msgState = false;
});
const start = () => {
  router.push("/Park");
};
</script>

<style lang="scss">
#index {
  margin-top: 18px;
  label {
    margin-left: 8px;
  }
  #btn {
    margin-top: 18px;
  }
}
</style>

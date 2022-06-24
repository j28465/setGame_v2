<template>
  <div>
    遊戲等級：
    <label><input type="radio" value="1" v-model="lib.level" />新手(18張牌)</label>
    <label><input type="radio" value="2" v-model="lib.level" />中級(36張牌)</label>
    <label><input type="radio" value="3" v-model="lib.level" />高級(54張牌)</label>
    <label><input type="radio" value="4" v-model="lib.level" />正式開始(81張牌)</label>
    <br />
    <router-link to="/Park">遊戲開始</router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue-demi';
import { libStore } from '../store/lib';
const lib = libStore();
onMounted(() => {
  lib.level = 1;
});
</script>

<style lang="sass">
label
    margin-left: 8px
</style>

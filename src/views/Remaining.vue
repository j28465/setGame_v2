<template>
  <div id="remain">
    <div id="menu">
      <div id="menuBlock">
        <Button title="回到遊戲" @onClick="back"></Button>
      </div>
    </div>
    <div id="tableBoard">
      <div id="tableBlock">
        <Card v-for="c in lib.cards" :key="c" :v="c.join(',')"></Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/Button.vue';
import Card from '@/components/Card.vue';
import { libStore } from '../store/lib';
import router from '@/router';
const lib = libStore();
const back = () => {
  router.push('/Park');
};
</script>

<style lang="scss">
@media (min-width: 35rem) {
  #menuBlock,
  #block {
    width: 746px;
  }
}
#remain {
  width: 100%;
  #menu {
    background: #fff;
    padding: 18px 0;
    display: flex;
    justify-content: center;
    #menuBlock {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      align-items: baseline;
    }
  }
  #tableBoard {
    display: flex;
    justify-content: center;
    padding-top: 18px;
    #tableBlock {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
</style>

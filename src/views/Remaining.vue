<template>
  <div id="remain">
    <div id="bar">
      <div class="block">
        <Button title="回到遊戲" @onClick="back"></Button>
      </div>
    </div>
    <div id="tableBoard">
      <div class="block">
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
.blockMax {
  display: flex;
  width: 100%;
  max-width: 746px;
  padding: 0 10px;
}
#remain {
  width: 100%;
  #bar {
    background: #fff;
    display: flex;
    justify-content: center;
    .block {
      @extend .blockMax;
      font-size: 16px;
      justify-content: space-between;
      align-items: baseline;
    }
  }
  #tableBoard {
    display: flex;
    justify-content: center;
    padding-top: 18px;
    .block {
      @extend .blockMax;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
@media (min-width: 768px) {
  #remain {
    #bar {
      padding: 18px 0;
    }
  }
}
</style>

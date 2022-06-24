<template>
  <div id="remain">
    <Card v-for="c in lib.cards" :key="c" :v="c.join(',')"></Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import { libStore } from '../store/lib';
const lib = libStore();
</script>

<style lang="scss">
@media (min-width: 35rem) {
  #remain {
    width: 746px;
  }
}
#remain {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>

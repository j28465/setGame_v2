<template>
  <div>
    <h1>404</h1>
    <h2 style="opacity: 0.4">Oops. Nothing here...</h2>
    <h3>{{ sec }}秒後自動轉回首頁</h3>
    <div>
      <Button label="回首頁" @onClick="$router.push('/')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import Button from '../components/Button.vue';
const sec = ref<number>(3);
const interval = setInterval(() => {
  sec.value -= 1;
  if (sec.value <= 0) {
    window.clearInterval(interval);
    router.push('/');
  }
}, 1000);
</script>

<style lang="scss">
h3 {
  font-weight: normal;
}
</style>

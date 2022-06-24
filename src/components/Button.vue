<template>
  <button type="button" @click="emit('onClick')">{{ props.title }}</button>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
  title: { type: String, required: true },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["onClick"]);
</script>

<style lang="scss">
button {
  background: #fff;
  border: {
    color: #f0f1f3;
    font-weight: 600;
    style: solid;
    width: 2px;
  }
  // border: 2px solid #f0f1f3;
  color: #183153;
  cursor: pointer;
  font-size: 14px;
  padding: 15px 24px;
  &:hover {
    border-color: #183153;
  }
  &:first-child {
    -webkit-border-top-left-radius: 8px;
    -moz-border-top-left-radius: 8px;
    border-top-left-radius: 8px;
    -webkit-border-bottom-left-radius: 8px;
    -moz-border-bottom-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    -webkit-border-top-right-radius: 8px;
    -moz-border-top-right-radius: 8px;
    border-top-right-radius: 8px;
    -webkit-border-bottom-right-radius: 8px;
    -moz-border-bottom-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>

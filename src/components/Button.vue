<template>
  <button type="button" @click="emit('onClick')" :style="props.style" :disabled="props.disabled" :class="[props.disabled ? 'lock' : '']">
    <i v-if="props.icon !== undefined">{{ props.icon }}</i>
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
  label: { type: String },
  icon: { type: String },
  style: { type: String },
  disabled: { type: Boolean },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(['onClick']);
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
  &.lock {
    background: #f0f1f3;
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
//有Hover功能
@media (hover: hover) {
  button {
    &:hover {
      border-color: #183153;
    }
  }
}
</style>

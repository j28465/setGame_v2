<template>
  <div class="msgBox" v-show="open">
    <div class="msgBg"></div>
    <div class="msgLayout">
      <div class="msgClose">
        <b @click="emit('closeMsgBox')">x</b>
      </div>
      <div class="msgTitle">{{ props.title }}</div>
      <div class="msgDesc">{{ props.desc }}</div>
      <div class="msgCmd">
        <div>
          <span v-if="props.btnL != null"><Button style="padding: 4px 16px" :title="props.btnL" @onClick="emit('clickBtnL')"></Button></span>
        </div>
        <div>
          <span v-if="props.btnR != null"><Button style="padding: 4px 16px" :title="props.btnR" @onClick="emit('clickBtnR')"></Button></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { libStore } from '../store/lib';
const lib = libStore();
// eslint-disable-next-line no-undef
const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  btnL: { type: String },
  btnR: { type: String },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeMsgBox', 'clickBtnL', 'clickBtnR']);
</script>

<style lang="scss">
.msgBox {
  .msgBg {
    background: rgba(81, 94, 123, 0.5);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .msgLayout {
    background-color: #fff;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    left: 50%;
    margin-left: -175px;
    max-width: 350px;
    padding: 10px 18px;
    position: absolute;
    top: 100px;
    width: 90%;
    z-index: 1001;
    .msgClose {
      display: flex;
      justify-content: flex-end;
      b {
        color: #c3c6d1;
        cursor: pointer;
        font-size: 20px;
      }
    }
    .msgTitle {
      color: #146ebe;
      font-size: 16px;
    }
    .msgDesc {
      font-size: 13px;
      padding-bottom: 23px;
    }
    .msgCmd {
      // &:before {
      //   content: '';
      //   border: 1px solid #146ebe;
      // }
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

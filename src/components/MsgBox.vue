<template>
  <div class="msgBox" v-show="lib.msgState">
    <div class="msgBg"></div>
    <div class="msgLayout">
      <div class="msgClose">
        <b @click="lib.msgState = false">x</b>
      </div>
      <div class="msgTitle">{{ lib.msgTitle }}</div>
      <div class="msgDesc">{{ lib.msgDesc }}</div>
      <div class="msgCmd">
        <slot name="cmd"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { libStore } from '../store/lib';
const lib = libStore();
</script>

<style lang="scss">
.msgBox {
  z-index: 999;
  .msgBg {
    background: rgba(81, 94, 123, 0.5);
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
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
    }
  }
}
</style>

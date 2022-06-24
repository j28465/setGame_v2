<template>
  <div id="content">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  background: #f0f1f3;
  color: #183153;
  cursor: default;
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
  #content {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>

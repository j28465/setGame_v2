<template>
  <div id="content">
    <router-view />
  </div>
</template>

<style lang="scss">
@font-face {
  src: url('css/fonts/icomoon.eot?v00024'), url('css/fonts/icomoon.eot?#iefixv00024') format('embedded-opentype'), url('css/fonts/icomoon.woff?v00024') format('woff'),
    url('css/fonts/icomoon.ttf?v00024') format('truetype'), url('css/fonts/icomoon.svg?v00024#icomoon') format('svg');
  font: {
    family: 'icomoon';
    style: normal;
    weight: normal;
  }
}
html,
body {
  background: #f0f1f3;
  color: #183153;
  cursor: default;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
  #content {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  i {
    font: {
      family: 'icomoon';
      style: normal;
      size: 24px;
      variant: normal;
    }
    text-transform: none;
    margin: 0 1px;
    -webkit-text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-text-rendering: optimizeLegibility;
    -moz-font-smoothing: antialiased;
    -ms-text-rendering: optimizeLegibility;
    -ms-font-smoothing: antialiased;
    -o-text-rendering: optimizeLegibility;
    -o-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
}
</style>

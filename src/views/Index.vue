<template>
  <div id="index">
    <div>
      <h1>ＳＥＴ</h1>
      <h4>遊戲等級</h4>
      <div id="level">
        <label><input type="radio" value="1" v-model="lib.level" />新手(18張牌)</label>
        <label><input type="radio" value="2" v-model="lib.level" />初級(36張牌)</label>
        <label><input type="radio" value="3" v-model="lib.level" />中級(54張牌)</label>
        <label><input type="radio" value="4" v-model="lib.level" />正式開始(81張牌)</label>
      </div>
      <div id="btn">
        <Button label="遊戲開始" name="start" @onClick="start" />
      </div>
      <div id="rule">
        <ul>
          <li>
            <div><b>規則說明</b></div>
            <div>將牌桌上任意三張牌組合成SET</div>
            <div>當牌庫用盡，且場上無法再組出SET，遊戲結束</div>
          </li>
          <li>
            <div>每張牌有四種特徵「形狀」「顏色」「填充」「數量」</div>
            <div>
              形狀：
              <Card v="1,1,1,1"></Card>
              <Card v="2,1,1,1"></Card>
              <Card v="3,1,1,1"></Card>
            </div>
            <div>
              顏色：
              <Card v="1,1,1,1"></Card>
              <Card v="1,2,1,1"></Card>
              <Card v="1,3,1,1"></Card>
            </div>
            <div>
              填充：
              <Card v="1,1,1,1"></Card>
              <Card v="1,1,2,1"></Card>
              <Card v="1,1,3,1"></Card>
            </div>
            <div>
              數量：
              <Card v="1,1,1,1"></Card>
              <Card v="1,1,1,2"></Card>
              <Card v="1,1,1,3"></Card>
            </div>
            <div>可以分別說出四種特徵為「相同」或「不同」為一組SET</div>
          </li>
          <li>
            <div>
              成功：
              <Card v="1,2,1,1"></Card>
              <Card v="2,1,2,2"></Card>
              <Card v="3,3,3,3"></Card>
            </div>
            <table>
              <tr>
                <th>狀態</th>
                <th>形狀</th>
                <th>顏色</th>
                <th>填充</th>
                <th>數量</th>
              </tr>
              <tr>
                <th>判定</th>
                <td>不同</td>
                <td>不同</td>
                <td>不同</td>
                <td>不同</td>
              </tr>
            </table>
          </li>
          <li>
            <div>
              成功：
              <Card v="1,2,1,1"></Card>
              <Card v="2,2,2,1"></Card>
              <Card v="3,2,3,1"></Card>
            </div>
            <table>
              <tr>
                <th>狀態</th>
                <th>形狀</th>
                <th>顏色</th>
                <th>填充</th>
                <th>數量</th>
              </tr>
              <tr>
                <th>判定</th>
                <td>不同</td>
                <td>同</td>
                <td>不同</td>
                <td>同</td>
              </tr>
            </table>
          </li>
          <li>
            <div>
              失敗：
              <Card v="1,2,1,1"></Card>
              <Card v="2,2,1,1"></Card>
              <Card v="3,2,3,1"></Card>
            </div>
            <table>
              <tr>
                <th>狀態</th>
                <th>形狀</th>
                <th>顏色</th>
                <th>填充</th>
                <th>數量</th>
              </tr>
              <tr>
                <th>判定</th>
                <td>不同</td>
                <td>同</td>
                <td class="error">？</td>
                <td>同</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import { onMounted } from 'vue-demi';
import { libStore } from '../store/lib';
import router from '@/router';
const lib = libStore();
onMounted(() => {
  lib.level = 1;
  lib.msgState = false;
});
const start = () => {
  lib.tableTopCards.length = 0;
  router.push('/Park');
};
</script>

<style lang="scss">
#index {
  // margin-top: 28px;
  display: flex;
  height: 100vh;
  align-items: flex-start;
  max-width: 606px;
  width: 100%;
  > div {
    #level {
      align-content: space-between;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      span {
        color: #5f697d;
      }
      label {
        background: #fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border: {
          style: solid;
          color: #fff;
          radius: 20px;
          width: 1px;
        }
        cursor: pointer;
        margin: 8px 4px;
        padding: 8px 10px;
        &:hover {
          border-color: #183153;
        }
      }
    }
    #btn {
      margin-top: 1em;
    }
    #rule {
      background: #fff;
      border: 3px solid #183153;
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      height: calc(100vh - 38px);
      margin: 1em 1em;
      padding: 0 0.5em;
      overflow-y: auto;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          border: {
            color: #183153;
            style: solid;
            width: 0 0 1px;
          }
          padding: 8px;
          &:first-child {
            padding-top: 0;
          }
          &:last-child {
            border-width: 0;
            padding-bottom: 0;
          }
          > div {
            align-items: center;
            display: flex;
            justify-content: space-evenly;
          }
          > table {
            border-collapse: collapse;
            margin: 1em auto;
            max-width: 455px;
            width: 100%;
            tr {
              th {
                background: #8596af;
              }
              td {
                line-height: 2em;
              }
              th,
              td {
                border: 1px solid #183153;
                &.error {
                  color: #f00;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 576px) {
  #index {
    > div {
      #rule {
        padding: 1em 2em;
        ul {
          li {
            padding: 16px;
          }
        }
      }
    }
  }
}
</style>

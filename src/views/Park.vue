<template>
  <Msg
    @closeMsgBox="msg.open = false"
    :open="msg.open"
    :title="msg.title"
    :btnL="msg.btnL.label === null ? null : msg.btnL.label"
    :btnR="msg.btnR.label === null ? null : msg.btnR.label"
    @clickBtnL="clickBtnL"
    @clickBtnR="clickBtnR"
  ></Msg>
  <div id="park">
    <div id="bar">
      <div class="block">
        <div id="menu">
          <div id="minMenuBtn"><Button icon="&#xe901;" @onClick="minMeun = true" /></div>
          <div>
            <Button label="重選等級" @onClick="relevel" />
            <Button label="重新開始" @onClick="restart" />
            <Button label="沒答案" @onClick="hint" />
            <Button label="查看剩餘牌組" @onClick="remaining" :disabled="lib.cards.length === 0" />
          </div>
        </div>
        <div id="subMenu">
          {{ time }}<br />
          剩下{{ lib.cards.length }}張牌
        </div>
      </div>
    </div>
    <div id="minMeun">
      <div id="minMenuBg" v-show="minMeun" @click="minMeun = false"></div>
      <div id="minMenuBlock" :class="minMeun ? 'open' : ''">
        <div><Button icon="&#xe902;" @onClick="minMeun = false" /></div>
        <div><Button label="重選等級" @onClick="closeMinMenu(relevel)" /></div>
        <div><Button label="重新開始" @onClick="closeMinMenu(restart)" /></div>
        <div><Button label="沒答案" @onClick="closeMinMenu(hint)" /></div>
        <div><Button label="查看剩餘牌組" @onClick="closeMinMenu(remaining)" :disabled="lib.cards.length === 0" /></div>
      </div>
    </div>
    <div id="tableBoard">
      <div class="block">
        <Card v-for="c in lib.tableTopCards" :key="c" :v="c.join(',')" @chooseCard="choose" :lock="isItemInArray(clickCards, c) >= 0" :hover="true"></Card>
      </div>
    </div>
  </div>
  <div id="lockBox" v-show="lockState"><div id="lockBg"></div></div>
</template>

<script setup lang="ts">
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';
import Msg from '../components/MsgBox.vue';
import { onMounted, ref } from 'vue-demi';
import { libStore } from '../store/lib';
import { msgPack, msgBtnPack } from '../models/msgModels';
import router from '@/router';
const lib = libStore();
//遊戲時間
const time = ref<string>('00:00:00');
const Timer = ref<number>(0);
//計時器
function intervalStart() {
  Timer.value = setInterval(() => {
    let t = new Date().getTime() - lib.sDate.getTime();
    let st = new Date(t);
    time.value = PadLeft(st.getHours() + lib.timeZone, 2, '0') + ':' + PadLeft(st.getMinutes(), 2, '0') + ':' + PadLeft(st.getSeconds(), 2, '0');
  }, 1000);
}
//msgBox
const msg = ref<msgPack>({ open: false, title: '', btnL: { label: null, event: null } as msgBtnPack, btnR: { label: null, event: null } as msgBtnPack, desc: null });
const openMsg = (v: msgPack) => {
  msg.value.title = v.title;
  msg.value.desc = v.desc;
  msg.value.btnL = v.btnL === undefined ? ({ label: null, event: null } as msgBtnPack) : v.btnL;
  msg.value.btnR = v.btnR === undefined ? ({ label: null, event: null } as msgBtnPack) : v.btnR;
  msg.value.open = true;
};
const clickBtnL = () => {
  if (msg.value.btnL !== null) msg.value.btnL.event();
};
const clickBtnR = () => {
  if (msg.value.btnR !== null) msg.value.btnR.event();
};
//遮罩
const lockState = ref<boolean>(false);
//等級
const levelClass = ref<number[][]>([
  [2, 1],
  [2, 2],
  [3, 2],
  [3, 3],
]);
//已選擇的牌
const clickCards = ref<number[][]>([]);
//二維陣列indexOf
const isItemInArray = (array: number[][], item: number[]): number => {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] == item[0] && array[i][1] == item[1] && array[i][2] == item[2] && array[i][3] == item[3]) {
      return i;
    }
  }
  return -1;
};
//Menu
const minMeun = ref<boolean>(false);
onMounted(() => {
  if (lib.level > 0) {
    if (lib.tableTopCards.length == 0) start();
    else {
      time.value = '00:00:00';
      clearInterval(Timer.value);
      intervalStart();
    }
  } else router.push('/');
});
//重選等級
const home = () => {
  lib.tableTopCards.length = 0;
  router.push('/');
};
//發牌
const start = () => {
  pushCard();
  shuffleCards();
  dealCards(12);
  //計時
  time.value = '00:00:00';
  clearInterval(Timer.value);
  lib.sDate = new Date();
  intervalStart();
};
//產生牌組
const pushCard = () => {
  //清空
  lib.cards.length = 0;
  lib.tableTopCards.length = 0;
  //所選等級
  const lv: number[] = levelClass.value[lib.level - 1];
  //形狀
  for (let a = 1; a <= 3; ++a) {
    //顏色
    for (let b = 1; b <= 3; ++b) {
      //填充
      for (let c = 1; c <= lv[0]; ++c) {
        //數量
        for (let d = 1; d <= lv[1]; ++d) {
          lib.cards.push([a, b, c, d]);
        }
      }
    }
  }
};
//隨機排序
const shuffleCards = () => {
  let len: number = lib.cards.length;
  let index: number;
  let tmp: number[];
  while (len > 0) {
    index = Math.floor(Math.random() * len);
    len--;

    tmp = lib.cards[len];
    lib.cards[len] = lib.cards[index];
    lib.cards[index] = tmp;
  }
};
//依照要求張數發牌
const dealCards = (index: number) => {
  for (let i = 0; i < index; ++i) {
    lib.tableTopCards.push(lib.cards.pop() as number[]);
  }
};
//提示
const hint = () => {
  let ansCards: number[][] = createAns();
  if (ansCards.length > 0) {
    openMsg({
      title: '有答案',
      btnL: {
        label: '再想想',
        event: () => {
          msg.value.open = false;
        },
      },
      btnR: {
        label: '給我提示',
        event: () => {
          //有選擇牌
          if (clickCards.value) {
            //選擇的牌是否符合答案
            clickCards.value.forEach((e, i) => {
              let index = isItemInArray(ansCards, e);
              if (index < 0) {
                //取消選擇
                clickCards.value.splice(i, 1);
              } else {
                //已選擇, 刪除解答的牌
                ansCards.splice(index, 1);
              }
            });
          }
          //選擇
          clickCards.value.push(ansCards.pop() as number[]);
          //三張
          if (ansCards.length == 0) distribute(true);
          msg.value.open = false;
        },
      },
    } as msgPack);
  } else {
    //沒答案發牌
    if (lib.cards.length > 0) {
      dealCards(3);
    } else {
      clearInterval(Timer.value);
      openMsg({
        title: time.value + '<br />遊戲結束',
        btnL: { label: '重選等級', event: home },
        btnR: {
          label: '再玩一次',
          event: again,
        },
      } as msgPack);
    }
  }
};
//查看剩餘牌組
const remaining = () => {
  router.push('remaining');
};
//關閉小選單
const closeMinMenu = (func: any) => {
  func();
  minMeun.value = false;
};
//選取card
const choose = (event: any) => {
  //選取的card
  let target: HTMLElement = event;
  while (!target.classList.contains('card')) {
    target = target.parentNode as HTMLElement;
  }
  //值
  let ary = target.getAttribute('data-ary');
  if (ary) {
    let target = ary.split(',').map((v) => parseInt(v)) as number[];
    let index = isItemInArray(clickCards.value, target);
    if (index >= 0) {
      //取消選擇
      clickCards.value.splice(index, 1);
    } else {
      clickCards.value.push(target);
      if (clickCards.value.length == 3) {
        //檢查所選牌組是否符合
        let jdg: boolean = verify(clickCards.value);
        //清空、(發牌)、解除反灰
        distribute(jdg);
      }
    }
  }
};
//檢查所選牌組是否符合
const verify = (ary: number[][]): boolean => {
  let jdg = true;
  for (let i = 0; i <= 3; ++i) {
    let tmp = 0;
    //三張牌
    for (var j = 0; j <= 2; ++j) {
      tmp += ary[j][i];
    }
    //有誤
    if (tmp % 3 > 0) {
      jdg = false;
      break;
    }
  }
  return jdg;
};
//補牌
const distribute = (jdg = true): void => {
  if (jdg) {
    //答對
    lockState.value = true;
    setTimeout(() => {
      clickCards.value.forEach((e) => {
        //答對的牌Index
        let index: number = isItemInArray(lib.tableTopCards, e);
        if (lib.tableTopCards.length > 12) {
          //超過12，刪除答對的牌
          lib.tableTopCards.splice(index, 1);
        } else {
          //下一張要發的牌
          let nextCard: number[] = lib.cards.length > 0 ? (lib.cards.pop() as number[]) : [];
          //清空或在同位置放上新的牌
          lib.tableTopCards.splice(index, 1, nextCard);
          //檢查是否破關
          let len: number[][] = lib.tableTopCards.filter((v: number[]) => v.length != 0);
          if (len.length == 0) {
            clearInterval(Timer.value);
            openMsg({
              title: time.value + '<br />遊戲結束',
              btnL: { label: '重選等級', event: home },
              btnR: {
                label: '再玩一次',
                event: again,
              },
            } as msgPack);
          }
        }
      });
      clickCards.value = [];
      lockState.value = false;
    }, 300);
  } else {
    //答錯
    lockState.value = true;
    setTimeout(function () {
      clickCards.value = [];
      lockState.value = false;
    }, 300);
    openMsg({ title: '答錯ㄌ' } as msgPack);
  }
};
//產生答案
function createAns(): number[][] {
  let jdg = false;
  let UnClickCards: number[][] = [];
  let tmp: number[][] = Array.from(clickCards.value);
  //還沒被選到的牌
  if (clickCards.value.length > 0) {
    lib.tableTopCards.forEach((e) => {
      if (e.length > 0 && isItemInArray(clickCards.value, e) < 0) UnClickCards.push(e);
    });
  } else UnClickCards = Array.from(lib.tableTopCards.filter((v) => v.length > 0));

  switch (tmp.length) {
    case 0:
      for (let t1 = 0; t1 < UnClickCards.length; ++t1) {
        for (let t2 = t1 + 1; t2 < UnClickCards.length; ++t2) {
          for (let t3 = t2 + 1; t3 < UnClickCards.length; ++t3) {
            tmp = clickCards.value.slice();
            tmp.push(UnClickCards[t1], UnClickCards[t2], UnClickCards[t3]);
            jdg = verify(tmp);
            if (jdg) break;
          }
          if (jdg) break;
        }
        if (jdg) break;
      }
      break;
    case 1:
      for (let t2 = 0; t2 < UnClickCards.length; ++t2) {
        for (let t3 = t2 + 1; t3 < UnClickCards.length; ++t3) {
          tmp = clickCards.value.slice();
          tmp.push(UnClickCards[t2], UnClickCards[t3]);
          jdg = verify(tmp);
          if (jdg) break;
        }
        if (jdg) break;
      }
      break;
    case 2:
      for (let t3 = 0; t3 < UnClickCards.length; ++t3) {
        tmp = clickCards.value.slice();
        tmp.push(UnClickCards[t3]);
        jdg = verify(tmp);
        if (jdg) break;
      }
      break;
  }
  //依照玩家所選擇的找不到解答
  if (!jdg && clickCards.value.length > 0) {
    clickCards.value.length = 0;
    return createAns();
  } else {
    return jdg ? tmp : [];
  }
}
//遊戲結束重新發牌
const again = () => {
  start();
  msg.value.open = false;
};
const restart = () => {
  openMsg({
    title: '確定要重新開始？',
    btnL: {
      label: '否',
      event: () => {
        msg.value.open = false;
      },
    },
    btnR: { label: '是', event: again },
  } as msgPack);
};
const relevel = () => {
  openMsg({
    title: '確定要重選等級？',
    btnL: {
      label: '否',
      event: () => {
        msg.value.open = false;
      },
    },
    btnR: { label: '是', event: home },
  } as msgPack);
};
//左邊補零
function PadLeft(v: number, len: number, s: string): string {
  let str = v.toString();
  while (str.length < len) {
    str = s + str;
  }
  return str;
}
</script>
<style lang="scss">
.blockMax {
  display: flex;
  width: 100%;
  max-width: 746px;
  padding: 0 10px;
}
.lockBg {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
}
#park {
  width: 100%;
  #bar {
    background: #fff;
    display: flex;
    justify-content: center;
    .block {
      @extend .blockMax;
      font-size: 16px;
      justify-content: space-between;
      align-items: center;
      #menu {
        #minMenuBtn {
          > button {
            border-width: 0;
            text-align: left;
          }
        }
        > div {
          &:last-child {
            display: none;
          }
        }
      }
      #subMenu {
        margin-right: 4px;
        text-align: right;
      }
    }
  }
  #minMeun {
    left: -100%;
    #minMenuBg {
      @extend .lockBg;
      background: rgba(81, 94, 123, 0.5);
    }
    #minMenuBlock {
      background: #e4e5e9;
      position: fixed;
      height: 100%;
      top: 0;
      left: -132px;
      width: 132px;
      z-index: 1001;
      transition: 0.4s;
      transition-timing-function: ease-in-out;
      overflow-y: auto;
      > div {
        > button {
          background: #e4e5e9;
          border-width: 0;
          text-align: left;
          width: 100%;
        }
      }
      &.open {
        left: 0;
      }
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
#lockBox {
  z-index: 999;
  #lockBg {
    @extend .lockBg;
  }
}
@media (min-width: 768px) {
  #park {
    #bar {
      padding: 18px 0;
      .block {
        #menu {
          > div {
            &:first-child {
              display: none;
            }
            &:last-child {
              display: inline-block;
            }
          }
        }
      }
    }
    #minMeun {
      display: none;
    }
  }
}
</style>

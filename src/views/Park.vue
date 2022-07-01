<template>
  <Msg @closeMsgBox="msg.open = false" :open="msg.open" :title="msg.title"></Msg>
  <Msg @closeMsgBox="queMsg.open = false" :open="queMsg.open" :title="queMsg.title" :btnL="queMsg.btnL" :btnR="queMsg.btnR" @clickBtnL="home" @clickBtnR="reStart"></Msg>
  <div id="park">
    <div id="menu">
      <div id="menuBlock">
        <div>
          <Button title="重選等級" @onClick="home"></Button>
          <Button title="重新開始" @onClick="start"></Button>
          <Button title="提示" @onClick="hint"></Button>
          <Button title="無解答" @onClick="noAns"></Button>
          <Button title="查看剩餘牌組" @onClick="$router.push('remaining')"></Button>
        </div>
        <div id="subMenu">剩下{{ lib.cards.length }}張牌</div>
      </div>
    </div>
    <div id="tableBoard" ref="tableBoard">
      <div id="tableBlock">
        <Card v-for="c in lib.tableTopCards" :key="c" :v="c.join(',')" @chooseCard="choose" :lock="isItemInArray(clickCards, c) >= 0"></Card>
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
import { msgPack } from '../models/msgModels';
import router from '@/router';
const lib = libStore();
//msgBox
const msg = ref<msgPack>({ open: false, title: '', btnL: null, btnR: null, desc: null });
const queMsg = ref<msgPack>({ open: false, title: '', btnL: null, btnR: null, desc: null });
const openMsg = (box: msgPack, title: string, desc: string | null = null, btnL: string | null = null, btnR: string | null = null) => {
  box.title = title;
  box.desc = desc;
  box.btnL = btnL;
  box.btnR = btnR;
  box.open = true;
};
//遊戲結束重新發牌
const reStart = () => {
  start();
  queMsg.value.open = false;
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
//牌桌ELEMENT
const tableBoard = ref<HTMLFormElement | null>(null);
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
onMounted(() => {
  if (lib.level > 0) {
    if (lib.tableTopCards.length == 0) start();
  } else router.push('/');
});
//重選等級
const home = () => {
  lib.tableTopCards.length = 0;
  router.push('/');
};
//重新發牌
const start = () => {
  pushCard();
  shuffleCards();
  dealCards(12);
};
//產生牌組
const pushCard = () => {
  //所選等級
  const lv: number[] = levelClass.value[lib.level - 1];
  //清空
  lib.cards = [];
  lib.tableTopCards = [];
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
            //lib.openMsg('恭喜清空破關');
            openMsg(queMsg.value, '恭喜清空破關', '', '重選等級', '再玩一次');
          }
        }
      });
      clickCards.value = [];
      lockState.value = false;
    }, 500);
  } else {
    //答錯
    lockState.value = true;
    setTimeout(function () {
      clickCards.value = [];
      lockState.value = false;
    }, 300);
    // lib.openMsg('答錯ㄌ');
    openMsg(msg.value, '答錯ㄌ');
  }
};
//提示
const hint = () => {
  let ansCards: number[][] = createAns();
  if (ansCards.length > 0) {
    //有答案
    if (clickCards.value) {
      //有選擇牌
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
  } else {
    //沒答案發牌
    if (lib.cards.length > 0) {
      dealCards(3);
    } else {
      //clearInterval(Timer);
      // lib.openMsg('遊戲結束');
      openMsg(queMsg.value, '遊戲結束', '', '重選等級', '再玩一次');
    }
  }
};
//沒答案
const noAns = () => {
  let ansCards = createAns();
  if (ansCards.length > 0) {
    // lib.openMsg('有答案');
    openMsg(msg.value, '有答案');
  } else {
    // lib.openMsg('沒答案');
    openMsg(msg.value, '沒答案');
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
</script>
<style lang="scss">
@media (min-width: 35rem) {
  #menuBlock,
  #tableBlock {
    width: 746px;
  }
}
#park {
  width: 100%;
  #menu {
    background: #fff;
    padding: 18px 0;
    display: flex;
    justify-content: center;
    #menuBlock {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      align-items: baseline;
      #subMenu {
        margin-right: 4px;
      }
    }
  }
  #tableBoard {
    display: flex;
    justify-content: center;
    padding-top: 18px;
    #tableBlock {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
#lockBox {
  z-index: 999;
  #lockBg {
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
  }
}
</style>

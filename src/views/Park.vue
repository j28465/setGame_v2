<template>
  <Msg></Msg>
  <div id="park">
    <div id="menu">
      <div id="menuBlock">
        <div>
          <Button title="重新開始" name="start" @onClick="start"></Button>
          <Button title="提示or無解答" name="start" @onClick="hintClick"></Button>
          <Button title="剩下牌組" name="start" @onClick="$router.push('remaining')"></Button>
        </div>
        <div id="subMenu">剩下{{ lib.cards.length }}張牌</div>
      </div>
    </div>
    <div id="tableBoard" ref="tableBoard">
      <div id="tableBlock">
        <Card v-for="c in lib.tableTopCards" :key="c" :v="c.join(',')" @chooseCard="choose"></Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import Msg from "../components/MsgBox.vue";
import { onMounted, ref } from "vue-demi";
import { libStore } from "../store/lib";
import router from "@/router";
const lib = libStore();
const levelClass = ref<number[][]>([
  [2, 1],
  [2, 2],
  [3, 2],
  [3, 3],
]);
//牌桌ELEMENT
const tableBoard = ref<HTMLFormElement | null>(null);
//已選擇的牌
const clickAry = ref<number[][]>([]);
//提示的牌
const hintCards = ref<number[][]>([]);
onMounted(() => {
  if (lib.level > 0) {
    if (lib.tableTopCards.length == 0) start();
  } else router.push("/");
});
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
//發牌
const dealCards = (index: number) => {
  for (let i = 0; i < index; ++i) {
    lib.tableTopCards.push(lib.cards.pop() as number[]);
  }
};
//清空或在同位置放上新的牌
const changeCard = (index: number) => {
  let c = lib.cards.pop();
  lib.tableTopCards[index] = c ? c : [];
};
//移除這張牌
const removeCard = (index: number) => {
  lib.tableTopCards.splice(index, 1);
};
//符合答案的提示牌組
const pushHintCards = (card: number[][]): void => {
  hintCards.value = [];
  card.forEach((index: number[]) => {
    hintCards.value.push(index);
  });
};
//選取card
const choose = (event: any) => {
  //選取的card
  let target: HTMLElement = event;
  while (!target.classList.contains("card")) {
    target = target.parentNode as HTMLElement;
  }
  //值
  let ary = target.getAttribute("data-ary");
  if (ary) {
    if (target.classList.contains("lock")) {
      //取消選擇
      var index = clickAry.value.indexOf(ary.split(",").map((v) => parseInt(v)) as number[]);
      clickAry.value.splice(index, 1);
      target.classList.remove("lock");
    } else {
      clickAry.value.push(ary.split(",").map((v) => parseInt(v)) as number[]);
      target.classList.add("lock");
      if (clickAry.value.length == 3) {
        //檢查所選牌組是否符合
        let jdg: boolean = verify(clickAry.value);
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
  //清空
  clickAry.value = [];
  //答對
  if (jdg) {
    setTimeout(() => {
      //被刪除的牌INDEX
      let rmIndex = 0;
      document.querySelectorAll("#tableBoard .card").forEach((e, i) => {
        if (e.classList.contains("lock")) {
          if (lib.tableTopCards.length > 12) {
            //刪除外框
            e.remove();
            //清除現在檯面上被選走的牌
            removeCard(i - rmIndex);
            rmIndex++;
          } else {
            //清空或在同位置放上新的牌
            changeCard(i);
            let len: number[][] = lib.tableTopCards.filter((v: number[]) => v.length != 0);
            if (len.length == 0) lib.openMsg("遊戲結束");
          }
        }
      });
      //解除反灰
      document.querySelectorAll("#tableBoard div.lock").forEach(function (e) {
        e.classList.remove("lock");
      });
    }, 500);
  } else {
    //解除反灰
    setTimeout(function () {
      document.querySelectorAll("#tableBoard div.lock").forEach(function (e) {
        e.classList.remove("lock");
      });
    }, 300);
    lib.openMsg("答錯ㄌ");
  }
};
//提示or無解答
const hintClick = (): void => {
  if (hintCards.value.length > 0) {
    //選擇第二或三張牌
    let target: number[] = hintCards.value.pop() as number[];
    clickAry.value.push(target);
    document.querySelectorAll("#tableBoard div[data-ary='" + target.join(",") + "']")[0].classList.add("lock");
    //第三張牌的話，清空、(發牌)、解除反灰
    if (hintCards.value.length == 0) distribute();
  } else {
    let jdg = false;
    //產生一組解答
    let len = lib.tableTopCards.length;
    for (let t1 = 0; t1 < len; ++t1) {
      if (lib.tableTopCards[t1].length > 0) {
        for (let t2 = t1 + 1; t2 < len; ++t2) {
          if (lib.tableTopCards[t2].length > 0) {
            for (let t3 = t2 + 1; t3 < len; ++t3) {
              if (lib.tableTopCards[t3].length > 0) {
                let tmp: number[][] = [lib.tableTopCards[t1], lib.tableTopCards[t2], lib.tableTopCards[t3]];
                jdg = verify(tmp);

                if (jdg) {
                  pushHintCards(tmp);
                  break;
                }
              }
            }
            if (jdg) break;
          }
        }
        if (jdg) break;
      }
    }
    //有無解答
    if (jdg) {
      //清空所選
      clickAry.value = [];
      //解除全部反灰
      document.querySelectorAll("#tableBoard div.lock").forEach(function (e) {
        e.classList.remove("lock");
      });
      //選擇第一張牌
      hintClick();
    } else {
      //沒答案發牌
      if (lib.cards.length > 0) {
        dealCards(3);
      } else {
        //clearInterval(Timer);
        lib.openMsg("遊戲結束");
      }
    }
  }
};
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
      .card {
        &.lock {
          > div {
            background: #ffd43b;
            border-color: #146ebe;
          }
        }
      }
    }
  }
}
</style>

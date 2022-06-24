import { defineStore } from "pinia";

export const libStore = defineStore("lib", {
  state: () => ({
    //所選等級
    level: 0 as number,
    //所有牌
    cards: [] as number[][],
    //桌上的牌(返回時判斷是否需保留資料)
    tableTopCards: [] as number[][],
    //提醒視窗
    msgState: false as boolean,
    msgTitle: "" as string,
    msgDesc: "" as string,
  }),
  actions: {
    openMsg(title: string, desc = "") {
      this.msgTitle = title;
      this.msgDesc = desc;
      this.msgState = true;
    },
  },
});

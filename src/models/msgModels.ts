export interface msgPack {
  open: boolean;
  title: string;
  desc: string | null;
  btnL: msgBtnPack | null;
  btnR: msgBtnPack | null;
}
export interface msgBtnPack {
  label: string | null;
  event: any | null;
}

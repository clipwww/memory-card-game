export enum EventEnum {
  Init = 'init',
  Timing = 'timing',
  ClickCard = 'clickCard',
  OpenCard = 'openCard',
  CardChecked = 'cardChecked',
  GameOver = 'gameOver',
}

export interface ConfigVM {
  el: string;
  cards: CardVM[];
  backImgSrc: string;
}

export interface CardVM {
  id: string;
  name: string; // 牌面名稱 (會有兩張一樣)
  imgSrc: string; // 牌面圖片
  checked?: boolean; // 是否已經驗證過 (翻開兩張一樣)
  isOpen?: boolean; // 是否被翻開
}

export enum EventEnum {
  Init = 'init',
  ImageLoaded = 'imageLoaded',
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
  columns?: number; // 一列幾張牌 default = 4
  checkFailedTime?: number; // 驗證失敗後留給使用者看牌面的時間（時間到就翻回去） default = 300
  openClass?: string; // 牌組翻開時的class  default = 'is-open'
}

export interface CardVM {
  id: string;
  name: string; // 牌面名稱 (會有兩張一樣)
  imgSrc: string; // 牌面圖片
  checked?: boolean; // 是否已經驗證過 (翻開兩張一樣)
  isOpen?: boolean; // 是否被翻開
}

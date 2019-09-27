# Memory Card Game

## 安裝
```
npm i @re/memory-card-game
```

## Example
```typescript
import { createMemoryCardGame, EventEnum } from '@re/memory-card-game';
import '@re/memory-card-game/dist/index.min.css'; // 也可自行定義css

const { $el, addEventListener, removeEventListener } = createMemoryCardGame(config);

addEventListener(EventEnum.GameOver, ({ cards, time }) => {
  alert(`遊戲結束，花費:${time}秒`);
});
```

##  Config
```javascript
const config = {
  el: '#js-card-wrap', // 塞入遊戲牌組的 selector
  backImgSrc: './images/img-card-f.png', // 卡牌背面圖片
  cards: [
    // 順序請自行打亂
    // 順序請自行打亂
    // 順序請自行打亂 (很重要所以說三次)
    { 
      id: '1', // 唯一識別值
      name: 'b01', // 卡牌名稱（同樣卡片的卡牌需要有相同名稱
      imgSrc: './images/img-card-b01.png' // 卡牌正面圖案 
    },
  ],
  columns?: 4, // 一列幾張牌 default = 4
  checkFailedTime?: 300, // 驗證失敗後留給使用者看牌面的時間（時間到就翻回去） default = 300(毫秒)
  openClass?: 'is-open'; // 牌組翻開時的class  default = 'is-open'
}

const { $el, addEventListener, removeEventListener } = createMemoryCardGame(config);
```

## Method 
| 名稱 | 參數 | 說明 | 回傳 |
|---|---|---|---|
| addEventListener | type: `string`, handler: `Function` | 註冊監聽事件 | |
| removeEventListener | type: `string`, handler: `Function` | 刪除監聽事件 | |

## Event
| 事件Type | 觸發時機 | 回調參數 | 
|---|---|---|
| `init` | 牌組初始化（render & bind event）完成 | { $el: `JQuery<HTMLElement>`, cards: `CardVM[]` } |
| `imageLoaded` | 圖片全部載入後<br/>原先在container上的class `is-loading` 會拿掉 | { images: `HTMLImageElement[]` } |
| `timing` | 計時的秒數每次+1時 | { mm: `string`, ss: `string` } |
| `clickCard` | 每次點擊卡牌時<br/>圖片尚未完全載入的話不會觸發 | { <br/>e: `JQuery.ClickEvent<HTMLElement, null, HTMLElement, HTMLElement>`,<br/> $card: `JQuery<HTMLElement>`,<br/> card: `CardVM`,<br/> cards: `CardVM[]`<br/> } |
| `openCard` | 牌被翻開時 |  { <br/>$card: `JQuery<HTMLElement>`,<br/> card: `CardVM`,<br/> cards: `CardVM[]`<br/> } |
| `cardChecked` | 兩張牌是同一張，驗證完成 | { openCards: `CardVM[]`, cards: `CardVM[]` } |
| `gameOver` | 全部翻開驗證完成，遊戲結束 | { cards: `CardVM[]`, time: `number` } |

```typescript
enum EventEnum {
  Init = 'init',
  ImageLoaded = 'imageLoaded',
  Timing = 'timing',
  ClickCard = 'clickCard',
  OpenCard = 'openCard',
  CardChecked = 'cardChecked',
  GameOver = 'gameOver',
}
```

## HTML結構
```html
<!-- is-loading 圖片尚在載入中 -->
<div {el} class="re-memory-card-game">
  <table class="re-memory-card-game__container">
    <tbody>
      <tr>
        <td selector="card" class="re-memory-card-game__item" data-id="{id}">
          <div class="front"><img src="{imgSrc}" alt="{name}" draggable="false"></div>
          <div class="back"><img src="{backImgSrc}" alt="{name}" draggable="false"></div>
        </td>
        <!-- 省略其他td -->
      </tr>
       <!-- 省略其他tr -->
    </tbody>
  </table>
</div>

```
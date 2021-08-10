import $ from 'jquery';
import dayjs from 'dayjs';

import { loadImage, createEventManager } from './lib';
import { ConfigVM, CardVM, EventEnum } from './view-models';



export {
  ConfigVM,
  EventEnum,
  CardVM,
};

export const createMemoryCardGame = (config: ConfigVM) => {
  const { el, backImgSrc, columns = 4, checkFailedTime = 300, openClass = 'is-open', showTime = 0 } = config;
  const $el: JQuery<HTMLElement> = $(el);

  const { addEventListener, removeEventListener, dispatchEvent } = createEventManager();
  const cards = config.cards.map(card => {
    return {
      ...card,
      checked: false,
      isOpen: false,
    };
  });

  let timeInterval: NodeJS.Timer = null; // 計時interval
  let time = 0; // 所花秒數

  let isLoading = false; // 遊戲載入中
  let isWait = false; // 是否等待驗證

  const init = (): void => {
    setLoading(true);
    $el.addClass('re-memory-card-game');

    render();
    bindEvent();

    const promiseArr: Promise<HTMLImageElement>[] = cards.map(card => loadImage(card.imgSrc)).concat(loadImage(backImgSrc));
    Promise.all(promiseArr).then(images => {
      setLoading(false);
      dispatchEvent(EventEnum.ImageLoaded, { images });
    });

    dispatchEvent(EventEnum.Init, { $el, cards });
  };

  const render = (): void => {
    const htmlString = cards.map((card, index) => {
      return `
      ${index % columns === 0 ? '<tr>' : ''}
        <td selector="card" class="re-memory-card-game__item ${openClass}" data-id="${card.id}">
          <div class="front"><img src="${card.imgSrc}" alt="${card.name}" draggable="false"></div>
          <div class="back"><img src="${backImgSrc}" alt="${card.name}" draggable="false"></div>
        </td>
      ${index % columns === (columns - 1) ? '</tr>' : ''}
      `;
    }).join('');

    $el.html(`
      <table class="re-memory-card-game__container">
        <tbody>${htmlString}</tbody>
      </table>
    `);

    setTimeout(() => {
      $(`[selector="card"]`).removeClass(openClass);
    }, showTime);
  };

  const bindEvent = (): void => {
    $('[selector="card"]').on('click', onCardClick);
  };

  const onCardClick = (e: JQuery.ClickEvent<HTMLElement, null, HTMLElement, HTMLElement>): void => {
    if (isLoading) {
      return;
    }

    if (!timeInterval) {
      // 尚未開始計時
      timingStart();
    }

    const $card = $(e.currentTarget);
    const id = $card.attr('data-id');
    const index = cards.findIndex(card => card.id === id);
    const isOpen = $card.hasClass(openClass);

    dispatchEvent(EventEnum.ClickCard, {
      e,
      $card,
      card: cards[index],
      cards,
    });

    if (!isWait && !isOpen && index >= 0) {
      // 沒有在檢查且沒有被翻開時才可以翻開
      cards[index].isOpen = true;
      $card.addClass(openClass);
      dispatchEvent(EventEnum.OpenCard, {
        $card,
        card: cards[index],
        cards,
      });
    }

    checkCard();
  };

  const checkCard = () => {
    // 檢查目前翻開的兩張牌是否為同樣的
    const openCards = cards.filter(card => card.isOpen);

    if (isWait || openCards.length !== 2) {
      return;
    }
    setWait(true);

    const [one, two] = openCards;
    const isOk = one.name === two.name;

    if (isOk) {
      // 兩張牌一樣 更改驗證狀態
      openCards.forEach((openCard) => {
        const index = cards.findIndex(card => openCard.id === card.id);
        cards[index].checked = true;
      });

      dispatchEvent(EventEnum.CardChecked, {
        openCards,
        cards,
      });

      // 檢查遊戲是否結束 驗證過的牌數量 = 全部牌數量
      const isEndGame = cards.filter(card => card.checked).length === cards.length;
      if (isEndGame) {
        onEndGame();
      }

      initCardStatus();
    } else {
      // 檢查完畢，如果是失敗的等一下在render（就算錯了也要讓使用者看一下牌）
      setTimeout(() => {
        initCardStatus();
      }, checkFailedTime);
    }
  };

  const initCardStatus = (): void => {
    // 初始化翻開的狀態跟
    cards.forEach((card, index) => {
      cards[index].isOpen = false;

      if (!card.checked) {
        // 尚未驗證完成的卡片必須翻回去
        $(`[selector="card"][data-id="${card.id}"]`).removeClass(openClass);
      }
    });
    setWait(false);
  };

  const timingStart = (): void => {
    timeInterval = setInterval(() => {
      time++;
      const $moment = dayjs('1970-01-01T00:00').add(time, 'second');

      dispatchEvent(EventEnum.Timing, {
        time,
        mm: $moment.format('mm'),
        ss: $moment.format('ss'),
      });
    }, 1000);
  };

  const onEndGame = (): void => {
    clearInterval(timeInterval);
    dispatchEvent(EventEnum.GameOver, {
      cards,
      time,
    });
  };

  const setLoading = (bool: boolean): void => {
    isLoading = bool;
    if (bool) {
      $el.addClass('is-loading');
    } else {
      $el.removeClass('is-loading');
    }
  };

  const setWait = (bool: boolean): void => {
    isWait = bool;
  };

  init();

  return {
    $el,
    addEventListener,
    removeEventListener,
  };
};


export function shuffle(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
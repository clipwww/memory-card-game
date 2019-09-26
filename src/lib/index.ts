export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise(reslove => {
    const image = new Image();
    image.src = url;

    if (image.complete) {
      // 圖片已經被載入
      reslove(image);
    } else {
      // 如果圖片未被載入，則設定載入時的回調
      image.onload = () => {
        reslove(image);
      };
    }
  });
};


export const createEventManager = () => {
  const eventRegistry: {
    [key: string]: Function[],
  } = {};

  const addEventListener = (type: string, handler: Function): void => {
    // 註冊監聽事件
    type = type.toLowerCase();

    if (!eventRegistry.hasOwnProperty(type)) {
      eventRegistry[type] = [];
    }

    if (eventRegistry[type].indexOf(handler) < 0) {
      eventRegistry[type].push(handler);
    }
  };

  const dispatchEvent = (type: string, ...arg: any): void => {
    // 觸發事件
    type = type.toLowerCase();

    if (!eventRegistry.hasOwnProperty(type)) {
      return;
    }

    const len = eventRegistry[type].length;

    for (let i = 0; i < len; i++) {
      eventRegistry[type][i].call(this, ...arg);
    }
  };

  return {
    addEventListener,
    dispatchEvent,
  };
};

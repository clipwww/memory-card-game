import { createMemoryCardGame, EventEnum } from '../src/index';

const { addEventListener } = createMemoryCardGame({
  el: '#app',
  backImgSrc: './images/img-card-f.png',
  columns: 4,
  cards: [
    { id: '1', name: 'b01', imgSrc: './images/img-card-b01.png' },
    { id: '2', name: 'b01', imgSrc: './images/img-card-b01.png' },
    { id: '3', name: 'b02', imgSrc: './images/img-card-b02.png' },
    { id: '4', name: 'b02', imgSrc: './images/img-card-b02.png' },
    { id: '5', name: 'b03', imgSrc: './images/img-card-b03.png' },
    { id: '6', name: 'b03', imgSrc: './images/img-card-b03.png' },
    { id: '7', name: 'b04', imgSrc: './images/img-card-b04.png' },
    { id: '8', name: 'b04', imgSrc: './images/img-card-b04.png' },
    { id: '9', name: 'b05', imgSrc: './images/img-card-b05.png' },
    { id: '10', name: 'b05', imgSrc: './images/img-card-b05.png' },
    { id: '11', name: 'b06', imgSrc: './images/img-card-b06.png' },
    { id: '12', name: 'b06', imgSrc: './images/img-card-b06.png' },
    { id: '13', name: 'b07', imgSrc: './images/img-card-b07.png' },
    { id: '14', name: 'b07', imgSrc: './images/img-card-b07.png' },
    { id: '15', name: 'b08', imgSrc: './images/img-card-b08.png' },
    { id: '16', name: 'b08', imgSrc: './images/img-card-b08.png' },
  ],
});


addEventListener(EventEnum.Timing, ({ mm, ss }) => {
  console.log(mm, ss);
});

addEventListener(EventEnum.GameOver, ({ cards, time }) => {
  alert(`遊戲結束，花費:${time}秒`);
});

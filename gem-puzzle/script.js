/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
const constants = {    
    RESET_GAME: 'reset',
    CONTINUE_GAME: 'continue',
    SAVE_GAME: 'save',
    
    };

const Gem = {
  constructor() {
    this.timer;
    localStorage.setItem('winners', '');
  },

  properties: {
    size: 3,
    countMove: 0,
    time: 0,
    sound: true,
    continue: false,
  },

  init() {
    document.body.innerHTML = '';
    document.body.appendChild(this.sizeArena());
    document.body.appendChild(this.createMenu());
    document.getElementById('Select1').options.selectedIndex = this.properties.size - 3;
    document.body.appendChild(this.countMoveEl());
    document.body.appendChild(this.timerEl());
    document.body.appendChild(this.winList());
    document.body.appendChild(this.createArena(this.properties.size));
  },

  createMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.appendChild(this.resetButton());
    menu.appendChild(this.saveButton());
    menu.appendChild(this.continueButton());
    menu.appendChild(this.soundButton());

    return menu;
  },

  countMoveEl() {
    const count = document.createElement('div');
    count.classList.add('counter');
    count.setAttribute('id', 'counter');
    count.textContent = this.properties.countMove;

    return count;
  },

  resetButton() {
    const button = document.createElement('button');
    button.classList.add('button-reset');
    button.textContent = constants.RESET_GAME;
    button.addEventListener('click', () => {
      this.properties.countMove = 0;
      this.properties.time = 0;
      this.init();
    });

    return button;
  },

  continueButton() {
    const button = document.createElement('button');
    button.classList.add('button-reset');
    button.textContent = constants.CONTINUE_GAME;

    button.addEventListener('click', () => {
      this.properties.continue = !this.properties.continue;
      document.getElementById('arena').innerHTML = localStorage.getItem('arrSave');
      this.properties.countMove = localStorage.getItem('counts');
      this.properties.time = +localStorage.getItem('time');
      this.properties.size = +localStorage.getItem('size');
      clearInterval(this.timer);
      this.init();
    });

    return button;
  },

  saveButton() {
    const button = document.createElement('button');
    button.classList.add('button-reset');
    button.textContent = constants.SAVE_GAME;

    button.addEventListener('click', () => {
      const arr = [];
      const arena = document.querySelectorAll('.wrap');

      Array.from(arena).forEach((el) => {
        el.firstChild === null ? arr.push(null) : arr.push(el.firstChild.textContent);
      });

      localStorage.setItem('arrSave', arr);
      localStorage.setItem('counts', this.properties.countMove);
      localStorage.setItem('time', this.properties.time);
      localStorage.setItem('size', this.properties.size);
    });

    return button;
  },
  createArena(sizeArena) {
    // eslint-disable-next-line no-restricted-properties
    const numGems = Math.pow(sizeArena, 2);
    const arena = document.createElement('div');
    const gemsize = 100;
    let arr = []; // arr of state
    arena.style.gridTemplate = `repeat(${sizeArena},  ${gemsize}px) / repeat(${sizeArena}, ${gemsize}px)`;
    arena.style.display = 'grid';
    arena.style.height = `${sizeArena * gemsize}px`;
    arena.style.width = `${sizeArena * gemsize}px`;
    arena.setAttribute('id', 'arena');
    arena.classList.add('arena');

    for (let i = 1; i < numGems; i++) {
      arr.push(i);
    }
    arr.sort(() => Math.random() - 0.5);

    if (this.properties.continue) {
      arr = localStorage.getItem('arrSave').split(',');
      this.properties.continue = !this.properties.continue;
    }

    for (let i = 0; i < numGems; i++) {
      const gem = document.createElement('div');
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrap');
      wrapper.setAttribute('id', i + 1);

      gem.classList.add('gem');
      gem.setAttribute('draggable', 'true');
      gem.textContent = arr[i];

      if (arr[i]) { wrapper.appendChild(gem); }
      arena.appendChild(wrapper);

      gem.addEventListener('click', () => {
        this.movebyclick(gem.parentElement.id);
      });

      gem.addEventListener('dragstart', (event) => {
        event.target.classList.add('select');
      });

      gem.addEventListener('dragend', (event) => {
        event.target.classList.remove('select');
      });

      wrapper.addEventListener('dragenter', (event) => {
        event.preventDefault();
      });

      wrapper.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      
      wrapper.addEventListener('drop', () => {
        this.movebyclick(document.querySelector('.select').parentElement.id);
      });
    }

    return arena;
  },

  timerEl() {
    clearInterval(this.timer);
    const el = document.createElement('div');
    el.setAttribute('id', 'timer');

    this.timer = setInterval(() => {
      this.properties.time++;
      const seconds = this.properties.time % 60;
      let minuts = this.properties.time / 60;
      minuts %= 60;
      const str = `${Math.trunc(minuts)} : ${String(seconds).length === 1 ? '0' + seconds : seconds}`;
      el.textContent = str;
    }, 1000);

    return el;
  },
  soundButton() {
    const button = document.createElement('button');
    button.classList.add('button-reset');
    button.id = 'sound';

    if (this.properties.sound) {
      button.textContent = 'sound On';
    } else {
      button.textContent = 'sound Off';
    }

    button.addEventListener('click', () => {
      this.toogleSound();
      if (this.properties.sound) {
        button.textContent = 'sound On';
      } else {
        button.textContent = 'sound Off';
      }
    });

    return button;
  },

  toogleSound() {
    this.properties.sound = !this.properties.sound;
  },

  movebyclick(idWrapper) {
    const move = (direction) => {
      const audio = new Audio('movement_01.mp3');
      if (!(direction === null)) {
        if (direction.firstChild === null) {
          // eslint-disable-next-line no-use-before-define
          thatEl.firstChild.classList.add('animate');
          // eslint-disable-next-line no-use-before-define
          setTimeout(() => { direction.appendChild(thatEl.firstChild); }, 1000);
          setTimeout(() => { direction.firstChild.classList.remove('animate'); }, 1000);
          this.properties.countMove++;
          document.getElementById('counter').textContent = this.properties.countMove;

          if (this.properties.sound) { audio.play(); }
          this.victory();
        }
      }
    };
    // eslint-disable-next-line no-param-reassign
    idWrapper = +idWrapper;
    const pos = idWrapper % this.properties.size;
    let thatEl = document.getElementById(idWrapper);
    const up = document.getElementById(idWrapper - this.properties.size);
    const down = document.getElementById(idWrapper + this.properties.size);
    const left = document.getElementById(idWrapper - 1);
    const rigt = document.getElementById(idWrapper + 1);
    
    move(down);
    move(up);
    if (pos !== 1) { move(left); }
    if (pos !== 0) { move(rigt); }
  },

  victory() {
    let check = 0;
    const wrap = document.getElementsByClassName('wrap');

    Array.from(wrap).forEach((el) => {
      if (el.firstChild !== null) {
        el.id == el.firstChild.textContent ? check++ : check;
      }
    });

    if (Math.pow(this.properties.size, 2) - 1 == check) {
      let stringwin = localStorage.getItem('winners') === null ? '' : localStorage.getItem('winners');
      stringwin = stringwin.split(',');
      stringwin.push(`${this.properties.countMove} moves;${this.properties.size} size; time:${this.properties.time}`);
      localStorage.setItem('winners', stringwin);

      const seconds = this.properties.time % 60;
      let minuts = this.properties.time / 60;
      minuts %= 60;
      const str = `${Math.trunc(minuts)} : ${String(seconds).length === 1 ? '0' + seconds : seconds}`;
      const elem = document.createElement('div');
      elem.classList.add('victory');
      elem.textContent = `Ура! Вы решили головоломку за ${str} и ${this.properties.countMove} ходов`;
      document.getElementById('arena').appendChild(elem);
    }
  },
  sizeArena() {
    const size = document.createElement('select');
    size.classList.add('select_size');
    size.id = 'Select1';

    const options = [
      '3*3',
      '4*4',
      '5*5',
      '6*6',
      '7*7',
      '8*8',
    ];

    let optionsStr = '';

    options.forEach((op) => {
      optionsStr += `<option value="${op[0]}">${op}</option>`;
    });

    size.innerHTML = optionsStr;
    size.addEventListener('change', () => {
      this.properties.size = +size.value;
      this.properties.time = 0;
      this.init();
    });

    const div = document.createElement('div');
    div.classList.add('sizeArena');
    div.innerHTML = '<h2>size of Arena</h2>';
    div.appendChild(size);

    return div;
  },

  winList() {
    const div = document.createElement('div');
    div.innerHTML = '<h3>Winners</h3>';

    const list = document.createElement('ol');
    div.setAttribute('id', 'winlist');
    div.classList.add('win_list');

    if (localStorage.getItem('winners') === null) { return list; }
    const arr = localStorage.getItem('winners').split(',').slice(1, 6);

    arr.sort((a, b) => (+a.split(' ')[0]) - (+b.split(' ')[0]));

    arr.forEach((winner) => {
      const li = document.createElement('li');
      li.textContent = winner;
      list.appendChild(li);
    });
    div.appendChild(list);

    return div;
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Gem.init();
});

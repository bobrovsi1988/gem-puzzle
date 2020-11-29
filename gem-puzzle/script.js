const Gem = {
    constructor() {
        this.timer,
            localStorage.setItem('winners', "")
    },
    properties: {
        size: 3,
        countMove: 0,
        time: 0,
        sound: true,

        continue: false
    },
    init() {
        document.body.innerHTML = "";
        document.body.appendChild(this._chooseYourDestany());
        document.body.appendChild(this._createMenu());
        document.getElementById("Select1").options.selectedIndex = this.properties.size - 3;
        document.body.appendChild(this.countMoveEl()),
            document.body.appendChild(this._timer()),
            document.body.appendChild(this._winList()),
            document.body.appendChild(this.createArena(this.properties.size))



    },
    _createMenu() {
        let menu = document.createElement("div");
        menu.classList.add("menu");
        menu.appendChild(this._resetButton());
        menu.appendChild(this._saveButton());
        menu.appendChild(this._continueButton());
        menu.appendChild(this.soundButton());
        return menu;
    },
    countMoveEl() {
        let count = document.createElement("div");
        count.classList.add("counter");
        count.setAttribute("id", "counter");
        count.textContent = this.properties.countMove;
        return count;
    },
    _resetButton() {
        let button = document.createElement("button");
        button.classList.add("button-reset");
        button.textContent = "reset";
        button.addEventListener("click", () => {           
            this.properties.countMove = 0;
            this.properties.time = 0;
            this.init();
        });
        return button;
    },
    _continueButton() {
        let button = document.createElement("button");
        button.classList.add("button-reset");
        button.textContent = "continue";
        button.addEventListener("click", () => {
            this.properties.continue = !this.properties.continue;
            let arena = document.getElementById("arena").innerHTML = localStorage.getItem("arrSave");
            this.properties.countMove = localStorage.getItem("counts");
            this.properties.time = +localStorage.getItem("time");
            this.properties.size = +localStorage.getItem("size");          
            clearInterval(this._timer.str);
            this.init();            
        });
        return button;
    },
    _saveButton() {
        let button = document.createElement("button");
        button.classList.add("button-reset");
        button.textContent = "save";
        button.addEventListener("click", () => {
            let arr = [];
            let arena = document.querySelectorAll(".wrap");

            Array.from(arena).forEach(el => {
                el.firstChild === null ? arr.push(null) : arr.push(el.firstChild.textContent)

            })
           
            localStorage.setItem("arrSave", arr);
            localStorage.setItem("counts", this.properties.countMove);
            localStorage.setItem("time", this.properties.time);
            localStorage.setItem("size", this.properties.size);
        });
        return button;

    },
    createArena(sizeArena) {
        let numGems = Math.pow(sizeArena, 2);
        let arena = document.createElement("div");
        let gemsize = 100;
        let arr = []; //arr of state 
        arena.style.gridTemplate = `repeat(${sizeArena},  ${gemsize}px) / repeat(${sizeArena}, ${gemsize}px)`;
        arena.style.display = 'grid';
        arena.style.height = sizeArena * gemsize + "px";
        arena.style.width = sizeArena * gemsize + "px";
        arena.setAttribute("id", "arena");
        arena.classList.add("arena");

        for (let i = 1; i < numGems; i++) {
            arr.push(i);
        }
        arr.sort(() => Math.random() - 0.5);

        if (this.properties.continue) {
            arr = localStorage.getItem("arrSave").split(",");
            this.properties.continue = !this.properties.continue;
        }

        for (let i = 0; i < numGems; i++) {
            let gem = document.createElement("div");
            let wrapper = document.createElement("div");
            wrapper.classList.add("wrap");
            wrapper.setAttribute("id", i + 1);

            gem.classList.add("gem");
            gem.setAttribute("draggable", "true");
            gem.textContent = arr[i];
            
            if (arr[i]) { wrapper.appendChild(gem); }
            arena.appendChild(wrapper);

            gem.addEventListener("click", () => {
                this._movebyclick(gem.parentElement.id);
             
            });
            gem.addEventListener("dragstart", (event) => {
                event.target.classList.add("select");
            })
            gem.addEventListener("dragend", (event) => {
                event.target.classList.remove("select");
            })
            wrapper.addEventListener("dragenter", (event) => {
                event.preventDefault()
            });
            wrapper.addEventListener("dragover", (event) => {
                event.preventDefault();

            });
            wrapper.addEventListener("drop", (event) => {
                console.log(document.querySelector(`.select`).parentElement);

                this._movebyclick(document.querySelector(`.select`).parentElement.id)


            });

        }
        return arena;
    },

    _timer() {

        clearInterval(this.timer);
        let el = document.createElement("div");
        el.setAttribute("id", "timer");
        this.timer = setInterval(() => {
            this.properties.time++;
            let seconds = this.properties.time % 60;
            let minuts = this.properties.time / 60 % 60;
            let str = `${Math.trunc(minuts)} :: ${seconds}`;
            el.textContent = str;

        }, 1000);

        return el;
    },
    soundButton() {
        let button = document.createElement("button");
        button.classList.add("button-reset");
        button.id = "sound";
        if (this.properties.sound) {
            button.textContent = "sound On";
        } else {
            button.textContent = "sound Off";
        }
        button.addEventListener("click", () => {
            this._toogleSound();
            if (this.properties.sound) {
                button.textContent = "sound On";
            } else {
                button.textContent = "sound Off";
            }
        })
        return button;
    },
    _toogleSound() {
        this.properties.sound = !this.properties.sound;
    },
    _movebyclick(idWrapper) {
        const move = (direction) => {
            let audio = new Audio('movement_01.mp3');
            if (!(direction === null)) {
                if (direction.firstChild === null) {
                    thatEl.firstChild.classList.add("animate");
                    setTimeout(() => { direction.appendChild(thatEl.firstChild) }, 1000);                   
                    setTimeout(() => { direction.firstChild.classList.remove("animate") }, 1000);
                    this.properties.countMove++;
                    document.getElementById("counter").textContent = this.properties.countMove;

                    if (this.properties.sound) { audio.play(); }
                    this._victory();
                }
              
            }
        };
        idWrapper = +idWrapper;
        let pos = idWrapper % this.properties.size;
        let thatEl = document.getElementById(idWrapper);
        let up = document.getElementById(idWrapper - this.properties.size);
        let down = document.getElementById(idWrapper + this.properties.size);
        let left = document.getElementById(idWrapper - 1);
        let rigt = document.getElementById(idWrapper + 1);
        move(down);
        move(up);
        if (pos !== 1) { move(left); }
        if (pos !== 0) { move(rigt); }



    },
    _victory() {
        let check = 0;
        
        let wrap = document.getElementsByClassName("wrap");
        Array.from(wrap).forEach(el => {

            if (el.firstChild !== null) {               
                el.id == el.firstChild.textContent ? check++ : check;               
            }
        })
      
        if (Math.pow(this.properties.size, 2) - 1 == check) {
            let stringwin = localStorage.getItem("winners") === null ? "" : localStorage.getItem("winners");
            stringwin = stringwin.split(",");
            stringwin.push(`${this.properties.countMove} moves;${this.properties.size} size; time:${this.properties.time}`);
            localStorage.setItem("winners", stringwin);

            let seconds = this.properties.time % 60;
            let minuts = this.properties.time / 60 % 60;
            let str = `${Math.trunc(minuts)} :: ${seconds}`;
            let elem = document.createElement("div");
            elem.classList.add("victory");
            elem.textContent = `Ура! Вы решили головоломку за ${str} и ${this.properties.countMove} ходов`;
            document.getElementById("arena").appendChild(elem);
        }
    },
    _chooseYourDestany() {
        let size = document.createElement('select');        
        size.id = 'Select1';

        let options = [
            "3*3",
            "4*4",
            "5*5",
            "6*6",
            "7*7",
            "8*8",
        ];

        var options_str = "";


        options.forEach(function (op, inex) {

            options_str += '<option value="' + op[0] + '">' + op + '</option>';
        });

        size.innerHTML = options_str;
        size.addEventListener("change", () => {
            this.properties.size = +size.value;
            this.properties.time = 0;
            this.init();
            console.log(size.value);
        })

        let div = document.createElement("div");
        div.classList.add("sizeArena");
        div.innerHTML = "<h2>choose Your Destany</h2>";
        div.appendChild(size);
        return div;
    },
    _winList() {
        let div = document.createElement('div');
        div.innerHTML = "<h3>Winners</h3>"
        let list = document.createElement("ol");
        div.setAttribute("id", "winlist");
        if (localStorage.getItem("winners") === null) { return list };
        let arr = localStorage.getItem("winners").split(',').slice(1, 6);       

        arr.sort((a, b) => {           
            return (+a.split(" ")[0]) - (+b.split(" ")[0]);
        });
        arr.forEach((winner) => {
            let li = document.createElement("li");
            li.textContent = winner;
            list.appendChild(li);
        })
        div.appendChild(list);
        return div
    }

}



window.addEventListener("DOMContentLoaded", function () {

    Gem.init();
});
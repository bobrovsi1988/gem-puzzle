const Gem ={
    constructor(){
        this.timer,
        localStorage.setItem('winners',"")
    },
properties :{
    size : 3,
    countMove : 0,
    time:0,
    
    continue:false
},
init(){    
    
    
    //console.log(document.getElementById("timer")),
    
   document.body.innerHTML="";
   document.body.appendChild(this._chooseYourDestany());
   document.body.appendChild(this._createMenu());
   document.getElementById("Select1").options.selectedIndex = this.properties.size-3;
    document.body.appendChild(this.countMoveEl()),
    // document.body.appendChild(this._reset()),
    // document.body.appendChild(this._save()),
    
    // document.body.append(this._continue()),
   document.body.appendChild(this._timer()),
   document.body.appendChild(this._winList()),

    document.body.appendChild(this.createArena(this.properties.size))
    
     
 
},
_createMenu(){
    let menu = document.createElement("div");
    menu.classList.add("menu");
    menu.appendChild(this._reset());
    menu.appendChild(this._save());
    menu.appendChild(this._continue());
    return menu;
},
countMoveEl(){
    let count =document.createElement("div");
    count.classList.add("counter");
    count.setAttribute("id", "counter");
    count.textContent=this.properties.countMove;
    return count;
},
_reset(){
let button = document.createElement("button");
button.classList.add("button-reset");
button.textContent = "reset";
button.addEventListener("click", ()=>{
   // document.body.innerHTML="";
    this.properties.countMove = 0;
    this.properties.time = 0;
    this.init();
});
return button;
},
_continue(){
let button = document.createElement("button");
button.classList.add("button-reset");
button.textContent = "continue";
button.addEventListener("click", ()=>{
    this.properties.continue = !this.properties.continue;
    let arena =document.getElementById("arena").innerHTML = localStorage.getItem("arrSave");
    this.properties.countMove = localStorage.getItem("counts");
    this.properties.time = +localStorage.getItem("time");
    this.properties.size = +localStorage.getItem("size");
    //document.body.innerHTML="";
    clearInterval(this._timer.str);
    this.init();
    //this.init();
});
return button;
},
_save(){
    let button = document.createElement("button");
button.classList.add("button-reset");
button.textContent = "save";
button.addEventListener("click", ()=>{
    let arr =[];
    let arena =document.querySelectorAll(".wrap");
    
    Array.from(arena).forEach(el=>{
        el.firstChild === null? arr.push(null):arr.push(el.firstChild.textContent)

    })
    console.log(arr);
    localStorage.setItem("arrSave", arr);
    localStorage.setItem("counts", this.properties.countMove);
    localStorage.setItem("time", this.properties.time);
    localStorage.setItem("size", this.properties.size);
});
return button;
    
},
createArena(sizeArena){
    let numGems = Math.pow(sizeArena, 2);
    let arena =document.createElement("div");
    let gemsize =100;
    let arr =[]; //arr of state 
    arena.style.gridTemplate =`repeat(${sizeArena},  ${gemsize}px) / repeat(${sizeArena}, ${gemsize}px)`;
    arena.style.display = 'grid';
    arena.style.height = sizeArena* gemsize+"px";
    arena.style.width = sizeArena*gemsize+"px";
    arena.setAttribute("id", "arena");
    arena.classList.add("arena");
    
    for(let i =1;i<numGems;i++){
        arr.push(i);
    }
    arr.sort(() => Math.random() - 0.5);
    //console.log(arr);

    if(this.properties.continue){
        arr = localStorage.getItem("arrSave").split(",");
        this.properties.continue=!this.properties.continue;
    
    }
    //console.log(arr);
    for(let i=0; i<numGems; i++){
        let gem = document.createElement("div");
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrap");
        wrapper.setAttribute("id" , i+1); 
        
        gem.classList.add("gem");
        gem.setAttribute("draggable", "true");
        gem.textContent = arr[i];
        //if(i<numGems-1){wrapper.appendChild(gem);}
        if(arr[i]){wrapper.appendChild(gem);}
        arena.appendChild(wrapper);

        gem.addEventListener("click",()=>{ 
            this._movebyclick(gem.parentElement.id);
           // this._victory();
        
        });
        gem.addEventListener("dragstart",(event)=>{
            event.target.classList.add("select");
        })
        gem.addEventListener("dragend",(event)=>{
            event.target.classList.remove("select");
        })
        wrapper.addEventListener("dragenter",(event)=>{
            event.preventDefault()
           
           
            //event.target.appendChild(gem).textContent =arr[i];
        });
        wrapper.addEventListener("dragover",(event)=>{
            event.preventDefault();
          
        });
        wrapper.addEventListener("drop",(event)=>{
            console.log(document.querySelector(`.select`).parentElement);
           //console.log(event.target.id);
           this._movebyclick(document.querySelector(`.select`).parentElement.id)
           // event.target.append(document.querySelector(`.select`));
          
        });

    }
    return arena;
},
//str:setInterval(()=>{this.properties.time++;},1000),
_timer(){
   
    clearInterval(this.timer);
    let el =document.createElement("div");
    el.setAttribute("id", "timer");
    this.timer = setInterval(()=>{
        this.properties.time++;
        let seconds =this.properties.time%60;
        let minuts =this.properties.time/60%60;
        let str =`${Math.trunc(minuts)} :: ${seconds}`;
        el.textContent=str;
    
    }, 1000);

   
    return el;


},
// _addListner(){
//     console.log(document.getElementsByClassName("gem"));
//     Array.from(document.getElementsByClassName("gem")).forEach(element => {
//         element.addEventListener("click",()=>{ 
//             this._movebyclick(element.parentElement.id);
        
//         }
//         )
//     });
// },
_movebyclick(idWrapper){
    const move = (direction)=>{
        if(!(direction === null)){
            if(direction.firstChild === null){
                direction.appendChild(thatEl.firstChild);
                this.properties.countMove++;
                document.getElementById("counter").textContent =this.properties.countMove;
              this._victory();
            }
            //console.log(down.firstChild);
        }
    };
    idWrapper =+idWrapper;
    let pos = idWrapper%this.properties.size;
    let thatEl = document.getElementById(idWrapper);
    let up = document.getElementById(idWrapper-this.properties.size);
    let down = document.getElementById(idWrapper+this.properties.size);
    let left = document.getElementById(idWrapper-1);
    let rigt = document.getElementById(idWrapper+1);
   // console.log("xxxxxxxx   "+down + "yyyy" + idWrapper);
    move(down);
    move(up);
    if(pos!==1){move(left);}
    if(pos!==0){move(rigt);}
    
    

}, 
_victory(){
    let check =0;
   //console.log("hell");
    let wrap = document.getElementsByClassName("wrap");
    Array.from(wrap).forEach(el =>{
        
        if(!(el.firstChild === null)){
            // console.log("id= "+el.id);
            // console.log(el.firstChild.textContent);
            el.id==el.firstChild.textContent?check++:check ;
            //console.log("check : "+check);

        }
        
    })
    //console.log(check);
    if(Math.pow(this.properties.size, 2) -1 ==check){
        let stringwin = localStorage.getItem("winners")===null? "":localStorage.getItem("winners");
        stringwin = stringwin.split(",");
        stringwin.push(`${this.properties.countMove} moves;${this.properties.size} size; time:${this.properties.time}`);
        localStorage.setItem("winners", stringwin);

        let seconds =this.properties.time%60;
        let minuts =this.properties.time/60%60;
        let str =`${Math.trunc(minuts)} :: ${seconds}`;
        let elem = document.createElement("div");
        elem.classList.add("victory");
        elem.textContent=`Ура! Вы решили головоломку за ${str} и ${this.properties.countMove} ходов`;
        document.getElementById("arena").appendChild(elem);

        //alert(`Ура! Вы решили головоломку за #:## и ${this.properties.countMove} ходов`);
    }
},
_chooseYourDestany(){
    let size = document.createElement('select');
    //size.name = 'drop1';
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
    
    
    options.forEach( function(op, inex) {
       
      options_str += '<option value="' + op[0] + '">' + op + '</option>';
    });
    
    size.innerHTML = options_str;
    size.addEventListener("change", ()=>{
        this.properties.size = +size.value;
        this.properties.time = 0;
        this.init();
        console.log(size.value);
    })

    let div =document.createElement("div");
    div.classList.add("sizeArena");
    div.innerHTML="<h2>choose Your Destany</h2>";
    div.appendChild(size);
    return div;
},
_winList(){
    let div =document.createElement('div');
    div.innerHTML = "<h3>Winners</h3>"
    let list = document.createElement("ol");
    div.setAttribute("id", "winlist");
    if(localStorage.getItem("winners")===null){return list};
    let arr = localStorage.getItem("winners").split(',').slice(1, 6);
    //console.log("array  "+ arr[0]);
   

    arr.sort((a, b)=>{
       // console.log(+a.split(" ")[0]);
        return (+a.split(" ")[0])-(+b.split(" ")[0]);
    });
    arr.forEach((winner)=>{
        let li =document.createElement("li");
        li.textContent= winner;
        list.appendChild(li);
       // console.log(winner.split(" ")[0]);
    })
    div.appendChild(list);
    return div
}

}



window.addEventListener("DOMContentLoaded",function(){
//     let sizeGem = document.createElement("header");
//    // sizeGem.append("key", "value");

//     // sizeGem.append(document.createElement("select"));
    
//     // for(let i=3;i<9;i++){
//     //     let option = document.createElement("option");
//     //     option.textContent = i;
//     //     sizeGem.append(option);
//     // }
//     document.body.append(sizeGem);///


    Gem.init();
    //document.body.append(Gem._timer());
    
});
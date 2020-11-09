const Gem ={
properties :{
    size : 3,
    countMove : 0,
    continue:false,
},
init(){    
    document.body.appendChild(this.countMoveEl()),
    document.body.appendChild(this._reset()),
    document.body.appendChild(this._save()),
    document.body.appendChild(this._continue()),

    document.body.appendChild(this.createArena(this.properties.size))
    
     
 
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
    document.body.innerHTML="";
    this.properties.countMove = 0;
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
    this.properties.size = +localStorage.getItem("size");
    document.body.innerHTML="";
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
    console.log(arr);
    for(let i=0; i<numGems; i++){
        let gem = document.createElement("div");
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrap");
        wrapper.setAttribute("id" , i+1); 
        gem.classList.add("gem");
        gem.textContent = arr[i];
        //if(i<numGems-1){wrapper.appendChild(gem);}
        if(arr[i]){wrapper.appendChild(gem);}
        arena.appendChild(wrapper);

        gem.addEventListener("click",()=>{ 
            this._movebyclick(gem.parentElement.id);
            this._victory();
        
        });

    }
    return arena;
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
    console.log("xxxxxxxx   "+down + "yyyy" + idWrapper);
    move(down);
    move(up);
    if(pos!==1){move(left);}
    if(pos!==0){move(rigt);}
    
    

}, 
_victory(){
    let check =0;
    console.log("hell");
    let wrap = document.getElementsByClassName("wrap");
    Array.from(wrap).forEach(el =>{
        //console.log(el.id);
        if(!(el.firstChild === null)){
            el.id==el.firstChild.textContent?check++:check ;

        }
        
    })
    console.log(check);
    if(Math.pow(this.properties.size, 2) -1 ==check){
        alert("ura");
    }
},

}



window.addEventListener("DOMContentLoaded",function(){

    Gem.init();
});
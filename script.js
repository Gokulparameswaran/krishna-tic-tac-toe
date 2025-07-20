const boxa = document.querySelectorAll('.box');
const status1 = document.querySelector('.status');
const btrestart = document.querySelector('#restart');
let x = "<img src='./images/1.png'>";
let o = "<img src='./images/2.png'>";

const win = [
    [0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];
let options = ["","","","","","","","",""];
let currentPlayer = x;
let Player = "X";
let running = false;

init();

function init(){
    boxa.forEach((box, index) => {
        box.dataset.index = index;
        box.addEventListener('click', click);
    });
    btrestart.addEventListener('click', restartgame);
    status1.textContent = `${Player} Your turn`;
    running = true;
}

function click(){
    const index = this.dataset.index;
    if(options[index] != "" || !running){
        return;
    }
    Updatebox(this, index);
}

function changeplayer(){
    Player = (Player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    status1.textContent = `${Player} Your turn`;
}

function Updatebox(box, index){
    options[index] = Player;
    box.innerHTML = currentPlayer;
    checkwinner();
}

function checkwinner(){
    let iswon = false;
    for(let i = 0; i < win.length; i++){
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        if(box1 == "" || box2 == "" || box3 == ""){
            continue;
        }
        if(box1 == box2 && box2 == box3){
            iswon = true;
            boxa[condition[0]].classList.add('win');
            boxa[condition[1]].classList.add('win');
            boxa[condition[2]].classList.add('win');
            break;
        }
    }

    if(iswon){
        status1.textContent = `${Player} Won...`;
        running = false;
    } else if(!options.includes("")){
        status1.textContent = `Game Draw...!`;
        running = false;
    } else {
        changeplayer();
    }
}

function restartgame(){
    options = ["","","","","","","","",""];
    boxa.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
    currentPlayer = x;
    Player = "X";
    status1.textContent = `${Player} Your turn`;
    running = true;
}



let gameseq = [];
let userseq = [];

let btns =["yellow","red","green","purple"];

let started=false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("touchstart", ()=>{
    if(started===false)
    {
        console.log("Game has started");
        started=true;
        levelUp();//to increase count and to flash a random color
    }
});

document.addEventListener("keypress", ()=>{
    if(started===false)
    {
        console.log("Game has started");
        started=true;
        levelUp();//to increase count and to flash a random color
    }
});


function gameflash(btn)
{
   btn.classList.add("gameflash");
   setTimeout(()=>{
    btn.classList.remove("gameflash");
   },250);
}

function userflash(btn)
{
   btn.classList.add("userflash");
   setTimeout(()=>{
    btn.classList.remove("userflash");
   },250);
}
function levelUp()
{
    userseq=[]; //everytime user has to press from the start
    level++;
    h2.innerText ="level " + level;
    let randidx= Math.floor(Math.random()*4);
    randcolor=btns[randidx];
    let randbtn=document.querySelector("." +randcolor);
       
    gameflash(randbtn);
   gameseq.push(randcolor);
   

}
// a random color flashed it got pushed into gameseq 
// then user has to press the same color.. it get passed to userseq
//if same color is pressed ( check() ) its fine...next level
//if a different color was pressed...its over


function check(idx)//the idx of the color just entered by the user
{
    //no of colors to be pressed in each round == level 
    if(userseq[idx]===gameseq[idx])// last color pushed in game should be last color pressed by the user 
    {//two situations
    //we are checking any color in between the entire sequence
    //then wait for next button to be pressed and agin check
    //if we are on the last elemnt just level up 
    if(userseq.length==gameseq.length)
    {
        setTimeout(levelUp,1000);
    }
}
    else
    {
         h2.innerHTML ="Game Over! <b>Your Score was " + level + "</b><br>Press any key or Tap to restart again";
         document.querySelector("body").style.backgroundColor="red";
         setTimeout(()=>{document.querySelector("body").style.backgroundColor="white";},150);
         reset();
    }
}
 let allbtns=document.querySelectorAll(".btn");
 for(let btn of allbtns)
 {
    btn.addEventListener("click",()=>{
        userflash(btn);
        usercolor=btn.getAttribute("id");
       
        userseq.push(usercolor);
        
        check(userseq.length-1);//last idx entered by the user

    });
 }

 function reset()
 {
    started = false;
    gameseq= [];
    userseq = [];
    level = 0;
 }
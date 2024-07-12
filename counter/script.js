const number=document.getElementById("number");
const plusBtn=document.getElementById("plus-btn");
const minusBtn=document.getElementById("minus-btn");
const reset=document.getElementById("reset");
count=number.innerHTML;
plusBtn.addEventListener("click",()=>{
    
    count++;
    if(count==0){
        number.style.color="black";
    }
    else if(count>0){
        number.style.color="green";
    }
    number.innerHTML=count;
    const audio=new Audio("https://www.soundjay.com/buttons/sounds/beep-08b.mp3");
    audio.play();
})
minusBtn.addEventListener("click",()=>{
    count--;
    if(count==0){
        number.style.color="black";
    }
     else if(count<0){
        number.style.color="red";
    }
    number.innerHTML=count;
    const audio=new Audio("https://www.soundjay.com/buttons/sounds/beep-07a.mp3");
    audio.play();
})
reset.addEventListener("click",()=>{
    count=0;
    number.innerHTML=count;
    number.style.color="black";
    const audio=new Audio("https://www.soundjay.com/buttons/sounds/beep-29.mp3");
    audio.play();
})
const miliseconds1 = document.getElementById('miliseconds-substring1');
const miliseconds2 = document.getElementById('miliseconds-substring2');
const seconds1 = document.getElementById('seconds-substring1');
const seconds2 = document.getElementById('seconds-substring2');
const minutes1 = document.getElementById('minutes-substring1');
const minutes2 = document.getElementById('minutes-substring2');
const hours1 = document.getElementById('hours-substring1');
const hours2 = document.getElementById('hours-substring2');
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let timer = false;

setInterval(stopwatch, 10);

startBtn.addEventListener("click", () => {
    timer = true;

})
pauseBtn.addEventListener("click", () => {
    timer = false;
})
resetBtn.addEventListener("click", () => {
    miliseconds1.innerHTML = 0;
    miliseconds2.innerHTML = 0;
    seconds1.innerHTML = 0;
    seconds2.innerHTML = 0;
    minutes1.innerHTML = 0;
    minutes2.innerHTML = 0;
    hours1.innerHTML = 0;
    hours2.innerHTML = 0;
})

// function stopwatch() {
//     if (timer == true) {
//         miliseconds2.innerHTML++;
//         if (miliseconds2.innerHTML < 10) {
//             miliseconds1.innerHTML = 0;
//         }
//         else {
//             miliseconds1.innerHTML = "";
//             if (miliseconds2.innerHTML == 99) {
//                 miliseconds1.innerHTML = 0;
//                 miliseconds2.innerHTML = 0;
//                 seconds2.innerHTML++;
//                 if (seconds2.innerHTML < 10) {
//                     seconds1.innerHTML = 0;
//                 }
//                 else {
//                     seconds1.innerHTML = "";
//                     if (seconds2.innerHTML == 60) {
//                         seconds1.innerHTML = 0;
//                         seconds2.innerHTML = 0;
//                         minutes2.innerHTML++;
//                         if (minutes2.innerHTML < 10) {
//                             minutes1.innerHTML = 0;
//                         }
//                         else {
//                             minutes1.innerHTML = "";
//                             if (minutes2.innerHTML == 60) {
//                                 minutes1.innerHTML = 0;
//                                 minutes2.innerHTML = 0;
//                                 hours2.innerHTML++;
//                                 if (hours2.innerHTML < 10) {
//                                     hours1.innerHTML = 0;
//                                 }
//                                 else {
//                                     hours1.innerHTML = "";
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
function milisecondsFunction() {
    miliseconds2.innerHTML++;
    if (miliseconds2.innerHTML < 10) {
        miliseconds1.innerHTML = 0;
    }
    else {
        miliseconds1.innerHTML = "";
        if (miliseconds2.innerHTML == 99) {
            miliseconds1.innerHTML = 0;
            miliseconds2.innerHTML = 0;
            seconds2.innerHTML++;
        }
    }
}
function secondsFunction() {
    if (seconds2.innerHTML < 10) {
        seconds1.innerHTML = 0;
    }
    else {
        seconds1.innerHTML = "";
        if (seconds2.innerHTML == 60) {
            seconds1.innerHTML = 0;
            seconds2.innerHTML = 0;
            minutes2.innerHTML++;
        }
    }
}
function minutesFunction() {
    if (minutes2.innerHTML < 10) {
        minutes1.innerHTML = 0;
    }
    else {
        minutes1.innerHTML = "";
        if (minutes2.innerHTML == 60) {
            minutes1.innerHTML = 0;
            minutes2.innerHTML = 0;
            hours2.innerHTML++;
            if (hours2.innerHTML < 10) {
                hours1.innerHTML = 0;
            }
            else {
                hours1.innerHTML = "";
            }
        }
    }
}
function stopwatch(){
    if(timer){
        milisecondsFunction();
        secondsFunction();
        minutesFunction();
    }
}
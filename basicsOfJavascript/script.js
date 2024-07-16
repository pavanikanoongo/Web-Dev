// // // //Program using arithmetic Operators
// let a = 20;
// let b = 2;
// let op = prompt("Enter operator: ");
// switch (op) {
//     case '+':
//         console.log("result=", a + b);
//         break;
//     case '-':
//         console.log("result=", a - b);
//         break;
//     case '*':
//         console.log("result=", a * b);
//         break;
//     case '/':
//         console.log("result=", a / b);
//         break;
//     case '++':
//         a++;
//         b++;
//         console.log("a=", a);
//         console.log("b=", b);
//         break;
//     case '--':
//         a--;
//         b--;
//         console.log("a=", a);
//         console.log("b=", b);
//         break;
//     case '**':
//         console.log("result=", a**b);
//         break;

//     default:
//         console.log("Invalid operator");
// }



// // // //Program for average marks 
// let e=92
// let h=95
// let m=96
// let s=97
// let so=91
// console.log("english= ",e);
// console.log("hindi= ",h);
// console.log("maths= ",m);
// console.log("science= ",s);
// console.log("social= ",so);
// let sum=(e+h+m+s+so);
// console.log("Sum =",sum)
// let avg=sum/5;
// console.log("Average= ",avg);


// // //Program to check string is palindrome
// function isPalindrome(str) {
//     let j = str.length - 1;
//     for (i = 0; i < str.length / 2; i++) {
//         if (str[i] != str[j]) {
//             return false;
//         }
//         j--;
//     }
//     return true;
// }
// result = isPalindrome("racecar");
// if (result == true) {
//     console.log("Palindrome ")
// }
// else {
//     console.log("Not a palindrome");
// }



// // //Program for string in alphabetical order
// let pos;
// let newStr;
// let alph=(str)=>{
//     var arr=str.split("");
//     newStr=arr.sort().join("");
//     console.log(newStr);
// }
// alph("javascript");

// //Function for Average marks
// let average=(n1,n2,n3,n4,n5)=>{
//     sum=n1+n2+n3+n4+n5;
//     avg=sum/5;
//     console.log("average =",avg);
// }
// average(95,92,96,94,91);


// //Filter Function 
// const stringArray = ["hi", "to", "on", "three", "four", "hifive", "six", "racecar", "madam", "hellohi"];

// function LessThanThreeCharacters(str) {
//     if (str.length < 3) {
//         return true;
//     }
// }
// function containHi(str) {
//     if (str.includes("hi")) {
//         return true;
//     }
// }
// function isPalindrome(str) {
//     result = true;
//     for (i = 0; i < (str.length) / 2; i++) {
//         if (str.charAt(i) == str.charAt(str.length - 1 - i)) {
//             result = true;
//         }
//         else {
//             result = false;
//             break;
//         }
//     }
//     return result;
// }


// const chr = stringArray.filter(LessThanThreeCharacters);
// console.log("Less than 3 characters string", chr);

// const containsHi = stringArray.filter(containHi);
// console.log("String containing 'hi'", containsHi);

// const palindrome = stringArray.filter(isPalindrome);
// console.log("Palindrome string", palindrome);




//Callback examples

//Example-1
function getCheese(next){
    setTimeout(() =>{
        const cheese="🧀";
        console.log(`Sending the ${cheese}`);
        next(cheese);
    },2000);
}
function makeDough(cheese,next){
    setTimeout(() =>{
        const dough=cheese+"🍞";
        console.log(`Sending the ${dough}`);
        next(dough);
    },2000)
}
function bakePizza(dough,next){
    setTimeout(() =>{
        const pizza=dough+"🍕";
        console.log(`Sending the ${pizza}`);
        next(pizza);
    },2000)
}
function orderPizza(myFunction){
    getCheese((cheese)=>{
        makeDough(cheese,(dough)=>{
            bakePizza(dough,(pizza)=>{
                myFunction(pizza);
            })
        })
    })}
function myFunction(pizza){
    setTimeout(() =>{
        console.log(`Here is your notification for ${pizza}`);
    },2000)

}
orderPizza(myFunction);

setTimeout(() => {
    console.log("-------------------------------------------------");
},9000)

//Example-2
function getOrderInfo(next) {
    setTimeout(() => {
        const orderno = 123;
        console.log(`Fetched order no. ${orderno}`);
        next(orderno);
    }, 10000)
}
function checkIfAvailable(orderno, next) {
    setTimeout(() => {
        const available = orderno + " available";
        console.log(`Checking order ${available}`);
        next(available);
    }, 2000)
}

function placeOrder(available, next) {
    setTimeout(() => {
        const order = "order " + available;
        console.log(`Placing order for ${order}`);
        next(order);
    }, 2000)
}

function returnSuccess(myfunction) {
    getOrderInfo((orderno) => {
        checkIfAvailable(orderno, (available) => {
            placeOrder(available, (order) => {
                myfunction(order);
            })
        })

    }
    )
}
function myfunction(order) {
    setTimeout(() => {
        console.log(`Your order placed successfully for ${order}`);
    },2000)
}
returnSuccess(myfunction);

setTimeout(() => {
    console.log("-------------------------------------------------");
},17000)


//Example-3
function getUserInfo(next){
    setTimeout(() => {
        const username="Riya";
        console.log(`Getting user info of ${username}`);
        next(username);
    },18000)
}
function checkIfAlreadyPresent(username,next){
    setTimeout(() => {
        const notPresent=username+" ,not present";
        console.log(`Checked ${notPresent}`);
        next(notPresent);
    },2000)
}
function createAccount(notPresent,next){
    setTimeout(() => {
        const create="new account "+notPresent+" before";
        console.log(`Created ${create}`);
        next(create);
    },2000)
}
function sendSignUpEmail(create,next){
    setTimeout(() => {
        const email="email generated for "+create;
        console.log(`sending ${email}`);
        next(email);
    },2000)
}
function success(myfunction){
    getUserInfo((username)=>{
        checkIfAlreadyPresent(username,(notPresent)=>{
            createAccount(notPresent,(create)=>{
                sendSignUpEmail(create,(email)=>{
                    myfunction(email);
                })
            })
        })
    })
}
function myfunction(email){
    setTimeout(() => {
        console.log(`Successfully ${email}`);
    },2000)
}
success(myfunction);


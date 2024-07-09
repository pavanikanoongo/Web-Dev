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
const stringArray = ["hi", "to", "on", "three", "four", "hifive", "six", "racecar", "madam", "hellohi"];

function LessThanThreeCharacters(str) {
    if (str.length < 3) {
        return true;
    }
}
function containHi(str) {
    if (str.includes("hi")) {
        return true;
    }
}
function isPalindrome(str) {
    result = true;
    for (i = 0; i < (str.length) / 2; i++) {
        if (str.charAt(i) == str.charAt(str.length - 1 - i)) {
            result = true;
        }
        else {
            result = false;
            break;
        }
    }
    return result;
}


const chr = stringArray.filter(LessThanThreeCharacters);
console.log("Less than 3 characters string", chr);

const containsHi = stringArray.filter(containHi);
console.log("String containing 'hi'", containsHi);

const palindrome = stringArray.filter(isPalindrome);
console.log("Palindrome string", palindrome);


let inputNumber = document.getElementById('input-number');
const clearBtn = document.getElementById('clear');
const submitBtn = document.getElementById('submit');
let result = document.getElementById('result');
result.innerHTML = " ";

submitBtn.addEventListener('click', isPrime);

function isPrime() {
    let num =inputNumber.value;
    let prime = true;
    let c = 2;
    console.log(num);
    if (num == 0 || num == 1) {
        result.innerHTML = "Neither prime nor composite ";
    }
    else if (num < 0 ||num % 1!=0) { //negative or decimal numbers
        result.innerHTML = "Invalid Number";
    }
    else {
        while (c * c <= num) {
            if (num % c == 0) {
                prime = false;
                break;
            }
            else {
                c = c + 1;
            }
        }
        if (prime) {
            result.innerHTML = (`${num} is prime number`);
            console.log("Prime")
        }
        else {
            result.innerHTML = (`${num} is not a prime number`);
            console.log(" Not Prime")
        }

    }
};

clearBtn.addEventListener('click', () => {
    result.innerHTML = " ";
    num =inputNumber.ariaPlaceholder;
    inputNumber.value = num;
})



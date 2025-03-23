'use strict'

const number = prompt('Give a positive number!');
let total = 0

for (let i = 1; i <= number; i++) {
    total += i;
}

document.querySelector('#taskid').innerHTML = `The sum of all numbers from 0 to ${number} is ${total}`;





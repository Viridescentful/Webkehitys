'use strict'

const number = Number(prompt('Give a positive number!'));

document.querySelector('#taskid').innerHTML = `Multiplication table:`;

for (let i = 1; i <= number; i++) {
    const newrow = document.querySelector('#tasktable').insertRow();

    for (let x = 1; x <= number; x++) {
        const newcell = newrow.insertCell();
        newcell.innerText = String(i * x);
    }
}







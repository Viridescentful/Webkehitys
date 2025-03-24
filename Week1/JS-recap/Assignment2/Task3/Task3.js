'use strict'

let numbers = []

while (true) {
    const newnumber = prompt("Give me a number! (or nothing to stop)")

    if (newnumber === "" || Number.isNaN(newnumber)) {
        break
    } else {
        numbers.push(newnumber)
    }
}

let evennumbers = []

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evennumbers.push(numbers[i])
    }
}

if (evennumbers.length === 0) {
    document.querySelector('#taskid').innerHTML = `List of even number: None}`
} else {
    document.querySelector('#taskid').innerHTML = `List of even number: ${evennumbers}`
}

'use strict'

function sortArray(array) {
    return array.sort((a, b) => a - b);
}

const numbers = [1, 42323, 18, 13, 8999, 671, 2, 3, 4, 617]

console.log(numbers)
console.log(sortArray(numbers))
'use strict'

function sortArray(array, order) {
    if (order === "asc") {
        return array.sort((a, b) => a - b);
    } else if (order === "desc") {
        return array.sort((a, b) => b - a);
    } else {
        return array
    }

}

const numbers = [1, 42323, 18, 13, 8999, 671, 2, 3, 4, 617]

console.log(sortArray(numbers, "asc"))
console.log(sortArray(numbers, "desc"))
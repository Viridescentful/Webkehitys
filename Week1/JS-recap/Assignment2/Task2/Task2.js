'use strict'

let numbers = []

const firstnumber = prompt("Give me the first number!")
const secondnumber = prompt("Give me the second number!")
const thirdnumber = prompt("Give me the third number!")
const fourthnumber = prompt("Give me the fourth number!")
const fifthnumber = prompt("Give me the fifth number!")

numbers.push(firstnumber)
numbers.push(secondnumber)
numbers.push(thirdnumber)
numbers.push(fourthnumber)
numbers.push(fifthnumber)

console.log("Numbers: " + numbers)

const checknumber = prompt("Give me a number to check!")

if (numbers.includes(checknumber)) {
    console.log("The array includes number " + checknumber)
} else {
    console.log("The array does not include number " + checknumber)
}

numbers.pop()

console.log("Numbers: " + numbers)

numbers.sort((a, b) => a - b)

console.log("Numbers: " + numbers)

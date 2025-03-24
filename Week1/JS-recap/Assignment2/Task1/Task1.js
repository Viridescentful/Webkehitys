'use strict'

const fruits = ["apple", "banana", "watermelon", "lime", "orange", "grape", "kiwi"]

console.log("Fruits: " + fruits)
console.log("Length of fruits: " + fruits.length)
console.log("Element at index 2: " + fruits[1])
console.log("Last element of fruits: " + fruits[fruits.length - 1])

let vegetables = []

const firstvege = prompt("Give me the first vegetable!")
const secondvege = prompt("Give me the second vegetable!")
const thirdvege = prompt("Give me the third vegetable!")

vegetables.push(firstvege)
vegetables.push(secondvege)
vegetables.push(thirdvege)

console.log("Vegetables: " + vegetables)
console.log("Length of vegetables: " + vegetables.length)
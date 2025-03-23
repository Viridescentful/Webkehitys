'use strict'

const celsius = prompt('Enter a celsius amount!');
const fahrenheit = celsius * (9 / 5) + 32;
const kelvin = celsius + 273.15;

document.querySelector('#taskid').innerHTML = `Celsius: ${celsius}°C | Fahrenheit: ${fahrenheit}°F | Kelvin: ${kelvin}K`;
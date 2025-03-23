'use strict'

const firstpoints = prompt('Give me the first point! (X,Y)').split(",");
const secondpoints = prompt('Give me the second point! (X,Y)').split(",");

const distance = Math.sqrt(Math.pow((secondpoints[0] - firstpoints[0]), 2) + Math.pow((secondpoints[1] - firstpoints[1]), 2));

document.querySelector('#taskid').innerHTML = `Distance between (${firstpoints[0]}, ${firstpoints[1]}) and (${secondpoints[0]}, ${secondpoints[1]}) is ${distance}`;
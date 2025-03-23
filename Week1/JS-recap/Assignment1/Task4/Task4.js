'use strict'

const grade = prompt('Give me a grade between 0 and 100!');

if (grade >= 88) {
    document.querySelector('#taskid').innerHTML = `5`;
} else if (grade >= 76) {
    document.querySelector('#taskid').innerHTML = `4`;
} else if (grade >= 64) {
    document.querySelector('#taskid').innerHTML = `3`;
} else if (grade >= 51) {
    document.querySelector('#taskid').innerHTML = `2`;
} else if (grade >= 40) {
    document.querySelector('#taskid').innerHTML = `1`;
} else {
    document.querySelector('#taskid').innerHTML = `0`;
}





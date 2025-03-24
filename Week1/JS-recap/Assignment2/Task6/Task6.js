'use strict'

let movies = []

while (true) {
    const movietitle = prompt("Give me a movie!")
    const movierating = prompt("Give me a rating for the movie!")

    if (movietitle === "" || movierating === "") {
        break
    }

    const newmovie = {
        "title": movietitle,
        "rating": movierating,
    }

    movies.push(newmovie)
}

movies.sort((a, b) => b.rating - a.rating)

document.querySelector('#taskid').innerHTML = `Movies:`;

for (let i = 0; i < movies.length; i++) {
    const newrow = document.querySelector('#tasktable').insertRow()

    const titlecell = newrow.insertCell()
    titlecell.innerHTML = movies[i].title

    const ratingcell = newrow.insertCell()
    ratingcell.innerHTML = movies[i].rating
}
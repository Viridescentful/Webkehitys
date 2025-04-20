import {fetchCreate} from './FetchersJs/UserFetch.js';

const loginbutton = document.querySelector('#signupsubmit');
const passwordfield = document.querySelector('#password');
const usernamefield = document.querySelector('#first');
const emailfield = document.querySelector('#mailinput');

async function userCreate(username, password, email) {
  return await fetchCreate(username, password, email);
}

loginbutton.addEventListener('click', async () => {
  event.preventDefault();

  const username = usernamefield.value;
  const password = passwordfield.value;
  const email = emailfield.value;

  const response = await userCreate(username, password, email)

  if (response) {
    alert('Rekisteröinti onnistui!');
    window.location.href = '.././Html/Kirjautuminen.html';
  } else {
    alert('Rekisteröinti epäonnistui! Tarkista syötteet.');
  }
});

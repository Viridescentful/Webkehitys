import {fetchLogin} from './FetchersJs/UserFetch.js';

const loginbutton = document.querySelector('#loginsubmit');
const passwordfield = document.querySelector('#password');
const usernamefield = document.querySelector('#first');

async function userlogin(username, password) {
  console.log(username, password);

  const logindata = await fetchLogin(username, password);

  if (logindata) {
    console.log('Login successful');
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);

    document.cookie = `authToken=${logindata.token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
    window.location.href = '.././Html/main.html';
  }
}

loginbutton.addEventListener('click', async () => {
  event.preventDefault();

  const username = usernamefield.value;
  const password = passwordfield.value;
  await userlogin(username, password);
});



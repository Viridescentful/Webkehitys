import {
  userfromtoken,
  updateUserData,
  getAuthTokenFromCookies,
} from './FetchersJs/UserFetch.js';
import {fetchRestaurant} from './FetchersJs/RestaurantFetch.js';

const updatebutton = document.querySelector('#updatebutton');
const logoutbutton = document.querySelector('#logoutbutton');

const userinput = document.querySelector('#first');
const passwordinput = document.querySelector('#password');
const emailinput = document.querySelector('#mailinput');

const userinfo = document.querySelector('#userinfo');

async function logout() {
  event.preventDefault();

  const expires = new Date();
  expires.setTime(expires.getTime() - 1);

  document.cookie = `authToken=; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;

  window.location.href = 'main.html';
}

async function updateUser() {
  event.preventDefault();

  if (getAuthTokenFromCookies()) {
    const user = await userfromtoken(getAuthTokenFromCookies());

    if (!user) {
      return;
    }

    const response = await updateUserData(
      {
        username: userinput.value,
        password: passwordinput.value,
        email: emailinput.value,
      }
      ,getAuthTokenFromCookies());

    if (response) {
      alert('Tiedot päivitetty onnistuneesti!');
      window.location.reload();
    }
  }
}

updatebutton.addEventListener('click', updateUser);
logoutbutton.addEventListener('click', logout);

async function main() {
  if (!getAuthTokenFromCookies()) {
    window.location.href = 'main.html';
  } else {
    const user = await userfromtoken(getAuthTokenFromCookies());

    if (!user) {
      window.location.href = 'main.html';
    } else {
      userinput.value = user.username;
      emailinput.value = user.email;

      let restaurant = 'N/A';

      if (await fetchRestaurant(user.favouriteRestaurant)) {
        const response = await fetchRestaurant(user.favouriteRestaurant);
        restaurant = response.name;
      }

      userinfo.innerHTML = `
       <strong>Käyttäjätunnus: </strong>${user.username} <strong>Sähköposti: </strong>${user.email} <strong>Lempi Ravintola: </strong> ${restaurant}
      `;
    }
  }
}

main();

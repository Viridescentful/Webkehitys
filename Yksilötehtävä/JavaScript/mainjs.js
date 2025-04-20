import {fetchData} from './ComponentJs/Fetchdata.js';
import {
  createModalHtml,
  createWeeklyHtml,
  createRestaurantCells,
} from './ComponentJs/HtmlComponents.js';
import {userfromtoken, updateUserData, getAuthTokenFromCookies} from './FetchersJs/UserFetch.js';

const taulukko = document.querySelector('#target');
const foodlist = document.querySelector('#foodlist');
const restaurantselect = document.querySelector('#restaurantselect');
const menuselect = document.querySelector('#menuselect');
const foodlistlabel = document.querySelector('#foodlistlabel');
const navigationbar = document.querySelector('#navigationbar');
const favoritebutton = document.querySelector('#favoritebutton');



const map = L.map('map').setView([64.192059, 25.945831], 6);
const layerGroup = L.layerGroup().addTo(map);

const favoriteicon = L.icon({
  iconUrl: 'https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png',

  iconSize:     [50, 50], // size of the icon
  iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, 50] // point from which the popup should open relative to the iconAnchor
});

const restauranticon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png',

  iconSize:     [50, 50], // size of the icon
  iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, 50] // point from which the popup should open relative to the iconAnchor
});


const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
let restaurants = [];
let currentRestaurant = null;

async function getRestaurants() {
  try {
    restaurants = await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error(error);
  }
}

async function getDailyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

async function getWeeklyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

function sortRestaurants() {
  restaurants.sort(function(a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
}

async function createfoodlist(restaurant) {
  const menuvalue = menuselect.value;

  foodlist.innerHTML = '';
  let coursesResponse = '';

  if (menuvalue === 'daily') {
    foodlistlabel.innerText = 'Päivän Ruokalista';

    coursesResponse = await getDailyMenu(restaurant._id, 'fi');

    const {courses} = coursesResponse;

    foodlist.insertAdjacentHTML('beforeend', createModalHtml(restaurant, courses, foodlist));

  } else if (menuvalue === 'weekly') {
    foodlistlabel.innerText = 'Viikon Ruokalista';

    coursesResponse = await getWeeklyMenu(restaurant._id, 'fi');
    foodlist.insertAdjacentHTML('beforeend', createWeeklyHtml(restaurant, coursesResponse, foodlist));
  }
}

async function createTable(filteredRestaurants) {
  let user = null;

  if (getAuthTokenFromCookies()) {
    user = await userfromtoken(getAuthTokenFromCookies());
  }

  layerGroup.clearLayers();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  taulukko.innerHTML = `
    <tr>
      <th>Nimi</th>
      <th>Osoite</th>
      <th>Kaupunki</th>
    </tr>
  `;

  for (const restaurant of filteredRestaurants) {
    const tr = createRestaurantCells(restaurant);
    let marker = null;

    if (user) {
      if (user.favouriteRestaurant === restaurant._id) {
        tr.classList.add('favouritehighlight');
        currentRestaurant = restaurant;
        marker = L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]], {icon: favoriteicon}).addTo(layerGroup);
        await createfoodlist(restaurant);
      } else {
        marker = L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]], {icon: restauranticon}).addTo(layerGroup);
      }
    } else {
      marker = L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]], {icon: restauranticon}).addTo(layerGroup);
    }

    async function getRestaurantDetails() {
      try {
        for (const elem of document.querySelectorAll('.highlight')) {
          elem.classList.remove('highlight');
        }

        tr.classList.add('highlight');

        map.panTo(new L.LatLng(restaurant.location.coordinates[1], restaurant.location.coordinates[0]));

        currentRestaurant = restaurant;

        await createfoodlist(restaurant);

      } catch (error) {
        console.error(error);
      }
    }

    marker.on('click', function() {
      getRestaurantDetails()
    })

    tr.addEventListener('click', async function() {
      getRestaurantDetails()
    });

    taulukko.append(tr);
  }
}

function filterRestaurants() {
  const filterValue = restaurantselect.value;

  let filteredRestaurants = restaurants;

  if (filterValue !== 'All') {
    filteredRestaurants = restaurants.filter(restaurant => restaurant.company === filterValue);
  }

  if (filteredRestaurants.length === 0) {
    console.log('No restaurants were found!');
  }

  createTable(filteredRestaurants);
}

restaurantselect.addEventListener('change', filterRestaurants);

menuselect.addEventListener('change', async () => {
  if (currentRestaurant) {
    await createfoodlist(currentRestaurant);
  }
});

favoritebutton.addEventListener('click', async () => {
  if (!getAuthTokenFromCookies()) {
    alert('Kirjaudu ensin sisään!');
    return;

  } else {
    const user = await userfromtoken(getAuthTokenFromCookies());

    if (!user) {
      alert('Kirjaudu ensin sisään!');
      return;
    }

    if (currentRestaurant) {
      const restaurantId = currentRestaurant._id;

      const response = await updateUserData(
        {
          ...user,
          favoriteRestaurant: restaurantId,
        }
      , getAuthTokenFromCookies())

      if (response) {
        alert('Ravintola lisätty suosikkeihin!');
        filterRestaurants()
      } else {
        alert('Valitse Ravintola ensin!');
      }
    }
  }
});

async function main() {
  try {
    await getRestaurants();
    sortRestaurants();
    filterRestaurants();
  } catch (error) {
    console.error(error);
  }

  if (!getAuthTokenFromCookies()) {
    navigationbar.innerHTML = `
  <a class="rightfloat" href="../Html/kirjautuminen.html">Kirjautuminen</a>
  `;

  } else {
    const user = await userfromtoken(getAuthTokenFromCookies());

    if (!user) {
      navigationbar.innerHTML = `
  <a class="rightfloat" href="../Html/kirjautuminen.html">Kirjautuminen</a>
  `;
    } else {
      navigationbar.innerHTML = `
  <p class="leftfloat">${user.username}</p>
  <a class="rightfloat" href="../Html/Profiili.html">Profiili</a>
  `;
    }
  }
}

main();


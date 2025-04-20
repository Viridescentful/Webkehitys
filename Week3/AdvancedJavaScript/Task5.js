import {fetchData} from '../lib/fetchData.js';
import {createRestaurantCells} from './components.js';
import {createModalHtml} from './components.js';

// your code here
const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const taulukko = document.querySelector('#target');
const modal = document.querySelector('#modal');
const filterSelect = document.querySelector('#filter');

let restaurants = [];

// hae kaikki ravintolat
async function getRestaurants() {
  try {
    restaurants = await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error(error);
  }
}

// hae tietyn ravintolan päivän menu
async function getDailyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

// restaurants aakkosjärjestykseen
function sortRestaurants() {
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
}

function close() {
  modal.close();
}

function createTable(filteredRestaurants) {
  taulukko.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Address</th>
      <th>City</th>
    </tr>
  `;

  for (const restaurant of filteredRestaurants) {
    // rivi
    const tr = createRestaurantCells(restaurant);

    tr.addEventListener('click', async function () {
      try {
        for (const elem of document.querySelectorAll('.highlight')) {
          elem.classList.remove('highlight');
        }

        // hae menu
        const coursesResponse = await getDailyMenu(restaurant._id, 'fi');
        // hae menu html

        const {courses} = coursesResponse;

        // tyhjennä modal
        modal.innerHTML = '';
        // avaa modal
        modal.showModal();

        const closebutton = document.createElement('button');
        closebutton.classList.add('close');
        closebutton.innerText = 'Close';

        modal.append(closebutton);

        closebutton.addEventListener('click', close);

        modal.insertAdjacentHTML('beforeend', createModalHtml(restaurant, courses, modal));
      } catch (error) {
        console.error(error);
      }
    });

    // lisätään solut riviin
    taulukko.append(tr);
  }
}

function filterRestaurants() {
  const filterValue = filterSelect.value;

  let filteredRestaurants = restaurants;

  if (filterValue !== 'All') {
    filteredRestaurants = restaurants.filter(restaurant => restaurant.company === filterValue);
  }

  if (filteredRestaurants.length === 0) {
    console.log("No restaurants were found!")
  }

  createTable(filteredRestaurants);
}

filterSelect.addEventListener('change', filterRestaurants);

async function main() {
  try {
    await getRestaurants();
    sortRestaurants();
    filterRestaurants();
  } catch (error) {
    console.error(error);
  }
}

main();

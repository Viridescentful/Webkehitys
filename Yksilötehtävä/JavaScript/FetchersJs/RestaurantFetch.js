import {fetchData} from '../ComponentJs/Fetchdata.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

export async function fetchRestaurant(id) {
  const restaurants = await fetchData(apiUrl + '/restaurants')

  for (const restaurant of restaurants) {
    if (restaurant._id === id) {
      return restaurant;
    }
  }
}

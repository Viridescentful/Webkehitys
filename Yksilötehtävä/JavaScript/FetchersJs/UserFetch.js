import {fetchData} from '../ComponentJs/Fetchdata.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

async function checkusername(username) {
  try {
    return await fetchData(`${apiUrl}/users/available/${username}`);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getAuthTokenFromCookies() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'authToken') {
      return value;
    }
  }
  return null;
}

export async function updateUserData(data, token) {
  const {username, password, email, favoriteRestaurant, avatar} = data

  let user = {
    favouriteRestaurant: favoriteRestaurant,
    avatar: avatar,
  };

  if (typeof username === 'string') {
    user.username = username;
  }

  if (typeof password === 'string') {
    user.password = password;
  }

  if (email && email.includes('@') && email.includes('.')) {
    user.email = email;
  }

  try {
    return await fetchData(`${apiUrl}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function userfromtoken(token) {
  try {
    const response = await fetch(`${apiUrl}/users/token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchLogin(username, password) {
  const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
  const user = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchCreate(username, password, email) {
  if (await checkusername(username)) {
    if (email && password) {
      if (email.includes('@') && email.includes('.')) {
        const user = {
          username: username,
          password: password,
          email: email,
        };
        try {
          return await fetchData(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}


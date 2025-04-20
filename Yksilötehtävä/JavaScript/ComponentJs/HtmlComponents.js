export const createRestaurantCells = (restaurant) => {
    const {name, address, city} = restaurant;
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.innerText = name;

    const addressTd = document.createElement('td');
    addressTd.innerText = address;

    const cityTd = document.createElement('td');
    cityTd.innerText = city;
    tr.append(nameTd, addressTd, cityTd);

    return tr
}

export const createModalHtml = (restaurant, menu, modal) => {
    const {name, address, phone} = restaurant;

    const nameH3 = document.createElement('h3');
    nameH3.innerText = name;
    const addressP = document.createElement('p');
    addressP.innerText = `${address}, puhelin: ${phone}`;

    modal.append(nameH3, addressP);

    let html = '';
    for (const course of menu) {
        const {name, price, diets} = course;

        html += `
    <article class="course">
        <p><strong>${name}</strong>,
        <strong>Hinta:</strong> ${price},
        <strong>Ruokavaliot:</strong> ${diets}</p>
    </article>
  `;
    }
    return html;
}

export const createWeeklyHtml = (restaurant, weeklymenu, modal) => {
  const {name, address, phone} = restaurant;


  const nameH3 = document.createElement('h3');
  nameH3.innerText = name;
  const addressP = document.createElement('p');
  addressP.innerText = `${address}, puhelin: ${phone}`;

  modal.append(nameH3, addressP);

  let html = '';
  for (const day of weeklymenu.days) {
    const {date, courses} = day;

    html += `<p><strong>${date}</strong>`;

    for (const course of courses) {
      const {name, price, diets} = course;

      html += `
    <article class="foodarticle">
        <p><strong>${name}</strong>,
        <strong>Hinta:</strong> ${price},
        <strong>Ruokavaliot:</strong> ${diets}</p>
    </article>
  `;
    }
  }

  return html;
}

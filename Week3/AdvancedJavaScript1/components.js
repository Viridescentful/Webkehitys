export const createRestaurantCells = (restaurant) => {
    const {name, address, city} = restaurant;
    const tr = document.createElement('tr');
    // nimisolu
    const nameTd = document.createElement('td');
    nameTd.innerText = name;
    // osoitesolu
    const addressTd = document.createElement('td');
    addressTd.innerText = address;
    // kaupunkisolu
    const cityTd = document.createElement('td');
    cityTd.innerText = city;
    tr.append(nameTd, addressTd, cityTd);

    return tr
}

export const createModalHtml = (restaurant, menu, modal) => {
    console.log(restaurant);
    const {name, address, phone} = restaurant;

    const nameH3 = document.createElement('h3');
    nameH3.innerText = name;
    const addressP = document.createElement('p');
    addressP.innerText = `${address}, puhelin: ${phone}`;

    modal.append(nameH3, addressP);

    console.log(menu);

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
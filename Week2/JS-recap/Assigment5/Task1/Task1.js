

async function fetchData() {
    const response = await fetch("https://reqres.in/api/users");

    const json = await response.json();

    if (!response.ok) {
        if (json.message) {
            throw new Error(`${json.message}, code:${response.status}`);
        }
        throw new Error(`Error ${response.status} occured!`);
    }
    return json;
}

async function logData() {
    try {
        const data = await fetchData();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

logData();
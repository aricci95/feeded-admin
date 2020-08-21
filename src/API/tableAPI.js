export function list() {
    return fetch(process.env.REACT_APP_API_URL + '/tables')
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function create(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };

    return fetch(process.env.REACT_APP_API_URL + '/tables', requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function edit(params) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };

    return fetch(process.env.REACT_APP_API_URL + '/tables/'+params._id, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

export function remove(params) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(process.env.REACT_APP_API_URL + '/tables/'+params._id, requestOptions)
        .then(response => response.json())
        .catch((error) => console.error(error));
}

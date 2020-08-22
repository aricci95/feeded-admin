const headers = {
    'Content-Type': 'application/json',
    'email': localStorage.getItem('email'),
    'token': localStorage.getItem('authToken'),
}

const api = {
    list: function (name) {
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };

        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's', requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error))
    },
    create: function (name, params) {
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        };

        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's', requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    edit: function (name, params) {
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(params)
        };

        const url = process.env.REACT_APP_API_URL + '/' + name + 's/' + params._id;

        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    remove: function (name, params) {
        const requestOptions = {
            method: 'DELETE',
            headers: headers,
        };

        const url = process.env.REACT_APP_API_URL + '/' + name + 's/' + params._id;

        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }
}

export default api

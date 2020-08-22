const api = {
    list: function (name, storage) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'email': storage.email,
                'token': storage.authToken,
            },
        };

        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's', requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error))
    },
    create: function (name, params, storage) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'email': storage.email,
                'token': storage.authToken,
            },
            body: JSON.stringify(params)
        };

        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's', requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    edit: function (name, params, storage) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'email': storage.email,
                'token': storage.authToken,
            },
            body: JSON.stringify(params)
        };

        const url = process.env.REACT_APP_API_URL + '/' + name + 's/' + params._id;

        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    remove: function (name, params, storage) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'email': storage.email,
                'token': storage.authToken,
            },
        };

        const url = process.env.REACT_APP_API_URL + '/' + name + 's/' + params._id;

        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }
}

export default api

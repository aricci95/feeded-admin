const api = {
    list: function (name) {
        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's')
            .then((response) => response.json())
            .catch((error) => console.error(error))
    },
    create: function (name, params) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        return fetch(process.env.REACT_APP_API_URL + '/' + name + 's', requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    },
    edit: function (name, params) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
        };

        const url = process.env.REACT_APP_API_URL + '/' + name + 's/' + params._id;

        return fetch(url, requestOptions)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }
}

export default api

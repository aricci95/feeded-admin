const api = {
    login: function (email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };

        return fetch(process.env.REACT_APP_API_URL + '/auth/login', requestOptions)
            .then(response => response.json())
            .then((res) => {
                if (res.code === 200) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('authToken', res.token);
                } else {
                    alert(res.message);
                }
            })
            .catch((error) => console.error(error))
            .catch((err) => alert(err.message))
    },
    logout: function (email, password) {
        localStorage.clear()
    }
}

export default api
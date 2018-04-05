import { authHeader } from '../_helpers';

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/users/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

const handleResponse = (response) => {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}

export const userService = {
    login,
    logout,
    getAll
};
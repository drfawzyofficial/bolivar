
// Import handleResponse && authHeader
import { handleResponse, authHeader } from '../helpers';

// login Auth
const login = async (username, password) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ username, password })
        };
        return await handleResponse('/api/user/logIn', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// Log User Out
const logout = () => {
    try {
        localStorage.removeItem('user');
    } catch(err) {
        console.log(err.message);
    }
  
}

export const User = { login, logout }

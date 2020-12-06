
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

// getAdmins method for getting all the admins from mongoDB
const addUser = async (firstName, lastName, username, password, role) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ firstName, lastName, username, password, role })
        };
       return await handleResponse('/api/user/addAdmin', requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}

// getAdmins method for getting all the admins from mongoDB
const getAllUsers = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
       return await handleResponse('/api/user/allUsers', requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}


// changeCashier method for getting all the admins from mongoDB
const changeCashier = async () => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
        };
       return await handleResponse('/api/user/changeCashierInfo/564d56as4f5d', requestOptions);
    } catch(err) {
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

export const User = { login, getAllUsers, addUser, changeCashier, logout }

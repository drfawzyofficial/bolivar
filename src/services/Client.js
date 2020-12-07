
// Import handleResponse && authHeader
import { handleResponse, authHeader } from '../helpers';

// addClient method to add a client
const addClient = async (name = 'Ahmed', phone = `${ Math.random() }`) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ name, phone })
        };
        return await handleResponse('/api/client/addClient', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// addClient method to add a client
const deleteClient = async (clientID) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader()
        };
        return await handleResponse(`/api/client/removeClient/${ clientID }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// getClients method to get all the clients
const getAllClients = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        return await handleResponse('/api/client/allClients', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// deleteAllClients method to get all the clients
const deleteAllClients = async () => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse('/api/client/removeAll', requestOptions);
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

// deleteUser method for deleteing the user
const deleteUser = async (_id) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader()
        };
       return await handleResponse(`/api/user/deleteUser/${ _id }`, requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}

// editUser method for deleteing the user
const editUser = async (_id, firstName, lastName, username, password, role) => {
  
    try {
        console.log(username)
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({ firstName, lastName, username, password, role })
        };
       return await handleResponse(`/api/user/changeCashierInfo/${ _id }`, requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}

// getAdmins method for getting all the admins from mongoDB
const getAllU = async () => {
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

export const Client = { addClient, deleteClient, getAllClients, deleteAllClients }


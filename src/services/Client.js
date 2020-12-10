
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


export const Client = { addClient, deleteClient, getAllClients }



// Import handleResponse && authHeader
import { handleResponse, authHeader } from '../helpers';

// addTable method to add a table
const addTable = async (number) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ number })
        };
        return await handleResponse('/api/table/addTable', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}
// updateTable method to update the table
const editTable = async (tableId, numberA) => {
    try {
        console.log(numberA)
        const number = Number(numberA);
        console.log(number)
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({ number })
        };
        return await handleResponse(`/api/table/updateNumber/${ tableId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// displayTables method to display all the tables
const getAllTables = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return await handleResponse(`/api/table/displayTables`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// removeTable method to remove a table
const deleteTable = async (tableId) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader()
        };
        return await handleResponse(`/api/table/removeTable/${ tableId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// displayTables method to remove all the tables
const deleteAllTables = async () => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader()
        };
        return await handleResponse(`/api/table/removeAll`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}




export const Table = { addTable, editTable, getAllTables, deleteTable, deleteAllTables }


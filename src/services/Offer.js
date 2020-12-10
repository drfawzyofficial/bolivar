// Import handleResponse && authHeader
import { handleResponse, authHeader } from '../helpers';

// getAllOffers method to get all the offers
const getAllOffers = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        return await handleResponse('/api/offer/showOffer', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}


// addOffer method to add offer
const addOffer = async (name, description, oldPrice, newPrice) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ name, description, oldPrice, newPrice })
        };
        return await handleResponse('/api/offer/addOffer', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// deleteOffer method to delete the offer
const deleteOffer = async (offerId) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse(`/api/offer/removeOffer/${ offerId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// dleteAllClasses method to delete the class
const deleteAllOffers = async () => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse(`/api/offer/removeAll`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}


// editOffer method to edit the offfer
const editOffer = async (offerId, name, description, oldPrice, newPrice) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({ name, description, oldPrice, newPrice })
        };
        return await handleResponse(`/api/offer/updateOffer/${ offerId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}



export const Offer = { getAllOffers, addOffer, deleteOffer, deleteAllOffers, editOffer }



import { handleResponse, authHeader } from '../helpers';

// getFeedbacks method for getting all the feedbacks from mongoDB
const getFeedbacks = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
       return await handleResponse('/api/feedback/displayFeedback', requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}

// deleteAllFeedbacks method for delete all the feedbacks from mongoDB
const deleteAllFeedbacks = async () => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse('/api/feedback/removeAll', requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}

// addFeedback method for adding one feedback to the mongoDB
const addFeedback = async () => {
    try {
        const bodyData = {
            foodQuality: 5,
            placeCleanliness: 4,
            serviceSpeed: 3,
            appExperience: 2,
            overallExperience: 1,
            name: 'Abdo Fawzy',
            phone: '01203522497',
            comment: 'Bolivar is a web application that allows you to send records with effects to people without knowing you'
        };
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(bodyData)
        };
        return await handleResponse('/api/feedback/addFeedback', requestOptions);
    } catch(err) {
        console.log(err.message);
    }
}


// deleteFeedback method for deleting one feedback from the mongoDB
const deleteFeedback = async (feedbackId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return await handleResponse(`/api/feedback/removeFeedback/${ feedbackId }`, requestOptions); 
}


export const Feedback = { addFeedback, getFeedbacks, deleteFeedback, deleteAllFeedbacks }

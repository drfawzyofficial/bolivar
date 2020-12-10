// Import handleResponse && authHeader
import { handleResponse, authHeader } from '../helpers';

// getAllClasses method to get all the classes
const getAllClasses = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        return await handleResponse('/api/class/displayClasses', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}


// addClass method to add a class
const addClass = async (englishName, arabicName) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ englishName, arabicName })
        };
        return await handleResponse('/api/class/addClass', requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// deleteClass method to delete the class
const deleteClass = async (classId) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse(`/api/class/removeClass/${ classId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// dleteAllClasses method to delete the class
const dleteAllClasses = async (classId) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        return await handleResponse(`/api/class/removeAll`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// editClass method to edit the class
const editClass = async (classId, englishName, arabicName) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({ englishName, arabicName })
        };
        return await handleResponse(`/api/class/updateName/${ classId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// editClass method to edit the class
const showClass = async (className) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        return await handleResponse(`/api/class/showClass/${ className }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// addMeal method to add meal
const addMeal = async (classId, name, description, price) => {
    try {
        console.log(price)
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ name, description, price})
        };
        return await handleResponse(`/api/menu/addMeal/${ classId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

// editMeal method to edit the meal
const editMeal = async (mealId, name, description, price) => {
    try {
        console.log(mealId, name, description, price);
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({ name, description, price})
        };
        return await handleResponse(`/api/menu/updateMeal/${ mealId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}


// addMeal method to add meal
const deleteMeal = async (classId, mealId) => {
    console.log(classId, mealId);
    try {
        const requestOptions = {
            method: 'PUT',
            headers: authHeader(),
        };
        return await handleResponse(`/api/menu/removeMeal/${ classId  }/${ mealId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}

const uploadImage = async (classId, formData) => {
    try {
        console.log(classId, formData);
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'PUT', 
            headers:  { 'Authorization': 'Bearer ' + user.token, 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
            body: formData 
        }; 
        return await handleResponse(`/api/class/addImage/${ classId }`, requestOptions);
    } catch (err) {
        console.log(err.message);
    }
}



export const Class = { getAllClasses, addClass, deleteClass, editClass, showClass, addMeal, deleteMeal, uploadImage, editMeal }


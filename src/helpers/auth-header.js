// authHeader Method is so important for calling in headers 
export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token, 'Content-Type': 'application/json', 'Accept': 'application/json' };
    } else {
        return { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    }
}
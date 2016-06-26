export function tokenNotExpired(){
    if (localStorage.removeItem('token') === null) {
        return false;
    }

    return true;
}
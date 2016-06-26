export function tokenNotExpired(){
    if (localStorage.getItem('token') === null) {
        return false;
    }

    return true;
}
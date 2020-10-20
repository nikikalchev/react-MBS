const jwt = require('jsonwebtoken');

export const ADMIN = 'admin';
export const REGISTERED_USER = 'Registered';

export function verifyToken() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return false;
    }
    try {
        jwt.verify(token, 'jksf!dsf@35dsddg');
    } catch (err) {
        return false;
    }
    return true;
}

export function isLoggedIn() {
    const token = localStorage.getItem('auth-token');
    if (!token) return false;
    return true;
}

export function logout() {
    localStorage.removeItem('auth-token');
}

export function isAdmin() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return false;
    }
    const data = jwt.verify(token, 'jksf!dsf@35dsddg');
    return (data.user.role === ADMIN);
}

export function isRegisteredUser() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return false;
    }
    const data = jwt.verify(token, 'jksf!dsf@35dsddg');
    return (data.user.role === REGISTERED_USER);
}

export function getUserName() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return '';
    }
    const data = jwt.verify(token, 'jksf!dsf@35dsddg');
    return data.user.name;
}

export function getLoggedInUserData() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return '';
    }
    const data = jwt.verify(token, 'jksf!dsf@35dsddg');
    return data.user;
}

export function getUserRole() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return 'anonymous';
    }
    const data = jwt.verify(token, 'jksf!dsf@35dsddg');
    return data.user.role;
}
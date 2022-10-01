import * as api from './api.js';


const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}

function addOwner(object) {
    const userId = sessionStorage.getItem('userId');
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', userId);
    return result;
}


// Wedding Collection
export async function getWeddings() {
    return (await api.get(host + '/classes/Wedding')).results;
}

export async function getWeddingId(id) {
    return await api.get(host + '/classes/Wedding/' + id + '?include=owner');
}

export async function getWeddingsByUserId(userId) {
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response  = await api.get(host + '/classes/Wedding?where=' + encodeURIComponent(query));
    return response.results;
}

export async function createWedding(wedding) {
    const body = addOwner(wedding);
    return await api.post(host + '/classes/Wedding', body);
}

export async function updateWedding(id, wedding) {
    return await api.put(host + '/classes/Wedding/' + id, wedding);
}

export async function deleteWedding(id) {
    return await api.del(host + '/classes/Wedding/' + id);
}

//Events collection
export async function getAllEventsByUserId(userId) {
    const query = JSON.stringify({ owner: createPointer('_User', userId) });
    const response  = await api.get(host + '/classes/Event?where=' + encodeURIComponent(query));
    return response.results;
}

export async function getAllEventsByWeddingId(weddingId) {
    const query = JSON.stringify({ wedding: createPointer('Wedding', weddingId) });
    const response  = await api.get(host + '/classes/Event?where=' + encodeURIComponent(query));
    return response.results;
}

export async function getEventById(id) {
    return await api.post(host + '/classes/Event/' + id + '?include=owner');
}

export async function createEvent(event, weddingId) {
    const body = addOwner(event);
    body.wedding = createPointer('Wedding', weddingId);
    console.log(body);
    return await api.post(host + '/classes/Event', body);
}

export async function updateEvent(id, event) {
    return await api.put(host + '/classes/Event/' + id, event);
}

export async function deleteEvent(id) {
    return await api.del(host + '/classes/Event/' + id);
}






const crypto = require('crypto')

const loginhash = crypto.createHash('sha256')

const baseAPI = "http://localhost:8080";
const addEndPoint = baseAPI + "/add";
const editEndPoint = baseAPI + "/edit";
const loginEndPoint = baseAPI + "/login"
const dataDumpEndpoint = baseAPI + "/dump";
const removeEndPoint = baseAPI + "/remove";
const categoryEndPoint = baseAPI + "/category/"


export function getCategories() {
    return getRecordsByCategory('');
}

export function doLogin(username, password) {

}
export function getRecordsByCategory(category) {
    let r = new Request(categoryEndPoint + category, {
        method: "GET",
        mode: 'cors'
    })
    return fetch(r).then(res => {
        return res.json()
    })
}
export function editItem(record) {
    let r = new Request(editEndPoint, {
        method: "POST",
        mode: 'cors',
        body: record
    })
    return fetch(r).then(res => res.json());

}
export function postNewRecord(record) {
    let r = new Request(addEndPoint, {
        method: "POST",
        mode: 'cors',
        body: record
    });
    return fetch(r).then(res => res.json());
}

export function deleteItem(ctrl) {
    let r = new Request(removeEndPoint, {
        method: "POST",
        mode: 'cors',
        body: ctrl
    });
    return fetch(r);
}

export function getDataDump() {
    let r = new Request(dataDumpEndpoint, {
        method: "GET",
        mode: 'cors'
    });
    return fetch(r).then(res => res.json());
}
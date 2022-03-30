import axios from "axios";


const url = "http://localhost:3001"




export const getUsers = (page, callback) => {
    const usersOnPage = 4;
    return axios.get(`${url}/account?_limit=${usersOnPage}&_page=${page}`)
        .then(res => {
            callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getUsers", error);
        });
}
export const getAllUsers = (callback) => {
    return axios.get(`${url}/account`)
        .then(res => {
            callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getUsers", error);
        });
}

//PUT DETELE НЕОБХОДИМ /ID 
export const sendNewContact = (user, contact, globalId, callback) =>
    axios({
        method: "PUT",
        data: { user, contacts: contact },
        url: `${url}/users/${globalId}`
    }).then((res) => {
        callback(res)
    }).catch(err => {
        callback(false, err)
    })




export const registerContact = (user, callback) =>
    axios({
        method: "POST",
        data: { user },
        url: `${url}/users`
    }).then((res) => {
        callback(res)
    }).catch(err => {
        callback(false, err)
    })



export const deleteUser = (email) =>
    axios({
        method: "DELETE",
        url: `${url}/account?email=${email}`
    }).then((res) => {
        console.log("сервер удалил: ", res);
    }).catch(err => {
        console.log("Erorr: ", err);
    })

export const changeContact = (user, contacts, id, globalId, callback) => {
    return axios({
        method: "PUT",
        data: { user, contacts },
        url: `${url}/users/${globalId}`
    }).then((res) => {
        res.data.contacts.map((value, index) => {
            if (value.id === id) callback(value)
        })
    }).catch(err => {
        callback(false, err)
    })
}
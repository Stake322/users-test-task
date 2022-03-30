import axios from "axios";


const url = "http://localhost:4000"


export const getUsers = (page, callback) => {
    axios({
        method: "GET",
        url: `${url}/account/${page}`
    }).then((res) => {
        callback(res.data)
    }).catch((err) => {
        console.log(err);
        callback(false)
    })
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

export const deleteUser = (email, callback) =>
    axios({
        method: "DELETE",
        url: `${url}/account/${email}`
    }).then((res) => {
        callback("Пользователь успешно удалён")
    }).catch(err => {
        console.log("Ошибка удаления пользователя");
    })

export const editUser = (data, id, callback) =>
    axios({
        method: "PUT",
        url: `${url}/account/${id}}`
    }).then((res) => {
        callback("Пользователь успешно удалён")
    }).catch(err => {
        console.log("Ошибка удаления пользователя");
    })



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
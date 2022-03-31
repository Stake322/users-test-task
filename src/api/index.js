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
        method: "POST",
        data,
        url: `${url}/account/${id}`
    }).then((res) => {
        callback("Пользователь успешно изменен")
    }).catch(err => {
        console.log("Ошибка изменения пользователя");
    })

export const registration = (data, admin, callback) => {
    return axios({
        method: "POST",
        data: data,
        url: url + '/auth/reg/' + admin,
    }).then((res) => {
        callback(res.data.message)
    }).catch((err) => {
        console.log(err);
        callback(false)
    })
}
export const getOrganizations = (callback) => {
    return axios.get(`${url}/ogranization`)
        .then(res => {
            callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getUsers", error);
        });
}
export const getArch = (id, callback) => {
    return axios.get(`${url}/screenshot/arch/${id}`)
        .then(res => {
            callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getUsers", error);
        });
}


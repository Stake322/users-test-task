const { Schema, model } = require('mongoose')
const Account = new Schema({
    id: { type: Number, unique: true, required: true },
    email: { type: String, required: true },
    active: { type: Boolean, required: true },
    user: { type: Object, required: true },
    roles: { type: Array, required: true },
    organization: { type: Object, required: true }
})


module.exports = model('Account', Account)
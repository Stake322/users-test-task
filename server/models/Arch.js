const { Schema, model } = require('mongoose')
const Arch = new Schema({
    id: { type: Number, unique: true, required: true },
    image: { type: String, unique: true, required: true },
})


module.exports = model('Arch', Arch)
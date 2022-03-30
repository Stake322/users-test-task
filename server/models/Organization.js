const { Schema, model } = require('mongoose')
const Organization = new Schema({
    publicationDate: { type: String, required: true },
    id: { type: Number, required: true },
    companyTitle: { type: String, required: true },
    companyUrl: { type: String, required: true },
    location: { type: String, required: true },
    numberOfAccounts: { type: Number, required: true },
});


module.exports = model('Organization', Organization)
const Organization = require('./models/Organization')
const Account = require('./models/Account')
const Arch = require('./models/Arch')
const { validationResult } = require('express-validator')

class Controller {
    //accounts
    async getAccounts(req, res) {
        try {
            const { page } = req.params;
            // const newAccount = new Account({
            //     id: 40,
            //     email: 'aboba',
            //     active: true,
            //     user: { type: "Object", required: true },
            //     roles: [{}],
            //     organization: { type: "popObject", required: true }
            // })
            // console.log('newUsr', newAccount);
            // newAccount.save()
            const perPage = 4;
            const accounts = await Account.find().limit(perPage).skip(perPage * page)
            // console.log(accounts);
            res.json(accounts);
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Get Users accounts' })
        }
    }
    async getAccountsAll(req, res) {
        try {
            const accounts = await Account.find()
            // console.log(accounts);
            res.json(accounts);
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Get Users accounts' })
        }
    }
    async deleteUser(req, res) {
        try {
            const { email } = req.params;
            const user = await Account.deleteOne({ email })
            res.json("User was deleted")
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Delete Users error' })
        }
    }
    async editUser(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const user = await Account.findOneAndUpdate({ id }, data, { new: true })
            res.json("User was edited")
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'EDIT Users error' })
        }
    }

    //org

    async getOrganizations(req, res) {
        try {
            const organizations = await Organization.find()
            res.json(organizations)
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Get Organization error' })
        }
    }
    //atch
    async getArch(req, res) {
        try {
            const archs = await Arch.find()
            res.json(archs)
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Get Users error' })
        }
    }


}

module.exports = new Controller();
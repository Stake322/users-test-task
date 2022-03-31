const Organization = require('./models/Organization')
const Account = require('./models/Account')
const Arch = require('./models/Arch')

class Controller {
    //accounts
    async getAccounts(req, res) {
        try {
            const { page } = req.params;
            const perPage = 4;
            const accounts = await Account.find().limit(perPage).skip(perPage * page)
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
    async reginstaion(req, res) {
        try {

            const data = req.body;
            const { id } = data;
            const { admin } = req.params;
            if (admin === 'admin') {
                data.roles = [
                    { "name": "ROLE_USER" },
                    { "name": "ROLE_ADMIN" }
                ]
            } else {
                data.roles = [{ "name": "ROLE_USER" }]
            }

            const candidate = await Account.findOne({ id })
            if (candidate) return res.status(400).json({ message: "Пользователь с таким именем уже существует" })

            const user = new Account(data);
            await user.save()
            return res.json({ message: "Пользователь успешно зарегистрирован" })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' })
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
            const { id } = req.params;
            const archs = await Arch.findOne({ id })
            res.json(archs)
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Get Users error' })
        }
    }


}

module.exports = new Controller();
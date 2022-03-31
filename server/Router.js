const Router = require('express');
const router = new Router();
const controller = require('./Controller')
const { check } = require("express-validator")

router.get('/account/:page', controller.getAccounts)
router.get('/account/', controller.getAccountsAll)
router.get('/ogranization', controller.getOrganizations)
router.get('/screenshot/arch/:id', controller.getArch)
router.delete('/account/:email', controller.deleteUser)
router.post('/account/:id', controller.editUser)
// router.get('/users/:token', controller.getUser)
// router.post('/add', controller.addQuestion)
// router.get('/questions', controller.getQuestion)
// router.get('/questions/:number', controller.getQuis)

router.post('/auth/reg/:admin', [check('username', 'Имя пользователя не может быть пустым').notEmpty(),
check('token', 'Токен пользователя не может быть пустым').notEmpty()],
    controller.reginstaion)
module.exports = router;
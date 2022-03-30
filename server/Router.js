const Router = require('express');
const router = new Router();
const controller = require('./Controller')


router.get('/account/:page', controller.getAccounts)
router.get('/account/', controller.getAccountsAll)
router.get('/ogranization', controller.getOrganizations)
router.get('/arch', controller.getArch)
router.delete('/account/:email', controller.deleteUser)
router.post('/account/:id', controller.editUser)
// router.get('/users/:token', controller.getUser)
// router.post('/add', controller.addQuestion)
// router.get('/questions', controller.getQuestion)
// router.get('/questions/:number', controller.getQuis)

module.exports = router;
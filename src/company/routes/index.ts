const RouterCompany = require('express').Router;
const companyController = require('../controllers/company-controller')
const companyRouter = new RouterCompany();
companyRouter.post('/create', companyController.create)
companyRouter.put('/update/:id', companyController.update)
companyRouter.delete('/delete/:id', companyController.delete)
companyRouter.get('/find/:id', companyController.findOne)
companyRouter.get('/find', companyController.find)

module.exports = companyRouter;
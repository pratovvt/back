import {CreateCompanyDto} from "../dtos/company-dto";
import {NextFunction, Request, Response} from "express";

const companyService = require('../services/company-service')

class CompanyController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, address, phone} = req.body;
            const data = await companyService.create({name, address, phone} as CreateCompanyDto)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const {name, address, phone} = req.body;
            const data = await companyService.update({id, name, address, phone} as CreateCompanyDto)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const data = await companyService.delete(id)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const data = await companyService.findOne(id)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await companyService.find()
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CompanyController()
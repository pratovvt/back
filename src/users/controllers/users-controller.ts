import {NextFunction, Request, Response} from "express";
import {CreateUserDto} from "../dtos/create-user-dto";

const userService = require('../services/user-service')

class UsersController {
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, password} = req.body
            const data = await userService.signin({id, password})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signinNewToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies;
            const data = await userService.signinNewToken(refreshToken)
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {password, email, first_name, last_name, patronymic, company_id} = req.body;
            const data = await userService.create({password, email, first_name, last_name, patronymic, company_id} as CreateUserDto)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const data = await userService.findOne(id)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.find()
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await userService.delete(id)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const {password, email, first_name, last_name, patronymic, company_id} = req.body;
            const data = await userService.update({id, password, email, first_name, last_name, patronymic, company_id})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UsersController()
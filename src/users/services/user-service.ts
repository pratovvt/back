import {AppDataSource} from '../../config/ormconfig'
import {CreateUserDto} from "../dtos/create-user-dto";
import {UpdateUserDto} from "../dtos/update-user-dto";
import {isEmailValid, isStrongPassword} from "../../helpers/helper";

const tokenService = require('../services/token-service');

const bcrypt = require('bcrypt')
const ApiError = require('../../exceptions/api-error');
const userRepo = AppDataSource.getRepository('UserEntity')
const companyService = require('../../company/services/company-service')

class UserService {
    async findOne(id: string | number) {
        const user = await userRepo.findOne({
            where: {
                id
            },
            relations: {
                company: true
            }
        })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с айди ${id} не был найден`)
        }
        return user;
    }

    async find() {
        return userRepo.find({
            relations: {
                company: true
            }
        })
    }

    async update(updateDto: UpdateUserDto) {
        const user = await this.findOne(updateDto.id)
        const updatedUser = Object.assign({
            user, ...updateDto
        })
        return await userRepo.update(updateDto.id, updatedUser)

    }

    async delete(id: string | number) {
        await this.findOne(id)
        await userRepo.delete({
            id
        })
        return {
            success: true
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async signin(userDto: CreateUserDto) {
        const user = await userRepo.findOne({where: {id: userDto.id}})
        if (!user) throw ApiError.BadRequest('Login or Password is incorrect')
        const isPassEquals = await bcrypt.compare(userDto.password, user.password);
        if (!isPassEquals) throw ApiError.BadRequest('Login or Password is incorrect');
        const tokens = tokenService.generateTokens({id: user.id});
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens}
    }

    async signinNewToken(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userRepo.findOne({where: {id: userData.id}});
        const tokens = tokenService.generateTokens({id: user.id});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...tokens}
    }

    async create(user: CreateUserDto) {
        const validEmail = isEmailValid(user.email)
        if (!validEmail) {
            throw ApiError.BadRequest('Укажите почту корректно')
        }
        const strongPassword = isStrongPassword(user.password)
        if (!strongPassword) {
            throw ApiError.BadRequest(`Измените пароль: не менее 8 символов, с мин. одной буквой в верхнем регистре и мин. одной цифрой`)
        }
        const isRegistered = await userRepo.findOne({where: {email: user.email}})
        if (isRegistered) throw ApiError.BadRequest(`Пользователь с email ${user.email} уже зарегистрирован`)
        if (user.company_id) {
            await companyService.findOne(user.company_id)
        }
        const hashPassword = await bcrypt.hash(user.password, 3);
        const userWithChangedPass = {...user, password: hashPassword}
        await userRepo.save({...userWithChangedPass, company: user.company_id});
        return {
            success: true
        }
    }
}

module.exports = new UserService()
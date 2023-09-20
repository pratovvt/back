import {CreateCompanyDto} from "../dtos/company-dto";
import {AppDataSource} from "../../config/ormconfig";

const companyModel = AppDataSource.getRepository('CompanyEntity')
const ApiError = require('../../exceptions/api-error');

class CompanyService {
    async create(dto: CreateCompanyDto) {
        const {name, phone, address} = dto;
        if (!name) {
            throw ApiError.BadRequest('Название компании не указано')
        }
        if (!phone) {
            throw ApiError.BadRequest('Телефон компании не указан')
        }
        if (!address) {
            throw ApiError.BadRequest('Адресс компании не указан')
        }
        const registeredCompany = await companyModel.findOne({
            where: {
                phone
            }
        })
        if (registeredCompany) {
            throw ApiError.BadRequest(`Данный номер ${phone} зарегистрирован`)
        }

        return companyModel.save({name, phone, address})
    }

    async update(dto: CreateCompanyDto) {
        const {name, phone, address, id} = dto;
        const registeredCompany = await this.findOne(id, false)
        const companyWithSamePhone = await companyModel.findOne({
            where: {
                phone
            }
        })
        if (companyWithSamePhone) {
            throw ApiError.BadRequest(`Данный номер ${phone} зарегистрирован`)
        }
        const updatedDate = Object.assign(registeredCompany, {...{name, phone, address}})
        await companyModel.update({id}, updatedDate)
        return {
            success: true
        }
    }

    async delete(id: number) {
        await this.findOne(id)
        await companyModel.delete({id})
        return {
            success: true
        }
    }

    async findOne(id: number | string, withRelations: boolean = true) {
        if (!id) {
            throw ApiError.BadRequest('Необходимо отправить id')
        }
        const options = withRelations ? {
            relations: {
                users: true
            }
        } : {}
        const registeredCompany = await companyModel.findOne({
            where: {
                id
            },
            ...options
        })
        if (!registeredCompany) {
            throw ApiError.BadRequest(`Компания не была найдена`)
        }
        return registeredCompany
    }

    async find() {
        return companyModel.find({
            relations: {
                users: true
            }
        })
    }
}

module.exports = new CompanyService()

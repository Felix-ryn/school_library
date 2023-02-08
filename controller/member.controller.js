const memberModel = require("../models/index").member
const Op = require("sequelize").Op
const path = require(`path`)
const fs = require(`fs`)
const upload = require(`./upload-member`).single(`image`)

exports.getAllMember = async (request, response) => {
    let members = await memberModel.findAll()
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}
exports.findMember = async (request, response) => {
    let name = request.body.name
    let gender = request.body.gender
    let address = request.body.address


    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: name } },
                { gender: { [Op.substring]: gender } },
                { address: { [Op.substring]: address } }
            ]
        }
    })
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}

exports.addMember = (request, response) => {

    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** check if file is empty */
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        /** prepare data from request */
        let newMember = {
            name: request.body.name,
            gender: request.body.gender,
            contact: request.body.contact,
            address: request.body.address,
            image: request.file.filename
        }

        memberModel.create(newMember)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New Member has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}
    

exports.updateMember = (request, response) => {
            let dataMember = {
                name: request.body.name,
                gender: request.body.gender,
                contact: request.body.contact,
                address: request.body.address
            }
            let idMember = request.params.id
            memberModel.update(dataMember, { where: { id: idMember } })
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Data Member has been updated`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        }
exports.deleteMember = (request, response) => {
            let idMember = request.params.id
            memberModel.destroy({ where: { id: idMember } })
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Data Member has been updated`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        }

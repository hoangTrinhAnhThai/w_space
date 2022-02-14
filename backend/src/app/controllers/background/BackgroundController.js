const Background = require('../../models/Background');
const Project = require('../../models/Project');

const { body, validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();

class BackgroundController {
    createBackground =
        async (req, res) => {
            const bg = await Background.create(req.body)
            return apiResponse.successResponseWithData(
                res,
                'Add new background successfully', bg
            );
        }

    showBackground =
        async (req, res) => {
            const background = await Background.find();
            if (!background) {
                return apiResponse.ErrorResponse(res, 'Not found background');
            }
            return apiResponse.successResponseWithData(res, 'background', background);
        }
    deleteBackground =
        async (req, res) => {
            await Background.findByIdAndDelete(req.params.id).then(() => {
                return apiResponse.successResponse(res, 'Delete task successfully');
            });
        }
    setBackground = async (req, res) => {
        const background = await Background.findById(req.params.idBg)
        await Project.findByIdAndUpdate(req.params.idProject, {background: background}) 
        return apiResponse.successResponse(res, 'Add bg successfully');
    }

}

module.exports = new BackgroundController();

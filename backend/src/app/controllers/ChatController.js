const Chat = require('../models/Chat');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class ChatController {
    getAllChat = [
        (req, res) => {
            Chat.find().then((chats) => {
                return apiResponse.successResponseWithData(res, 'Get all chats successfully', chats)
            }).catch((error) => {
                return apiResponse.ErrorResponse(res, error)
            })
        }
    ]
    getSingleChatById =[
        (req, res) => {
            Chat.findById(req.params.id).then((chat) => {
                return apiResponse.successResponseWithData(res, 'Get chat successfully', chat )
            }).catch((error) => {
                return apiResponse.ErrorResponse(res, error)
            })
        }
    ]

    creatChat = [
        (req, res) => {
            Chat.create(req.body).then((result) => {
                return apiResponse.successResponseWithData(res, 'Create chat successfully', result )
            }).catch((error) => {
                return apiResponse.ErrorResponse(res, error)
            })
        }
    ]
    update = [
        (req, res) => {
            Chat.findByIdAndUpdate(req.params.id, req.body.chat).then((result) => {
                return apiResponse.successResponseWithData(res, 'Update chat successfully', result )
            }).catch((error) => {
                return apiResponse.ErrorResponse(res, error)
            })
        }
    ]

    delete = [
        (req, res) => {
            Chat.findByIdAndDelete(req.params.id).then((result) => {
                return apiResponse.successResponseWithData(res, 'Delete chat successfully', result )
            }).catch((error) => {
                return apiResponse.ErrorResponse(res, error)
            })
        }
    ]
}
module.exports = new ChatController();
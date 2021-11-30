const Chat = require('../models/Chat');
const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class ChatController {
  getAllChats = [
    (req, res) => {
      Chat.find()
        .sort({ createdAt: 1 })
        .then((chats) => {
          return apiResponse.successResponseWithData(
            res,
            'Get all chats successfully',
            chats,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
  getSingleChatByRoomId = [
    (req, res) => {
      Chat.find({ room: req.params.id })
        .sort({ createdAt: 1 })
        .then((chat) => {
          return apiResponse.successResponseWithData(
            res,
            'Get chat successfully',
            chat,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];

  createChat = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        let chat = new Chat(req.body);
        chat.createdBy = user;
        Chat.create(chat)
          .then((result) => {
            return apiResponse.successResponseWithData(
              res,
              'Create chat successfully',
              result,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      });
    },
  ];
  updateChat = [
    (req, res) => {
      Chat.findByIdAndUpdate(req.params.id, req.body.chat)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Update chat successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];

  deleteChat = [
    (req, res) => {
      Chat.findByIdAndDelete(req.params.id)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Delete chat successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
}
module.exports = new ChatController();

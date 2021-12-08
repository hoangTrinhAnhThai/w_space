const Chat = require('../models/Chat');
const Notification = require('../models/Notification');
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
      Chat.find({ room: req.params.id }).populate("createdBy")
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
          .then((chat) => {
            Notification.findOne({ room: req.body.room }).then((notification) => {
              let listContent = notification.listContent
              for (let content of listContent) {
                if (JSON.stringify(user._id) != JSON.stringify(content.member._id)) {
                  content.count += 1
                  content.unreadCount += 1
                  content.contents.push({message: chat.message, createdBy: chat.createdBy})
                }
              }
              Notification.findByIdAndUpdate(notification._id, { listContent: listContent }).then((result) => {
                return apiResponse.successResponseWithData(
                  res,
                  'Create chat successfully',
                  chat,
                );
              })
            })

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

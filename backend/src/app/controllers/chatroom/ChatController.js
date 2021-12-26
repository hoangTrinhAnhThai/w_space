const Chat = require('../../models/Chat');
const Notification = require('../../models/Notification');
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');

require('dotenv').config();

class ChatController {
  getAllChats =
    async (req, res) => {
      const chats = await Chat.find()
        .sort({ createdAt: 1 })
      return apiResponse.successResponseWithData(
        res,
        'Get all chats successfully',
        chats,
      );
    }
  getSingleChatByRoomId =
    async (req, res) => {
      const chat = await Chat.find({ room: req.params.id })
        .populate('createdBy')
        .sort({ createdAt: 1 })
      return apiResponse.successResponseWithData(
        res,
        'Get chat successfully',
        chat,
      )
    }

  createChat =
    async (req, res) => {
      const user = await  User.findById(host(req, res))
      let chatParams = new Chat(req.body);
      chatParams.createdBy = user
      const chat = await Chat.create(chatParams)
      const notification = await Notification.findOne({ room: req.body.room })
      let listContent = notification.listContent;
      for (let content of listContent) {
        if (
          JSON.stringify(user._id) !=
          JSON.stringify(content.member._id)
        ) {
          content.count += 1;
          content.unreadCount += 1;
          content.contents.push({
            message: chat.message,
            createdBy: chat.createdBy,
          });
        }
      }
      await Notification.findByIdAndUpdate(notification._id, {
        listContent: listContent,
      })
      return apiResponse.successResponseWithData(
        res,
        'Create chat successfully',
        chat,
      )
    }

  updateChat =
    async (req, res) => {
      const chat = await Chat.findByIdAndUpdate(req.params.id, req.body.chat)
      return apiResponse.successResponseWithData(
        res,
        'Update chat successfully',
        chat,
      )
    }

  deleteChat =
    async (req, res) => {
      await Chat.findByIdAndDelete(req.params.id)
      return apiResponse.successResponse(
        res,
        'Delete chat successfully'
      )
    }
}
module.exports = new ChatController();

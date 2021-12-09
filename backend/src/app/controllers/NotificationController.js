const Notification = require('../models/Notification');
const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class NotificationController {
  getAllNotifications = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Notification.find({ 'listContent.member': user })
          .sort({ createdAt: 1 })
          .then((notifications) => {
            return apiResponse.successResponseWithData(
              res,
              'Get all notifications successfully',
              notifications,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      });
    },
  ];
  getNotificationByRoomId = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Notification.findOne({ room: req.params.id })
          .populate('createdBy')
          .sort({ createdAt: 1 })
          .then((notification) => {
            let listNotification = {};
            for (let content of notification.listContent) {
              if (
                JSON.stringify(user._id) == JSON.stringify(content.member._id)
              ) {
                listNotification = content;
              }
            }
            return apiResponse.successResponseWithData(
              res,
              'Get notification successfully',
              listNotification,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      });
    },
  ];

  createNotification = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        let notification = new Notification(req.body);
        notification.createdBy = user;
        Notification.create(notification)
          .then((result) => {
            return apiResponse.successResponseWithData(
              res,
              'Create notification successfully',
              result,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      });
    },
  ];
  updateNotification = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Notification.findOne({ room: req.params.id }).then((notification) => {
          let listContent = notification.listContent;
          for (let content of listContent) {
            if (
              JSON.stringify(user._id) == JSON.stringify(content.member._id)
            ) {
              content.unreadCount = 0;
            }
          }
          Notification.findByIdAndUpdate(notification._id, {
            listContent: listContent,
          }).then((result) => {
            return apiResponse.successResponseWithData(
              res,
              'Update chat successfully',
              result,
            );
          });
        });
      });
    },
  ];

  deleteNotification = [
    (req, res) => {
      Notification.findByIdAndDelete(req.params.id)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Delete notification successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
}
module.exports = new NotificationController();

const Notification = require('../models/Notification');
const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class NotificationController {
  getAllNotifications = [
    (req, res) => {
      Notification.find()
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
    },
  ];
  getSingleNotificationByRoomId = [
    (req, res) => {
      Notification.find({ room: req.params.id }).populate("createdBy")
        .sort({ createdAt: 1 })
        .then((notification) => {
          return apiResponse.successResponseWithData(
            res,
            'Get notification successfully',
            notification,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
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
      Notification.findByIdAndUpdate(req.params.id, req.body.notification)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Update notification successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
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

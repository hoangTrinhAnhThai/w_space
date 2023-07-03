const Notification = require('../../models/Notification');
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');
require('dotenv').config();

class NotificationController {
  getAllNotifications = async (req, res) => {
    const user = await User.findById(host(req, res));
    const notifications = await Notification.find({
      'listContent.member': user,
    }).sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all notifications successfully',
      notifications,
    );
  };
  getNotificationByRoomId = async (req, res) => {
    const user = await User.findById(host(req, res));
    const notification = await Notification.findOne({ room: req.params.id })
      .populate('createdBy')
      .sort({ createdAt: 1 });
    let listNotification = {};
    for (let content of notification.listContent) {
      if (JSON.stringify(user._id) == JSON.stringify(content.member._id)) {
        listNotification = content;
      }
    }
    return apiResponse.successResponseWithData(
      res,
      'Get notification successfully',
      listNotification,
    );
  };

  createNotification = async (req, res) => {
    const user = await User.findById(host(req, res));
    let notificationParams = new Notification(req.body);
    notificationParams.createdBy = user;
    const notification = await Notification.create(notificationParams);
    return apiResponse.successResponseWithData(
      res,
      'Create notification successfully',
      notification,
    );
  };
  updateNotification = async (req, res) => {
    const user = await User.findById(host(req, res));
    const notification = await Notification.findOne({ room: req.params.id });
    let listContent = notification.listContent;
    for (let content of listContent) {
      if (JSON.stringify(user._id) == JSON.stringify(content.member._id)) {
        content.unreadCount = 0;
      }
    }
    await Notification.findByIdAndUpdate(notification._id, {
      listContent: listContent,
    });
    return apiResponse.successResponse(res, 'Update chat successfully');
  };

  deleteNotification = async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    return apiResponse.successResponse(res, 'Delete notification successfully');
  };
}
module.exports = new NotificationController();

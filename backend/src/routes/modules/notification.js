const express = require('express');
const router = express.Router();
const notificationController = require('../../app/controllers/chatroom/NotificationController');

router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationByRoomId);
router.post('/', notificationController.createNotification);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;

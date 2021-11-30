const app = require('express');
const router = app.Router();
const roomController = require('../../app/controllers/RoomController');

router.get('/', roomController.showAllRoom);
router.get('/:id', roomController.showRoomById);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;

const Room = require('../../models/Room');
const User = require('../../models/User');

const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');

require('dotenv').config();

class RoomController {
  showRoomById = async (req, res) => {
    const room = await Room.findById(req.params.id);
    return apiResponse.successResponseWithData(res, 'show room success', room);
  };
  showAllRoom = async (req, res) => {
    const user = await User.findById(host(req, res));
    const rooms = await Room.find({
      $or: [{ createdBy: user }, { members: user }],
    }).sort({ createdAt: -1 });
    return apiResponse.successResponseWithData(res, 'show room success', rooms);
  };
  createRoom = async (req, res) => {
    const room = await Room.create(req.body.room);
    return apiResponse.successResponseWithData(res, 'Add room success', room);
  };
  updateRoom = async (req, res) => {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true, useFindAndModify: false },
    );
    return apiResponse.successResponseWithData(
      res,
      'Update room success',
      room,
    );
  };
  deleteRoom = async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    return apiResponse.successResponse(res, 'Delete room successfully');
  };
}

module.exports = new RoomController();

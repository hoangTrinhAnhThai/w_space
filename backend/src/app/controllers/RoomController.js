const Room = require('../models/Room');
const User = require('../models/User');

const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class RoomController {
  showRoomById = [
    (req, res) => {
      Room.findById(req.params.id)
        .then((room) => {
          return apiResponse.successResponseWithData(
            res,
            'show room success',
            room,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
  showAllRoom = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Room.find({ $or: [{ createdBy: user }, { members: user }] })
          .sort({ createdAt: -1 })
          .then((rooms) => {
            return apiResponse.successResponseWithData(
              res,
              'show room success',
              rooms,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, 'error');
          });
      });
    },
  ];
  createRoom = [
    (req, res) => {
      Room.create(req.body.room).then((room) => {
        return apiResponse.successResponseWithData(
          res,
          'Add room success',
          room,
        );
      });
    },
  ];
  updateRoom = [
    (req, res) => {
      Room.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true, useFindAndModify: false },
      ).then((result) => {
        return apiResponse.successResponseWithData(
          res,
          'Update room success',
          result,
        );
      });
    },
  ];
  deleteRoom = [
    (req, res) => {
      Room.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete room successfully');
      });
    },
  ];
}

module.exports = new RoomController();

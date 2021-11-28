const Room = require('../models/Room');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class RoomController {
  showRoomById = [
    (req, res) => {
      Room.findById(req.params.id)
        .then((room) => {
          return apiResponse.successResponseWithData(
            res,
            'show task success',
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
      Room.find()
        .sort({ createdAt: -1 })
        .then((rooms) => {
          return apiResponse.successResponseWithData(
            res,
            'show task success',
            rooms,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, 'error');
        });
    },
  ];
  createRoom = [
    (req, res) => {
      console.log(req.body);
    //   const room = new Room();
    //   room.name = req.body.name;
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
      console.log(req.body);
      Room.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true, useFindAndModify: false },
      ).then((result) => {
        console.log('result', result);
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

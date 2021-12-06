const Comment = require('../models/Comment');
const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class ChatController {
  getAllComments = [
    (req, res) => {
      Chat.find()
        .sort({ createdAt: 1 })
        .then((comments) => {
          return apiResponse.successResponseWithData(
            res,
            'Get all comments successfully',
            comments,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
  getCommentByRoomTask = [
    (req, res) => {
      Chat.find({ room: req.params.id })
        .sort({ createdAt: 1 })
        .then((comment) => {
          return apiResponse.successResponseWithData(
            res,
            'Get comment successfully',
            comment,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];

  createComment = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        let comment = new Comment(req.body);
        comment.createdBy = user;
        Comment.create(comment)
          .then((result) => {
              Task.findByIdAndUpdate(
                  req.params.id,
                  { $push: { tasks: docTask._id } },
                  { new: true, useFindAndModify: false }).then((task) => {
                    return apiResponse.successResponseWithData(
                        res,
                        'Create comment successfully',
                        result,
                      );
                  })
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      });
    },
  ];
  updateComment = [
    (req, res) => {
      Comment.findByIdAndUpdate(req.params.id, req.body.comment)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Update comment successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];

  deleteComment = [
    (req, res) => {
      Comment.findByIdAndDelete(req.params.id)
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            'Delete comment successfully',
            result,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
}
module.exports = new CommentController();

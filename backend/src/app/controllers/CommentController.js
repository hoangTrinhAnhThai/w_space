const Comment = require('../models/Comment');
const Task = require('../models/Task');

const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class CommentController {
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
  getCommentByIdTask = [
    (req, res) => {
      Comment.find({ room: req.params.id }).populate('createdBy')
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
        let comment = new Comment();
        comment.content = req.body.content
        comment.createdBy = user;
        comment.task = req.params.id
        Comment.create(comment)
          .then((doc_comment) => {
            return apiResponse.successResponseWithData(
              res,
              'Create comment successfully',
              doc_comment,
          )})
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

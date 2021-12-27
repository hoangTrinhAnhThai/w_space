const Comment = require('../../models/Comment');
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const host = require('../../../utils/decodeJWT');
require('dotenv').config();

class CommentController {
  getAllComments = async (req, res) => {
    const comments = await Chat.find().sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all comments successfully',
      comments,
    );
  };
  getCommentByIdTask = async (req, res) => {
    const comment = await Comment.find({ task: req.params.id })
      .populate('createdBy')
      .sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get comment successfully',
      comment,
    );
  };
  createComment = async (req, res) => {
    const user = await User.findById(host(req, res));
    let comment = new Comment();
    comment.content = req.body.content;
    comment.createdBy = user;
    comment.task = req.params.id;
    const docComment = await Comment.create(comment);
    return apiResponse.successResponseWithData(
      res,
      'Create comment successfully',
      docComment,
    );
  };
  updateComment = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body.comment,
    );
    return apiResponse.successResponseWithData(
      res,
      'Update comment successfully',
      comment,
    );
  };

  deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    return apiResponse.successResponseWithData(
      res,
      'Delete comment successfully',
      comment,
    );
  };
}
module.exports = new CommentController();

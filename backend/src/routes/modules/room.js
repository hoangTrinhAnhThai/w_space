const app = require('express');
const router = app.Router();
const mongoose = require('mongoose')
const Room = require('../../app/models/Room')
// const authController = require('../../app/controllers/AuthController');

router.get('/', function(req, res, next) {
    Room.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE ROOM BY ID */
  router.get('/:id', function(req, res, next) {
    Room.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE ROOM */
  router.post('/', function(req, res, next) {
    Room.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE ROOM */
  router.put('/:id', function(req, res, next) {
    Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE ROOM */
  router.delete('/:id', function(req, res, next) {
    Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  

module.exports = router;
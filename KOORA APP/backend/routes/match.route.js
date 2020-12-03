let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

let matchSchema = require('../models/Match');

// CREATE Match
router.route('/create-match').post((req, res, next) => {
  matchSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Matches
router.route('/').get((req, res, next) => {
  matchSchema.find({}).sort({ startTime: "ascending" }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Match
router.route('/edit-match/:id').get((req, res) => {
  matchSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Match
router.route('/update-match/:id').put((req, res, next) => {
  matchSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('match updated successfully !')
    }
  })
})

// Delete Match
router.route('/delete-match/:id').delete((req, res, next) => {
  matchSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
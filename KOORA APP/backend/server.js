let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
var schedule = require('node-schedule');


// Express Route
const matchRoute = require('./routes/match.route');
const Match = require('./models/Match');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
var j = schedule.scheduleJob('*/5 * * * * *', function () {
  const currentTime = new Date()
  console.log("cron job that run every 5 sec to update isActive field in DB");
  Match.find({ startTime: { $lte: currentTime }, endTime: { $gte: currentTime } }).then((mathches) => {
    mathches.forEach((item, index) => {
      Match.findByIdAndUpdate(item._id, { isActive: true }, function (err, docs) {
        if (err) { console.log(err); }

      })
    })
  })
  Match.find({ isActive: true, endTime: { $lte: currentTime } }).then((mathches) => {
    mathches.forEach((item, index) => {
      Match.findByIdAndUpdate(item._id, { isActive: false }, function (err, docs) {
        if (err) { console.log(err); }

      })
    })

  })
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/matches', matchRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


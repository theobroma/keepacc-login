import path from 'path';
import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
const MongoStore = connectMongo(session);
import morgan from 'morgan';
//mongo
import mongoose from 'mongoose';

const db = process.env.MONGODB_URI || 'mongodb://localhost/keepacctestdb';

const connect = () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connectDb = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db, err => {
      if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
      }
    });
  };
  connectDb();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connectDb);
};
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'supersecret',
    key: 'SID',
    cookie: { path: '/', httpOnly: true, maxAge: null },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public', 'build')));

//same port as client use http://localhost:3000
//app.use('*', cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  //console.log(req.get('Cookie'));
  // console.log(req.method);
  // console.log(req.query);
  // console.log(req.protocol);
  // console.log(req.secure);
  // console.log(req.headers);
  console.log(req.session);
  //console.log(req.headers['cookie']);
  // console.log(res.locals);
  // req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  // res.send('Visits:' + req.session.numberOfVisits);
});

// All routes in the end
// Redirect all non api requests to the index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

app.listen(app.get('port'), () =>
  console.log(`Server is now running on http://localhost:${app.get('port')}`)
);

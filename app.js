require("dotenv").config();

const bodyParser    = require("body-parser");
const cookieParser  = require("cookie-parser");
const express       = require("express");
const favicon       = require("serve-favicon");
const mongoose      = require("mongoose");
const logger        = require("morgan");
const path          = require("path");
const session       = require("express-session");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt        = require("bcryptjs");
const cors          = require("cors");
const flash         = require("connect-flash");
const cookieSession = require('cookie-session')
const User = require("./models/User");
mongoose
  .connect(
    `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.8bko9.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;

const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// MDW SETUP
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:3002", "https://thegoodfilm.netlify.app"],
  })
);



// MDW SESSION
// app.use(
//   session({ secret: `${process.env.SECRET}`, resave: true, saveUninitialized: true })
// );

app.set('trust proxy', 1)
app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))
app.use(session ({
    secret: `oursecret`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))

//MDW PASSPORT
app.use(passport.initialize());
app.use(passport.session());


app.use(session({ secret: 'ourPassword', resave: true, saveUninitialized: true }));
app.use(flash());

//MDW SERIALIZER USER
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});


//MDW UNSERIALIZER USER
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then((user) => callback(null, user))
    .catch((err) => callback(err));
});
//MDW STRATEGY
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: `password`,
    },
    (req, email, password, next) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return next(null, false, { message: "Incorrect email" });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect password" });
          }
          return next(null, user);
        })
        .catch((err) => next(err));
    }
  )
);



// EXPRESS VIEW SETUP
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);


app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
//MDW FLASH
app.use(flash());


app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//ROUTES
const index = require("./routes/index");
app.use("/", index);

const movieRoutes = require("./routes/movie-routes");
app.use("/", movieRoutes);

const diaryRoutes = require("./routes/diary-routes");
app.use("/", diaryRoutes);

const authRoutes = require("./routes/auth-routes");
app.use("/", authRoutes);

const reviewRoutes = require("./routes/review-routes");
app.use("/", reviewRoutes);

module.exports = app;

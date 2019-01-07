var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/register');
/* GET home page. */

const redirectTodashboard = (req, res, next) => {
  console.log(req.session);
  if(!req.session.passport) {
      next();
  } else {
      res.redirect('/dashboard');
  }
}

router.get('/', redirectTodashboard, function (req, res, next) {
  res.render('index');
});

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true
}), function (req, res, next) {
  // console.log("user",req.user);
  req.flash('success', 'Login Success..');
  res.redirect('/dashboard');
});


passport.use(new LocalStrategy(function (username, password, done) {
  User.getUserByUsername(username, function (err, user) {
    if (err) console.log(err);
    if (!user) {
      return done(null, false, {
        message: `Unknown user ${username}`
      });
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        console.log("Invalid Password");
        return done(null, false, {
          message: 'Invalid Password'
        });
      }
    });
  });
}));



module.exports = router;
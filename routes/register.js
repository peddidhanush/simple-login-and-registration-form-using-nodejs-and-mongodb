var express = require('express');
var router = express.Router();

var Register = require('../models/register');
/**
 * Go To Register page
 */
const redirectTodashboard = (req, res, next) => {
    if(!req.session.passport) {
        next();
    } else {
        res.redirect('/dashboard');
    }
  }
  
router.get('/', redirectTodashboard, function (req, res, next) {
    res.render('register', {});
});

router.post('/', (req, res, next) => {

    // console.log("submited");
    // return;
    /**
     * From the registeration form
     */
    var fname = req.body.fname;
    var mname = req.body.mname;
    var lname = req.body.lname;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    /**
     * Form validations
     */

    req.checkBody('fname', 'First Name is Required').notEmpty();
    req.checkBody('lname', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Enter A valid Email id').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('cpassword', 'Password And Confim Password Should Be Same').equals(req.body.password);

    /**
     * Check Valdations Erros
     */

    errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var userData = new Register({
            email: email,
            fname: fname,
            lname: lname,
            mname: mname,
            mobile: mobile,
            password: password
        });
        Register.createUser(userData, function (err, register) {
            console.log(err, register);
        });
        // console.log(userData);
        req.flash('success', 'User Added');
        res.redirect('/');
    }


});


module.exports = router;
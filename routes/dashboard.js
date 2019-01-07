var express = require('express');
var router = express.Router();

var Student = require('../models/dashboard');

const redirectTologin = (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.redirect('/')
    }
}

router.get('/', redirectTologin, (req, res, next) => {
    Student.getAllStudents(req.session.passport.user, (err, students) => {
        if (err) throw err;
        res.render('dashboard', {
            students: students
        });
    });
});
router.post('/addStudent', (req, res, next) => {
    /**
     * GET The Student Details
     */
    var user_id = req.body.user_id;
    var studentId = req.body.studentId;
    var name = req.body.name;
    var email = req.body.email;
    var standard = req.body.class;
    var year = req.body.year;
    var city = req.body.city;
    var country = req.body.country;

    var userData = {
        studentId: studentId,
        name: name,
        email: email,
        class: standard,
        year: year,
        city: city,
        country: country,
        userId: user_id
    };
    Student.createStudent(userData, (err) => {
        if (err) console.log(err);
    });
    req.flash('success', 'Student Added');
    res.redirect('/dashboard');
});
router.get('/delete/:id', (req, res, next) => {
    Student.deleteStudent(req.params.id, (err) => {
        if (err) console.log(err);
    });
    req.flash('success', 'Student Deleted');
    res.redirect('/dashboard');
});

router.post('/update', (req, res, next) => {
    var id = req.body.id;
    var studentId = req.body.studentId;
    var name = req.body.name;
    var email = req.body.email;
    var standard = req.body.class;
    var year = req.body.year;
    var city = req.body.city;
    var country = req.body.country;

    var studentData = {
        studentId: studentId,
        name: name,
        email: email,
        class: standard,
        year: year,
        city: city,
        country: country
    };

    Student.updateStudent(id, studentData, (err) => {
        if (err) console.log(err);
    });
    req.flash('success', 'Student Updated');
    res.redirect('/dashboard');
});
router.get('/logout', redirectTologin, function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
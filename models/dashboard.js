var monngoose = require('mongoose');

var StudentSchema = monngoose.Schema({
    studentId: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    class: {
        type: String
    },
    year: {
        type: Number
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    userId: {
        type: String
    }
});

var Student = module.exports = monngoose.model('Students', StudentSchema);


module.exports.getAllStudents = (userId,callback, limit) => {
    Student.find({userId: userId},callback).limit(limit);
}

module.exports.createStudent = (userData, callback) => {
    console.log("modal", userData);
    var data = new Student(userData);
    data.save((err) => {
        if(err) {
            console.log(err);
        } else {
            return callback;
        }
    });
}

module.exports.deleteStudent = (id, callback) => {
    Student.deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            return callback;
        }
    });
}

module.exports.updateStudent = (id, updatedata, callback) => {
    Student.findByIdAndUpdate(id, {
        $set: updatedata
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            return callback;
        }
    });
}
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    mname: {
        type: String
    },
    email: {
        type: String,
        unique : true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    }
});

var Register = module.exports = mongoose.model('Users', UserSchema);

// Get Single User by id

module.exports.getUserById = function(id, callback)  {
    Register.findById(id, callback);
}

// Get Single User by username/email

module.exports.getUserByUsername = function (username, callback)  {
    var query = {
        email: username
    };
    Register.findOne(query,callback);
}

// Compare password

module.exports.comparePassword = function (paswd, hash, callback)  {
    bcrypt.compare(paswd, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

// Create User
module.exports.createUser = function (userData, callback) {
    bcrypt.hash(userData.password, 10, function (err, hash) {
        if (err) throw err;
        // Set hash
        userData.password = hash;
        // console.log("User Created", userData);
        // async.parallel([userData.save], callback);
        userData.save(function(err) {
            if(err) {
                console.log(err)
            } else {
                return callback;
            }
        });
    });
}
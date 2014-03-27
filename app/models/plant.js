var mongoose = require('mongoose');

var plantSchema = mongoose.Schema({
details          : {
        pi_serial_id : String,
        redline      : Number,
        nickname     : String,
        owner_id     : String
    }
});

module.exports = mongoose.model('Plant', plantSchema);
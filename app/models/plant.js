var mongoose = require('mongoose');

var plantSchema = mongoose.Schema({

        pi_serial_id : String,
        sensort_id   : Number,
        redline      : Number,
        nickname     : String,
        owner_id     : String,
        plant_type   : String
});

module.exports = mongoose.model('Plant', plantSchema);
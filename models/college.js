var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var collegeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    yearFounded: {
        type: Number,
        default: 0
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    noOfStudents: {
        type: Number,
        default: 100
    },
    courses: [
        {
            type: String,
            default: ""
        }
    ]
});

var Colleges = mongoose.model('college', collegeSchema);

module.exports = Colleges;
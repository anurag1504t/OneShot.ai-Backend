var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    yearOfBatch: {
        type: Number,
        default: 0
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college'
    },
    skills: [
        {
            type: String,
            default: ""
        }
    ]
});

var Students = mongoose.model('student', studentSchema);

module.exports = Students;
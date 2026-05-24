const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    userId: {

        type: String,

        required: true
    },

    task: {

        type: String,

        required: true,

        trim: true
    },

    completed: {

        type: Boolean,

        default: false
    },

    dueDate: {

        type: String,

        required: true
    }

});

module.exports =
mongoose.model("Task", taskSchema);
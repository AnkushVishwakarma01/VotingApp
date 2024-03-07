const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    is_voted: {
        type:  Boolean,
        default: false
    },
    voted_to: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        required: true
    }
});

const candidatesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    votes_list: [{
        name: {
            type: String,
            required: true
        },
        phone_no: {
            type: String,
            required: true
        }
    }],
    is_voting_end: {
        type: Boolean,
        default: false
    }
})

const users = mongoose.model('users', usersSchema);
const candidates = mongoose.model('candidates', candidatesSchema);

module.exports = {
    users,
    candidates
}
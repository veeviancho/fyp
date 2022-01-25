const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    aboutDesc: {
        type: String
    },
    openingHours: {
        type: Object
    },
    address: {
        type: String
    },
    getHere: {
        type: Object
    },
    contact: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        message: {
            type: String
        },
        seen: {
            type: Boolean
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = About = mongoose.model("about", AboutSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { 
            expires: 200
        }
    }
});

module.exports = Token = mongoose.model("tokens", tokenSchema);
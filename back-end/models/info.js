const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
    address: {
        type: String,
        trim: true,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
});

const Info = mongoose.model("Info", infoSchema);

module.exports = { Info };

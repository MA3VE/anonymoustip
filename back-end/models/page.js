const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
    address: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        default: 0,
    },
    following: {},
});

const Page = mongoose.model("Page", pageSchema);

module.exports = { Page };

const { mongoose, Schema, model } = require("mongoose");

const Document = new Schema({
    data: Object,
    modifiedAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        default: ""
    },
})

module.exports = model("Document", Document);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cdSchema = new Schema({
    storeID: {
        type: Number,
        required: true
    },
    salesPersonID: {
        type: Number,
        required: true
    }, 
    cdID: {
        type: Number,
        required: true
    }, 
    pricePaid: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Orders", cdSchema);
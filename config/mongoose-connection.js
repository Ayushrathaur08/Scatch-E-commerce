const mongoose = require('mongoose');
const config = require('config');

const dbgr = require("debug")("development:mongoose");


mongoose.connect(`${config.get("MONGO_URI")}/scatch)`)
    .then(() => {
        dbgr("Connected to db");
    
    }).catch((err) => {
        console.log("Error connecting to db", err);
    });
exports.model = mongoose.connection;

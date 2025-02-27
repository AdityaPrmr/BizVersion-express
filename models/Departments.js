const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    sno: { type: Number, required: true},
    name: { type: String, required: true},
    id: { type:Number, required: true},
    manager: {type: Number}
});

module.exports = mongoose.model("Department", DepartmentSchema,"Department");

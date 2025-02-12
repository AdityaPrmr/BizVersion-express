const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String , required: true},
    mobile: { type: Number , required: true},
    department: {type: String, required: true},
    id: {type: Number, required: true, unique: true},
    manager: {type: Boolean, required: true},
    sno: {type: Number , required: true}
});

module.exports = mongoose.model("Employee", EmployeeSchema);

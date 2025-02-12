const mongoose = require("mongoose");

const TaskUploadSchema = new mongoose.Schema({
    taskID: { type: Number, required: true },  
    sno: { type: Number, required: true },     
    byID: { type: Number, required: true },    
    filename: { type: String, required: true },
    path: { type: String, required: true }, 
    mimetype: { type: String, required: true }, 
    size: { type: Number, required: true },     
    uploadedAt: { type: Date, default: Date.now }, 
}, { timestamps: true });


module.exports = mongoose.model("TaskUpload", TaskUploadSchema);

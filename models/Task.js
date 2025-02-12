const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: { type: Number, required:true, unique: true  }, 
    name: { type: String, required: true },
    state: { type: String, default:"BEGIN"},
    deadline: { type: Date, required: true }, 
    doc: { type: Date, default: new Date() },
    info: { type: String, default: "" },
    members: [
        { 
                lead: {type: String , Default:"TRUE"},
                name: { type: String, required: true },
                id: { type: Number, required: true }
        },
        {
            name: { type: String },
            id: { type: Number }
        }
    ],
    remark: { type: String, default: "" },
    sno: { type: Number, required: true },
    department: { type: String, default: "" }
});


module.exports = mongoose.model("Task", TaskSchema,"Task");

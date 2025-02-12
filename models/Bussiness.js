const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    sno: { type: Number, required: true, unique: true },

    // Business Details
    businessName: { type: String, required: true, unique: true },
    businessType: { 
        type: String, 
        required: true, 
        enum: ["Sole Proprietorship", "Partnership", "Pvt. Ltd.", "LLP", "Public Ltd.", "Other"] 
    },
    industry: { type: String, required: true },
    registrationNumber: { type: String, unique: true, sparse: true }, // Not all businesses have it
    gstin: { type: String, unique: true, sparse: true }, // Optional field
    businessAddress: { type: String, required: true },
    businessEmail: { type: String, required: true, unique: true },
    businessPhone: { type: String, required: true },
    website: { type: String, default: null }, // Optional field
    joinedDate: { type: Date, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"] },

    // Owner Details
    owner: {
        name: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        aadhaarOrPAN: { type: String, required: true, unique: true },
        residentialAddress: { type: String, required: true },
        ownershipPercentage: { type: Number, required: true, min: 0, max: 100 },
        idProofType: { type: String, required: true, enum: ["Driving License", "Passport", "Voter ID", "Other"] },
        idProofNumber: { type: String, required: true, unique: true }
    }
});

module.exports = mongoose.model("Business", BusinessSchema);

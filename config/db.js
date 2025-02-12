const mongoose = require("mongoose");

const connectDB = async()=>{

    try
    {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("MongoDB connection error:", err));

        mongoose.connection.once("open", async () => {
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log("Collections in DB:", collections.map(c => c.name));
        });
    }
    catch(error)
    {
        console.error(error.message);
        process.exit(1);
    }

};

module.exports = connectDB;
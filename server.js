require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*"}));

connectDB();


app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/department", require("./routes/department"));
app.use("/api/employee", require("./routes/Employee"));
app.use("/api/task", require("./routes/Task"));
app.use("/api/file",require("./routes/TaskUpload"));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
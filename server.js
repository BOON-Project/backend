const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const morgan = require("morgan");
//require("dotenv").config();
const taskRoutes = require("./routes/taskRouter");

const userRoutes = require("./routes/userRouter");
const meRoutes = require("./routes/meRouter");
const skillRoutes = require("./routes/skillRouter");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const env = require("./config/config");

app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
});

app.use(express.json({ limit: "5mb" }));
app.use(
    cors({
        origin: env.frontendOrigin || "http://localhost:3000", // frontend URL should be configurable
    })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello");
});

mongoose
    .connect(env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Connection to db established"))
    .catch((err) => console.log("[ERROR] DB connection failed", err));

//Here come routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/me", meRoutes);
app.use("/skills", skillRoutes);


// Error handler
app.use(function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message });
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
//require("dotenv").config();

const cors = require('cors');
const env = require('./config/config');

app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
});

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello")
});

mongoose.connect(env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log('Connection to db established'))
.catch((err) => console.log('[ERROR] DB connection failed', err));

//Here come routes
//app.use('', blablaRouter);

// Error handler
app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 500).send({
      error: {
        message: err.message,
      },
    });
  });
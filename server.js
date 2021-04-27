const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
require("dotenv").config();
const taskRoutes = require('./routes/taskRouter');
const userRoutes = require('./routes/userRouter');
const meRoutes = require('./routes/meRouter');
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser');


const cors = require('cors');
const env = require('./config/config');

app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
});

app.use(express.json());
app.use(cors(
  // { origin: 'http://localhost:3000', // frontend URL should be configurable
  // credentials: true, // allow cookies to be sent from frontend to us}
  // }
  ));
app.use(cookieParser());
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
app.use('/task', taskRoutes);
app.use('/user', userRoutes);
app.use('/me', meRoutes);

// Error handler
app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 500).send({
      error: {
        message: err.message,
      },
    });
  });
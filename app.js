require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require("hbs");
const app = express();
//#########################
// SESSIONS/COOKIES IMPORT
//#########################
require("./config/sessions")(app);
require("./config")(app);

const userRoutes = require("./routes/user-routes");
app.use("/", userRoutes);

const loginRoutes = require('./routes/login-routes')
app.use('/login', loginRoutes)

const signupRoutes = require('./routes/signup-routes')
app.use('/signup', signupRoutes)

const postRoutes = require('./routes/post-routes')
app.use('/post', postRoutes)

const authRoutes = require('./routes/auth-routes')
app.use('/', authRoutes)

const generalRoutes = require('./routes/general-routes')
app.use('/', generalRoutes)

const threadRoutes = require('./routes/thread-routes')
app.use('/', threadRoutes)




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

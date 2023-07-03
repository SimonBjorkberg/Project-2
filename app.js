// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const path = require("path");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "FullStack_Project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

//Partials
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "views", "partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//#########################
// SESSIONS/COOKIES IMPORT
//#########################
require("./config/sessions")(app);
require("./config")(app);



const userRoutes = require("./routes/user-routes");
app.use("/", userRoutes);

const loginRoutes = require('./routes/login-routes')
app.use('/', loginRoutes)

const signupRoutes = require('./routes/signup-routes')
app.use('/signup', signupRoutes)

const postRoutes = require('./routes/post-routes')
app.use('/post', postRoutes)

const authRoutes = require('./routes/auth-routes')
app.use('/', authRoutes)

const generalRoutes = require('./routes/general-routes')
app.use('/', generalRoutes)

const threadRoutes = require('./routes/thread-routes')
app.use('/threads', threadRoutes)

const messageRoutes = require('./routes/message-routes')
app.use('/', messageRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

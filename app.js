const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const flash = require("connect-flash");
const expressSession = require("express-session");
// const session = require("express-session"); // Use 'session' instead of 'expressSession'


const cookieParser = require("cookie-parser");
const path = require("path");
const usersRouter = require("./routes/userRouter");
const ownerRouter = require("./routes/ownerRouters");
const productRouter = require("./routes/productsRouters");
const indexRouter = require("./routes/index");

require("dotenv").config();

//handling middlewares
app.use(express.json());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_KEYS,
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//mouting the routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/owners", ownerRouter);
app.use("/owners/products", productRouter);

// app.get("/", (req, res) => {
//   res.render("index", {
//     error: req.flash("error"),
//     loggedin: !!req.session.user, // Convert to true/false
//   });
// });


app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});

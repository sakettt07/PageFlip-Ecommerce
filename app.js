require('dotenv').config();

const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection.js");

const ownersRouter = require("./routes/ownersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const index=require("./routes/index.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");

// Routes (Separation of concerns)
app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// console.log(process.env.MODE);
app.listen(3000);

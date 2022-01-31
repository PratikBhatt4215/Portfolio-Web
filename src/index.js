const express = require("express");
require("../db/conn");
const User = require("../src/validation")
const path = require('path');
const app = express();
// const requests = ('requests');
var requests = require("requests");

const hbs = require("hbs");
const port = 8000;

//built in middleware
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");




//set the view engine
app.set("view engine", "hbs");
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}))
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

//template enginer routes

app.get("", (req, res) => {
    res.render("index");
});


app.get("/projects", (req, res) => {
    res.render("projects");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("contact");
        
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/resume", (req, res) => {
    res.render("resume");
});



app.get("*", (req, res) => {
    res.render("404", {
        errorcomment: "opps this about page not found",
    });
});


app.listen(port, () => {
    console.log(`Pratik App Listening At http://localhost:${port}`)
  })
const express = require('express');
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});

/*app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));*/

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
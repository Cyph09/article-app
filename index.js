const express = require("express");
const cors = require('cors');
const exphbs = require("express-handlebars");
const articles = require("./routes/api/articles");
const articles_arr = require("./data/Articles");

const app = express();

// Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parse middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.render("index", { title: "Article App", articles_arr })
);

// Static folder
// app.use(express.static(__dirname, 'public'));

// ROUTES
app.use("/api/articles", articles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

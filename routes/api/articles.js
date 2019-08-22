const express = require("express");
const moment = require("moment");
const Joi = require("@hapi/joi");

const articles = require("../../data/Articles");

const router = express.Router();

// Get articles all Articles
router.get("/", (req, res) => {
  res.json(articles);
});

// Get single article
router.get("/:id", (req, res) => {
  const article = articles.find(c => c.id === parseInt(req.params.id));
  if (!article)
    res
      .status(404)
      .json({ message: `The article with ID ${req.params.id} was not found.` });
  res.json(article);
});

// Create an article
router.post("/", (req, res) => {
  const { error, value } = validateInput(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const newArticle = {
    id: articles.length + 1,
    name: value.name,
    author: value.author,
    read_time: value.read_time,
    published: moment().format("YYYY-MM-DD")
  };

  articles.push(newArticle);
  res.json({message: 'New article added', articles});
});

// Update an article
router.put("/:id", (req, res) => {
  const article = articles.find(c => c.id === parseInt(req.params.id));
  if (!article)
    res
      .status(404)
      .json({ message: `The article with ID ${req.params.id} was not found.` });

  const { error, value } = validateInput(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  article.name = value.name;
  article.author = value.author;
  article.read_time = value.read_time;
  res.json({
    message: `Article with ID ${req.params.id} was updated`,
    articles
  });
});

// Delete an article
router.delete("/:id", (req, res) => {
  const article = articles.find(c => c.id === parseInt(req.params.id));
  if (!article)
    res
      .status(404)
      .json({ message: `The article with ID ${req.params.id} was not found.` });

  res.json({
    message: `The article with ID ${req.params.id} was deleted.`,
    articles: articles.filter(article => article.id !== parseInt(req.params.id))
  });
});

// Validate function
function validateInput(article) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    author: Joi.string()
      .min(3)
      .max(30)
      .required(),
    read_time: Joi.string().required()
  };

  return Joi.validate(article, schema);
}

module.exports = router;

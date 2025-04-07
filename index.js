import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.render("index", {posts});
});

app.get("/view", (req, res) => {
  res.render("view", {posts});
});

app.get("/create", (req, res) => {
  res.render("create", {posts});
});

app.get("/blog/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("blog", {post, posts});
});

app.post("/add", (req,res) => {
  const {title, content} = req.body;
  posts.push({id: nextId++, title, content});
  res.redirect("/view");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", {post, posts});
});

app.post("/update/:id", (req, res) => {
  const {title, content} = req.body;
  posts = posts.map(post => post.id == req.params.id ? {...post, title, content}: post);
  res.redirect("/view");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(post => post.id != req.params.id);
  res.redirect("/view");
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
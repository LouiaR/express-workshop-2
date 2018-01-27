const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const fs = require('fs');
const postsJson = require('./data/posts.json')

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public", {'extensions': ['html']}));

app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    const fileData = file.toString();
    const postsJson = JSON.parse(fileData);
    res.render("index", {
      title: "Louis Profile",
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});


app.get('/my-cv', (req, res) => {
  res.render('my-cv', {
    title:'My CV'
  });
})

app.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Admin'
  });
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Get in Touch'
  });
})

app.get('/posts/:postid', (req, res) => {
  res.send('yes')
})

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

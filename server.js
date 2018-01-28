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
      bg:'img/home-bg.jpg',
      heroTitle:'A modern Website built in Node',
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

app.get('/post', (req, res) => {
  res.render('post', {
    big:'img/post-bg.jpg',
    heroTitle:'yes'
  })
})

app.get('/my-cv', (req, res) => {
  res.render('my-cv', {
    title:'My CV',
    bg:'img/contact-bg.jpg',
    heroTitle:'Here is my CV'
  });
})

app.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Admin',
    bg:'img/about-bg.jpg',
    heroTitle:'Admin panel'
  });
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Get in Touch',
    bg:'img/home-bg.jpg',
    heroTitle:'A modern Website built in Node'  
  });
})


// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

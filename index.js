const PORT = 8080;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();

const fonts = [
  {
    link: "https://www.analistaspadel.com/",
    name: "Analistas Padel",
    css: ".td-module-thumb a",
    title: "title",
    href: "href",
    photo: {
      children: "span",
      attr: "data-bg",
    },
  },
  {
    link: "https://www.padeladdict.com/",
    name: "Padel Addict",
    css: ".td-module-thumb a",
    title: "title",
    href: "href",
    photo: {
      children: "img",
      attr: "src",
    },
  },
];

const allArticles = [];

fonts.forEach((font) => {
  axios.get(font.link).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $(font.css, html).each(function () {
      const title = $(this).attr(font.title);
      const url = $(this).attr(font.href);
      const photo = $(this).children(font.photo.children).attr(font.photo.attr);

      allArticles.push({
        fontName: font.name,
        title,
        photo,
        url,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to my padel Api");
});

app.get("/news", (req, res) => {
  //ESTE FUNCIONANDO BIEN !!
  // axios
  //   .get("https://www.analistaspadel.com/")
  //   .then((response) => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     const selector = $(".td-module-thumb a");
  //     selector.each((idx, el) => {
  //       const article = { name: "", web: "", photo: "" };
  //       article.name = $(el).attr("title");
  //       article.web = $(el).attr("href");
  //       article.photo = $(el).children("span").attr("data-bg");
  //       allArticles.push(article);
  //     });
  //     res.json(allArticles);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  res.json(allArticles);
});

app.listen(PORT, () => {
  console.log("server running on port" + PORT);
});

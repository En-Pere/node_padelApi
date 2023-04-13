const axios = require("axios");
const cheerio = require("cheerio");

const fonts = [
  {
    link: "https://www.analistaspadel.com/",
    name: "Analistas Padel",
    css: "'.td-module-thumb a'",
    title: "attr('title')",
    href: "attr('href')",
    photo: ".children('span').attr('data-bg')",
  },
  {
    link: "https://www.padeladdict.com/",
    name: "Padel Addict",
    css: "'.td-module-thumb a'",
    title: "attr('title')",
    href: "attr('href')",
    photo: ".children('img').attr('src')",
  },
];

let url = "https://www.analistaspadel.com/";

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const listWebsite = $(".td-module-thumb a");

    const listArticles = [];

    listWebsite.each((idx, el) => {
      const article = { name: "", web: "", photo: "" };
      article.name = $(el).attr("title");
      article.web = $(el).attr("href");
      article.photo = $(el).children("span").attr("data-bg");
      listArticles.push(article);
    });

    console.log(listArticles);

    // const listWebsite = $(".td-module-thumb a");

    // const listArticles = [];

    // listWebsite.each((idx, el) => {
    //   const article = { name: "", web: "", photo: "" };
    //   article.name = $(el).attr("title");
    //   article.web = $(el).attr("href");
    //   article.photo = $(el).children("span").attr("data-bg");
    //   listArticles.push(article);
    // });

    // console.log(listArticles);
  } catch (err) {
    console.log(err);
  }
}
scrapeData();

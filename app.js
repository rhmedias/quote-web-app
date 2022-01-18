const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, (req, res) => {
    console.log(`Server is UP⬆️ on port: ${PORT}`);
});

const quote = "My quote";
const author = "Author";
let datas = "";

app.get("/", (req, res) => {
    const options = {
        method: "GET",
        url: "https://inspiring-quotes.p.rapidapi.com/random",
        // qs: { author: "Albert" },
        headers: {
            "x-rapidapi-host": "inspiring-quotes.p.rapidapi.com",
            "x-rapidapi-key": process.env.API_KEY,
            useQueryString: true,
        },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        datas = JSON.parse(body);

        console.log(datas);
        res.render("index", {
            quoteContent: datas.quote,
            authorName: datas.author,
        });
    });
});

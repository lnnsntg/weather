const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

const dotenv = require("dotenv");
dotenv.config();

//Define path for Express config
const publicDirectoryPaht = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPaht));

//------------------------------------------------------------------------

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You most provide an address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send( {error} );
    } else {
      const localidad = data.place_name;
      const latitud = data.center[1];
      const longitud = data.center[0];
      const ad = `${ latitud }, ${ longitud }`;

      forecast(ad, (error, data) => {
        if (error) {
          res.send({ error });
        } else {
          const { name, country, region } = data.location;
          const {
            weather_descriptions = weather_descriptions[0],
            temperature,
            feelslike,
          } = data.current;

          res.send({
            "Search term": req.query.address,
            "Coordinate found according to search term": `${ latitud },${ longitud }`,
            
            "Return location according to the coordinates sent to weatherstack.com": `${ name }, ${ region }, ${ country }`,
            "Weather description": `${ weather_descriptions }`,
            "Actual Temperature": `${ temperature }º grados centígrados`,
            "Thermal sensation": `${ feelslike }º grados centígrados`,
          });
        }
      });
    }
  });
});

//------------------------------------------------------------------------

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

//------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Aqui va el texto del parrafó de ayuda",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running! at port ${ process.env.PORT }`);
});

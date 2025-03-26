const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const connection = require("./Context/AppContext");
const Pokemon = require("./Models/Pokemon");
const Region = require("./Models/Region");
const Tipo = require("./Models/Tipo");

Region.hasMany(Pokemon, { foreignKey: "regionId", onDelete: "CASCADE" });
Pokemon.belongsTo(Region, { foreignKey: "regionId" });

Tipo.hasMany(Pokemon, { foreignKey: "tipoId", onDelete: "CASCADE" });
Pokemon.belongsTo(Tipo, { foreignKey: "tipoId" });

const pokemonRouter = require("./Routes/Pokemon");
const typeRouter = require("./Routes/Type");
const regionRouter = require("./Routes/Region");
const homeRouter = require("./Routes/Home");

const errorController = require("./Controllers/ErrorController");

const { registerHelpers } = require("./Util/handlebars-helpers");
registerHelpers();

app.engine(
  "hbs",
  engine({
    layoutsDir: "Views/Layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "Views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "Public")));

app.use(homeRouter);
app.use(pokemonRouter);
app.use(typeRouter);
app.use(regionRouter);


app.use("/", errorController.Get404);

connection.sync().then(() => {
  app.listen(5001);
}).catch((err) => {
  console.error(err);
});

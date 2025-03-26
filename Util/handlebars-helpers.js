const Handlebars = require("handlebars");

module.exports = {
  registerHelpers: () => {
    Handlebars.registerHelper("eq", function (a, b) {
      return a === b;
    });
  }
};
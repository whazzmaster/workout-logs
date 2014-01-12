define([
  'Handlebars',
  'underscore'
  ], function(Handlebars, _) {

  var formatNumber = function(number) {
    if(_.isFinite(number)) {
      return number;
    } else {
      return "";
    }
  };

  Handlebars.registerHelper('formatNumber', formatNumber);

  return formatNumber;
});


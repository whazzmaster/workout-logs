define([
  'Handlebars',
  'underscore'
  ], function(Handlebars, _) {

  var formatWeight = function(weight) {
    if(_.isFinite(weight)) {
      return weight+"lb";
    } else {
      return "";
    }
  };

  Handlebars.registerHelper('formatWeight', formatWeight);

  return formatWeight;
});


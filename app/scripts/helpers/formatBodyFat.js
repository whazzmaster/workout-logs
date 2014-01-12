define([
  'Handlebars',
  'underscore'
  ], function(Handlebars, _) {

  var formatBodyFat = function(bodyFat) {
    if(_.isFinite(bodyFat)) {
      return bodyFat+'%';
    } else {
      return '';
    }
  };

  Handlebars.registerHelper('formatBodyFat', formatBodyFat);

  return formatBodyFat;
});


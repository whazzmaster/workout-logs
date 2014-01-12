define([
  'Handlebars',
  'moment',
  'underscore'
  ], function(Handlebars, moment, _) {

  var formatDate = function(date, format) {
    if(_.isUndefined(date) || _.isNull(date) || date === "") {
      return "";
    }

    if(!format || format === 'long') {
      return moment(date).format('MMMM Do, YYYY');
    } else if(format === 'short') {
      return moment(date).format('YYYY-MM-DD');
    }
  };

  Handlebars.registerHelper('formatDate', formatDate);

  return formatDate;
});


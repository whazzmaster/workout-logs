define([
  'backbone',
  'moment',
  'localStorage'
  ], function(Backbone, moment) {
  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("WeeklySummaries"),
    idAttribute: 'weekNumber'
  });
});
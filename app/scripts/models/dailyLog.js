define([
  'backbone',
  'moment',
  'localStorage'
  ], function(Backbone, moment) {
  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("DailyLogs"),

    idAttribute: 'slug',

    setLogDate: function(logDate) {
      var date = moment(logDate);
      this.set('logDate', date.format());
      this.set('slug', date.format('YYYY-MM-DD'));
    },

    getLogDate: function() {
      return moment(this.get('logDate'));
    }
  });
});
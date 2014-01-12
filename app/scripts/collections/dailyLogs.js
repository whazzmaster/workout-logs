define([
  'backbone',
  'moment',
  'models/dailyLog',
  'localStorage'
  ], function(Backbone, moment, DailyLog) {
  return Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("DailyLogs"),

    model: DailyLog,

    comparator: function(first, second) {
      var firstMoment = moment(first.get('slug'));
      var secondMoment = moment(second.get('slug'));
      if(firstMoment.isSame(secondMoment)) return 0;
      if(firstMoment.isBefore(secondMoment)) {
        return 1;
      } else {
        return -1;
      }
    },

    getLogForDate: function(date) {
      return this.findWhere({slug: date});
    },

    getStartDateForSummary: function() {
      var latestLog = this.getMostRecentLog();
      var logDate = latestLog.getLogDate();
      return logDate.subtract('weeks', 1);
    },

    getEndDateForSummary: function() {
      var latestLog = this.getMostRecentLog();
      return latestLog.getLogDate();
    },

    getMostRecentLog: function() {
      return this.first();
    }
  });
});
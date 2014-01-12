define(['backbone', 'models/weeklySummary'], function(Backbone, WeeklySummary) {
  return Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("WeeklySummaries"),

    model: WeeklySummary,

    comparator: 'weekNumber',

    getSummary: function(weekNumber) {
      return this.findWhere({weekNumber: weekNumber});
    },

    getNextWeekNumber: function() {
      if(this.length === 0) return 1;

      var lastRecordedWeek = this.max(function(summary) {
        return parseInt(summary.get('weekNumber'));
      });

      return parseInt(lastRecordedWeek.get('weekNumber'))+1;
    }
  });
});
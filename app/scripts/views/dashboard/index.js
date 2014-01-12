define([
  'backbone',
  'marionette',
  'views/profile/show',
  'views/logs/index',
  'views/summaries/index',
  'hbs!templates/dashboard/index'
  ], function(Backbone, Marionette, ShowProfileView, IndexLogsView, IndexSummariesView, indexTemplate) {
    return Marionette.ItemView.extend({
      template: indexTemplate,

      events: {
        'click a.delete-log': 'deleteLog',
        'click a.delete-summary': 'deleteSummary'
      },

      initialize: function(options) {
        this.dailyLogs = options.dailyLogs;
        this.weeklySummaries = options.weeklySummaries;
        this.profile = options.profile;

        this.dailyLogs.on('remove', this.renderLogs, this);
        this.weeklySummaries.on('remove', this.renderSummaries, this);

        this.logsView = new IndexLogsView({collection: this.dailyLogs});
        this.summariesView = new IndexSummariesView({collection: this.weeklySummaries});
      },

      onBeforeClose: function() {
        this.dailyLogs.off('remove', this.renderLogs);
        this.weeklySummaries.off('remove', this.renderSummaries);
      },

      deleteLog: function(clickEvent) {
        clickEvent.preventDefault();
        var slug = $(clickEvent.currentTarget).data('id');
        var log = this.dailyLogs.getLogForDate(slug);
        console.log('Deleting log...');
        console.log(log.toJSON());
        this.dailyLogs.remove(log);
        log.destroy();
        console.log('...done');
      },

      deleteSummary: function(clickEvent) {
        clickEvent.preventDefault();
        var weekNumber = $(clickEvent.currentTarget).data('id');
        var summary = this.weeklySummaries.getSummary(weekNumber.toString());
        console.log('Deleting summary...');
        console.log(summary.toJSON());
        this.weeklySummaries.remove(summary);
        summary.destroy();
        console.log('...done');
      },

      render: function() {
        this.$el.html(this.template());

        var profileView = new ShowProfileView({model: this.profile});
        this.$el.find('#profile').html(profileView.render().el);

        this.renderLogs();
        this.renderSummaries();
      },

      renderLogs: function() {
        this.$el.find('#daily-logs').html(this.logsView.render().el);
      },

      renderSummaries: function() {
        this.$el.find('#weekly-summaries').html(this.summariesView.render().el);
      }
    });
});
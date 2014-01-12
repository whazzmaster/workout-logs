define([
  'backbone',
  'marionette',
  'models/profile',
  'models/dailyLog',
  'models/weeklySummary',
  'collections/dailyLogs',
  'collections/weeklySummaries',
  'views/dashboard/index',
  'views/profile/none',
  'views/profile/edit',
  'views/logs/create',
  'views/logs/edit',
  'views/logs/show',
  'views/summaries/create',
  'views/summaries/show',
  'views/summaries/edit'
  ], function(Backbone, Marionette,
              Profile, DailyLog, WeeklySummary,
              DailyLogsCollection, WeeklySummariesCollection,
              DashboardView, NoProfileView, EditProfileView,
              CreateLogView, EditLogView, ShowLogView,
              CreateSummaryView, ShowSummaryView, EditSummaryView) {
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'profile/edit'        : 'editProfile',
      'logs/create'         : 'createLog',
      'logs/:date'          : 'showLog',
      'logs/:date/edit'     : 'editLog',
      'summaries/create'    : 'createSummary',
      'summaries/:week'     : 'showSummary',
      'summaries/:week/edit': 'editSummary'
    },

    initialize: function() {
      this.region = new Backbone.Marionette.Region({
        el: "#main-view"
      });

      var dailyLogs = this.dailyLogs = new DailyLogsCollection();
      console.log("Fetching stored daily logs from localStorage...");
      dailyLogs.fetch({
        success: function(collection, response, options) {
          console.log("Found "+collection.length+" logs in localStorage.");
        },
        error: function(collection, response, options) {
          console.log("Did not find logs in localStorage.");
        }
      });

      var weeklySummaries = this.weeklySummaries = new WeeklySummariesCollection();
      console.log("Fetching stored weekly summaries from localStorage...");
      weeklySummaries.fetch({
        success: function(collection, response, options) {
          console.log("Found "+collection.length+" summaries in localStorage.");
        },
        error: function(collection, response, options) {
          console.log("Did not find summaries in localStorage.");
        }
      });

      var profile = this.profile = new Profile({id: 1});
      profile.fetch({
        success: function(model, response, options) {
          console.log('Profile found in localStorage.');
          profile.set('hasProfile', true);
        },
        error: function(model, response, options) {
          console.log('No profile found in localStorage.');
          profile.set('hasProfile', false);
        }
      });

      var router = this;
      profile.on('sync', function() {
        console.log('Detected profile save; redirecting to index');
        router.navigate('', {trigger: true});
      });

      dailyLogs.on('add', function(model, collection, options) {
        console.log('Detected log creation; redirecting to show log');
        var logDateStr = model.getLogDate().format('YYYY-MM-DD');
        router.navigate('logs/'+logDateStr, {trigger: true});
      });

      weeklySummaries.on('add', function(model, collection, options) {
        console.log('Detected summary creation; redirecting to show summary');
        var weekNumber = model.get('weekNumber');
        router.navigate('summaries/'+weekNumber);
      });
    },

    index: function() {
      console.log('Router: # [Start]');
      document.title = 'Workout Logs';
      if(!this.profile.get('hasProfile')) {
        this.region.show(new NoProfileView());
      } else {
        this.region.show(new DashboardView({
          dailyLogs: this.dailyLogs,
          weeklySummaries: this.weeklySummaries,
          profile: this.profile
        }));
      }
      console.log('Router: # [End]');
    },

    editProfile: function() {
      console.log('Router: #profile/edit [Start]');
      document.title = 'Edit Profile';
      this.region.show(new EditProfileView({model: this.profile}));
      console.log('Router: #profile/edit [End]');
    },

    createLog: function() {
      console.log('Router: #logs/create [Start]');
      document.title = 'Create Workout Log';
      var log = new DailyLog();
      log.setLogDate(moment());
      this.region.show(new CreateLogView({
        model: log,
        logsCollection: this.dailyLogs
      }));
      console.log('Router: #logs/create [End]');
    },

    showLog: function(date) {
      console.log('Router: #logs/'+date+' [Start]');
      var log = this.dailyLogs.getLogForDate(date);
      if(log) {
        document.title = date+' Daily Log';
        this.region.show(new ShowLogView({
          model: log,
          dailyLogs: this.dailyLogs
        }));
      }
      console.log('Router: #logs/'+date+' [End]');
    },

    editLog: function(date) {
      console.log('Router: #logs/'+date+'/edit [Start]');
      var log = this.dailyLogs.getLogForDate(date);
      var router = this;
      if(log) {
        document.title = 'Edit '+date+' Daily Log';
        log.once('sync', function(log) { router.navigate('logs/'+date, {trigger: true}); });
        this.region.show(new EditLogView({model: log}));
      }
      console.log('Router: #logs/'+date+'/edit [End]');
    },

    createSummary: function() {
      console.log('Router: #summaries/create [Start]');
      document.title = 'Create Weekly Summary';
      var summary = new WeeklySummary();
      this.region.show(new CreateSummaryView({
        summary: summary,
        profile: this.profile,
        dailyLogs: this.dailyLogs,
        weeklySummaries: this.weeklySummaries
      }));
      console.log('Router: #summaries/create [End]');
    },

    showSummary: function(weekNumber) {
      console.log('Router: #summaries/'+weekNumber+' [Start]');
      var summary = this.weeklySummaries.getSummary(weekNumber);
      if(summary) {
        document.title = 'Week '+weekNumber+' Summary';
        this.region.show(new ShowSummaryView({
          summary: summary,
          profile: this.profile,
          dailyLogs: this.dailyLogs,
          weeklySummaries: this.weeklySummaries
        }));
      }
      console.log('Router: #summaries/'+weekNumber+' [End]');
    },

    editSummary: function(weekNumber) {
      console.log('Router: #summaries/'+weekNumber+'/edit [Start]');
      var summary = this.weeklySummaries.getSummary(weekNumber);
      var router = this;
      if(summary) {
        document.title = 'Edit Week '+weekNumber+' Summary';
        summary.once('sync', function(summary) { router.navigate('summaries/'+weekNumber, {trigger: true}); });
        this.region.show(new EditSummaryView({
          summary: summary,
          profile: this.profile,
          dailyLogs: this.dailyLogs,
          weeklySummaries: this.weeklySummaries
        }));
      }
      console.log('Router: #summaries/'+weekNumber+'/edit [End]');
    }
  });
});
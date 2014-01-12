define([
  'backbone',
  'marionette',
  'hbs!templates/logs/show'
  ], function(Backbone, Marionette, showLogTemplate) {
    return Marionette.ItemView.extend({
      template: showLogTemplate,
      className: 'daily-log',

      initialize: function(options) {
        this.model = options.model;
        this.dailyLogs = options.dailyLogs;
      },

      onBeforeRender: function() {
        var modelIndex = this.dailyLogs.indexOf(this.model);
        if(modelIndex > 0) {
          this.model.set('nextSlug', this.dailyLogs.at(modelIndex-1).get('slug'));
        }

        var lastModelIndex = this.dailyLogs.length-1;
        if(modelIndex < lastModelIndex) {
          this.model.set('previousSlug', this.dailyLogs.at(modelIndex+1).get('slug'));
        }
      }
    });
});
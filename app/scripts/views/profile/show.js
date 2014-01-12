define([
  'backbone',
  'marionette',
  'hbs!templates/profile/show'
  ], function(Backbone, Marionette, showProfileTemplate) {
  return Marionette.ItemView.extend({
    template: showProfileTemplate
  });
});
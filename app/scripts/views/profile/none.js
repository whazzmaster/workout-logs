define([
  'backbone',
  'marionette',
  'hbs!templates/profile/none'
  ], function(Backbone, Marionette, noProfileTemplate) {
  return Marionette.ItemView.extend({
    template: noProfileTemplate
  });
});
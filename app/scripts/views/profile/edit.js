define([
  'backbone',
  'marionette',
  'hbs!templates/profile/form'
  ], function(Backbone, Marionette, editProfileTemplate) {
  return Marionette.ItemView.extend({
    template: editProfileTemplate,

    events: {
      'submit #editProfileForm': 'onSave'
    },

    onSave: function(event) {
      event.preventDefault();
      var name, startingWeight, startingBodyFat, startingBMI;
      name = this.$el.find('#name').val();
      startingWeight = parseFloat(this.$el.find('#startingWeight').val());
      startingBodyFat = parseFloat(this.$el.find('#startingBodyFat').val());
      startingBMI = parseFloat(this.$el.find('#startingBMI').val());
      var updates = {
        name: name,
        startingWeight: startingWeight,
        startingBodyFat: startingBodyFat,
        startingBMI: startingBMI,
        hasProfile: true
      };
      console.log('Saving profile: '+updates);
      this.model.save(updates);
    }
  });
});
define(['backbone', 'moment', 'localStorage'], function(Backbone, moment) {
  var Profile = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("Profile"),

    defaults: {
      name: null,
      startingDate: moment(),
      startingWeight: null,
      startingBodyFat: null,
      startingBMI: null
    }
  });

  return Profile;
});
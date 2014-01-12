define([
  'backbone',
  'marionette',
  'hbs!templates/logs/form',
  'hbs!templates/logs/mealRow',
  'hbs!templates/logs/exerciseRow'
  ], function(Backbone, Marionette, logFormTemplate, mealRowTemplate, exerciseRowTemplate) {
  return Marionette.ItemView.extend({
    template: logFormTemplate,

    events: {
      'submit form': 'onSave',
      'click #addMeal': 'addMealRow',
      'click #addExercise': 'addExerciseRow',
      'click button.alert': 'deleteRow'
    },

    addMealRow: function(clickEvent) {
      clickEvent.preventDefault();
      this.$el.find('#meals').append(mealRowTemplate());
    },

    addExerciseRow: function(clickEvent) {
      clickEvent.preventDefault();
      this.$el.find('#workout').append(exerciseRowTemplate());
    },

    deleteRow: function(clickEvent) {
      clickEvent.preventDefault();
      var forDeletion = $(clickEvent.currentTarget).parent().parent();
      forDeletion.remove();
    },

    onSave: function(submitEvent) {
      submitEvent.preventDefault();
      var logDate = this.$el.find('#logDate').val();
      var weight = parseFloat(this.$el.find('#weight').val());
      var bodyFat = parseFloat(this.$el.find('#bodyFat').val());
      var notes = this.$el.find('#notes').val();
      var meals = [];
      var exercises = [];
      // Get all of the meals
      _.each(this.$el.find('.meal input'), function(mealTextfield) {
        var mealInfo = $(mealTextfield).val();
        if(mealInfo) {
          meals.push(mealInfo);
        }
      });
      // Get all of the exercises
      _.each(this.$el.find('.exercise input'), function(exerciseTextfield) {
        var exerciseInfo = $(exerciseTextfield).val();
        if(exerciseInfo) {
          exercises.push(exerciseInfo);
        }
      });

      this.model.setLogDate(logDate);
      this.model.save({
        weight: weight,
        bodyFat: bodyFat,
        notes: notes,
        meals: meals,
        workout: exercises
      });
    }
  });
});
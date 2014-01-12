define([
  'backbone',
  'marionette',
  'moment',
  'hbs!templates/summaries/form'
  ], function(Backbone, Marionette, moment, formTemplate) {
  return Marionette.ItemView.extend({
    template: formTemplate,

    events: {
      'submit form': 'onSave',
      'change table input': 'onChange'
    },

    initialize: function(options) {
      this.summary = options.summary;
      this.profile = options.profile;
      this.dailyLogs = options.dailyLogs;
      this.weeklySummaries = options.weeklySummaries;
      this.inflightData = {};
    },

    render: function() {
      this.calculate();
      this.$el.html(formTemplate(this.inflightData));
    },

    calculateLeanWeight: function(weight, bodyFatWeight) {
      return (weight-bodyFatWeight).toFixed(2);
    },

    calculateFatWeight: function(weight, bodyFatPercentage) {
      return (weight*(bodyFatPercentage/100)).toFixed(2);
    },

    calculate: function() {
      // Setup starting data
      var startWeight = this.profile.get('startingWeight');
      var startBodyFat = this.profile.get('startingBodyFat');
      var startBMI = this.profile.get('startingBMI');
      var startFatWeight = this.calculateFatWeight(startWeight, startBodyFat);
      var startLeanWeight = this.calculateLeanWeight(startWeight, startFatWeight);

      // Get last week's data
      var lastWeekWeight = this.summary.get('lastWeekWeight');
      var lastWeekBodyFat = this.summary.get('lastWeekBodyFat');
      var lastWeekBMI = this.summary.get('lastWeekBMI');
      var lastWeekFatWeight = this.summary.get('lastWeekFatWeight');
      var lastWeekLeanWeight = this.summary.get('lastWeekLeanWeight');

      // Calculate this week's data
      var currentWeight = parseFloat(this.$el.find('#weight').val()) || this.summary.get('weight');
      var currentBodyFat = parseFloat(this.$el.find('#bodyFat').val()) || this.summary.get('bodyFat');
      var currentBMI = parseFloat(this.$el.find('#bmi').val()) || this.summary.get('bmi');
      var currentFatWeight = this.calculateFatWeight(currentWeight, currentBodyFat);
      var currentLeanWeight = this.calculateLeanWeight(currentWeight, currentFatWeight);

      // Calculate the weekly change
      var weeklyWeightChange = (currentWeight - lastWeekWeight).toFixed(2);
      var weeklyBodyFatChange = (currentBodyFat - lastWeekBodyFat).toFixed(2);
      var weeklyBMIChange = (currentBMI - lastWeekBMI).toFixed(2);
      var weeklyFatWeightChange = (currentFatWeight - lastWeekFatWeight).toFixed(2);
      var weeklyLeanWeightChange = (currentLeanWeight - lastWeekLeanWeight).toFixed(2);

      // Calculate the total change
      var totalWeightChange = (currentWeight - startWeight).toFixed(2);
      var totalBodyFatChange = (currentBodyFat - startBodyFat).toFixed(2);
      var totalBMIChange = (currentBMI - startBMI).toFixed(2);
      var totalFatWeightChange = (currentFatWeight - startFatWeight).toFixed(2);
      var totalLeanWeightChange = (currentLeanWeight - startLeanWeight).toFixed(2);

      // Setup the metadata
      var weekNumber = this.$el.find('#weekNumber').val() || this.summary.get('weekNumber');
      var startDate = this.$el.find('#startDate').val() || this.summary.get('startDate');
      var endDate = this.$el.find('#endDate').val() || this.summary.get('endDate');

      this.inflightData = {
        weekNumber: weekNumber,
        startDate: startDate,
        endDate: endDate,
        starting: {
          weight: startWeight,
          bodyFat: startBodyFat,
          bmi: startBMI,
          fatWeight: startFatWeight,
          leanWeight: startLeanWeight
        },
        lastWeek: {
          weight: lastWeekWeight,
          bodyFat: lastWeekBodyFat,
          bmi: lastWeekBMI,
          fatWeight: lastWeekFatWeight,
          leanWeight: lastWeekLeanWeight
        },
        thisWeek: {
          weight: currentWeight,
          bodyFat: currentBodyFat,
          bmi: currentBMI,
          fatWeight: currentFatWeight,
          leanWeight: currentLeanWeight
        },
        weeklyChange: {
          weight: weeklyWeightChange,
          bodyFat: weeklyBodyFatChange,
          bmi: weeklyBMIChange,
          fatWeight: weeklyFatWeightChange,
          leanWeight: weeklyLeanWeightChange
        },
        totalChange: {
          weight: totalWeightChange,
          bodyFat: totalBodyFatChange,
          bmi: totalBMIChange,
          fatWeight: totalFatWeightChange,
          leanWeight: totalLeanWeightChange
        }
      };
    },

    onChange: function(inputEvent) {
      this.render();
    },

    onSave: function(submitEvent) {
      submitEvent.preventDefault();

      var data = this.inflightData;

      this.summary.save({
        weekNumber: data.weekNumber,
        startDate: moment(data.startDate),
        endDate: moment(data.endDate),
        weight: data.thisWeek.weight,
        bodyFat: data.thisWeek.bodyFat,
        bmi: data.thisWeek.bmi,
        fatWeight: data.thisWeek.fatWeight,
        leanWeight: data.thisWeek.leanWeight,
        lastWeekWeight: data.lastWeek.weight,
        lastWeekBodyFat: data.lastWeek.bodyFat,
        lastWeekBMI: data.lastWeek.bmi,
        lastWeekFatWeight: data.lastWeek.fatWeight,
        lastWeekLeanWeight: data.lastWeek.leanWeight
      });
    }
  });
});
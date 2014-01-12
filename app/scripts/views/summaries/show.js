define(['backbone', 'marionette', 'hbs!templates/summaries/show'], function(Backbone, Marionette, showTemplate) {
  return Marionette.ItemView.extend({
    template: showTemplate,

    initialize: function(options) {
      this.summary = options.summary;
      this.profile = options.profile;
      this.dailyLogs = options.dailyLogs;
      this.weeklySummaries = options.weeklySummaries;
      this.inflightData = {};
    },

    render: function() {
      this.calculate();
      this.$el.html(showTemplate(this.inflightData));
    },

    calculateLeanWeight: function(weight, bodyFatWeight) {
      return (weight - bodyFatWeight).toFixed(2);
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
      var currentWeight = this.summary.get('weight');
      var currentBodyFat = this.summary.get('bodyFat');
      var currentBMI = this.summary.get('bmi');
      var currentFatWeight = this.summary.get('fatWeight');
      var currentLeanWeight = this.summary.get('leanWeight');

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

      this.inflightData = {
        weekNumber: this.summary.get('weekNumber'),
        startDate: this.summary.get('startDate'),
        endDate: this.summary.get('endDate'),
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
    }
  });
});
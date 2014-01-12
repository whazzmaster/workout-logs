define(['collections/weeklySummaries'], function(WeeklySummariesCollection) {
  module('collections:weeklySummaries');

  test('getNextWeekNumber() generates next week number in sequence', function() {
    var s = new WeeklySummariesCollection();
    s.add({weekNumber: '1'});
    s.add({weekNumber: '2'});
    equal(s.getNextWeekNumber(), 3);
  });

  test('getNextWeekNumber() returns 1 if no summaries are in the collection', function() {
    var s = new WeeklySummariesCollection();
    equal(s.getNextWeekNumber(), 1);
  });
});
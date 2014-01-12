define(['collections/dailyLogs'], function(DailyLogsCollection) {
  module('collections:dailyLogs');

  test('comparator sorts by date', function() {
    var logs = new DailyLogsCollection();
    logs.add({slug: '2014-07-05'});
    logs.add({slug: '2014-09-10'});
    equal(logs.first().get('slug'), '2014-09-10');
  });
});

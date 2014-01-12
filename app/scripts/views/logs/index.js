define(['backbone', 'marionette', 'hbs!templates/logs/listItem'], function(Backbone, Marionette, listItemTemplate) {
  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'daily-logs no-bullet',
    limit: 5,
    itemView: Marionette.ItemView.extend({template: listItemTemplate, tagName: 'li'})
  });
});
define(['backbone', 'marionette', 'hbs!templates/summaries/listItem'], function(Backbone, Marionette, listItemTemplate) {
  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'weekly-summaries no-bullet',
    limit: 5,
    itemView: Marionette.ItemView.extend({template: listItemTemplate, tagName: 'li'})
  });
});
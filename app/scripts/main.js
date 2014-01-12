requirejs.config({
    map: {
     '*':{
        'hbs/handlebars': 'Handlebars'
      }
    }
});

requirejs(['backbone', 'marionette', 'underscore', 'routers/router'], function(Backbone, Marionette, _, AppRouter) {
  Marionette.CollectionView.prototype.showCollection = function() {
    var that = this;
    var ItemView = this.getItemView();
    if(this.limit) {
      var items = this.collection.first(this.limit);
      _.each(items, function(item, index){
        that.addItemView(item, ItemView, index);
      });
    } else {
      this.collection.each(function(item, index){
        that.addItemView(item, ItemView, index);
      });
    }
  };

  var app = new Marionette.Application();

  app.addInitializer(function(options) {
    this.router = new AppRouter();
    Backbone.history.start();
  });

  app.start();
});
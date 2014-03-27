var Lorax = Backbone.Model.extend({
  idAttribute: "_id"
});

var LoraxCollection = Backbone.Collection.extend({
  model: Lorax,
  url: "/lorax" 
});

var LoraxView = Backbone.View.extend({
  tagName: "li",
  className: "lorax",
  render: function(){
    var template = $("#loraxtemplate").html();
    var compiled = Handelbars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
});

var LoraxCollectionView = Backbone.View.extend({
  intialize: function(){
    this.listenTo(this.collection, "reset", this.render);
  },
  tagName: "ul",
  className: "lorax",
  render: function(){
    this.$el.html("");
    this.collection.each(function(lorax){
      var loraxView = new LoraxView({ model: lorax });
      this.$el.append(loraxView.render().el);
    }, this);
    return this;
  }
});

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index"
  },
  index: function(){
    var collection = new LoraxCollection();
    collection.fetch({ reset: true });
    var view = new LoraxCollectionView({collection: collection});
    $(".app").html(view.render().el);
  }
});
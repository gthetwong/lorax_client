var Lorax = Backbone.Model.extend({
  idAttribute: "_id"
});

var LoraxCollection = Backbone.Colletion.extend({
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
  tagName: "ul",
  className: "loraxes",
  render: function(){
    this.collection.each(function(lorax){
      var loraxView = new LoraxView({ model:lorax });
      this.$el.append(loraxView.render().el);
    }, this);
    return this;
  }

});
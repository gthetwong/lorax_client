var Lorax = Backbone.Model.extend({
  idAttribute: "_id"
});

var LoraxCollection = Backbone.Collection.extend({
  model: Lorax
});

var NewPlantView = Backbone.View.extend({
  className: "newplant",
  events: {
    "click something" : "submit"
  },
  render: function(){
    var template = $("#newplanttemplate").html();
    var compiled = Handelbars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  },
  submit: function(){

  }

});

var LoraxView = Backbone.View.extend({
  tagName: "li",
  className: "lorax",
  render: function(){
    // var template = $("#loraxtemplate").html();
    // var compiled = Handelbars.compile(template);
    // var html = compiled(this.model.attributes);
    this.$el.html(html);
    var that = this;
    if(this.template){
  
      var html = this.template(this.model.attributes);
      this.$el.html(html);

    } else {
      $.get("/signup_template").done(function(template){
        that.template = Handlebars.compile(template);  
        var html = that.template(this.model.attributes);
        that.$el.html(html);
      });
    }


    return this;
  }
});

var LoraxCollectionView = Backbone.View.extend({
  template: 
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
    "": "index",
    "signup": "signup"
  },
  index: function(){
    console.log("LOADING INDEX???")
    // var collection = new LoraxCollection();
    // collection.fetch({ reset: true });
    // var view = new LoraxCollectionView({collection: collection});
    // $(".app").html(view.render().el);
    $(".app").html("<div>hello!</div>");
  },
  signup: function () {
    console.log("signing up!!!!")
    $.get("/signup_template").done(function(data){
      var indexTemplate = Handlebars.compile(data);
      var html = indexTemplate({name: "SAM AND GRAHAM"});
      $("body").html(html)
    })
  }
});
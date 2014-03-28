var Lorax = Backbone.Model.extend({
  idAttribute: "_id"
});

var CurrentUser = Backbone.Model.extend({
  url: "/current",
  initialize: function(){
    this.fetch();
  }
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

var SignupView = Backbone.View.extend({
  render: function(){
    var that = this;
    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/signup_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template({message: ""});
        that.$el.html(html);
      });
    }
    return this;
  }
});

var LoginView = Backbone.View.extend({
  render: function(){
    var that = this;
    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/login_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template({message: ""});
        console.log("log in with BB");
        that.$el.html(html);
      });
    }
    return this;
  }
});

var ProfileView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "change", this.render);
  },
  render: function(){
    var that = this;

    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/profile_template").done(function(template){
       
        that.template = Handlebars.compile(template);
        console.log(that.model.attributes);
        var html = that.template(that.model.attributes);
        console.log("profile with BB");
        that.$el.html(html);
        alert();

     });
    }
    
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
    "": "index",
    "signup": "signup",
    "login" : "login",
    "profile": "profile"
  },
  index: function(){
    
  },
  signup: function () {
    var view = new SignupView();
    $("body").html(view.render().el);
  },
  login: function() {
    var view = new LoginView();
    $("body").html(view.render().el);
  },
  profile: function() {
    var current_user = new CurrentUser();
    console.log("Running router")
    var view = new ProfileView({model: current_user});
    $("body").html(view.render().el);
  }

});





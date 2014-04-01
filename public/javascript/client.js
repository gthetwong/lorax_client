var Plant = Backbone.Model.extend({
  idAttribute: "_id",
  url: "/api/plant/"
});

var PlantCollection = Backbone.Collection.extend({
  model: Plant
});

var CurrentUser = Backbone.Model.extend({
  url: "/current",
  initialize: function(){
    this.fetch();
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
        that.$el.html(html);
     });
    }
    return this;
  }
});

var PlantView = Backbone.View.extend({
  render: function(){
    var that = this;
    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/api/plant_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template(this.model.attributes);
        that.$el.html(html);
      });
    }
    return this;
  }
});

var NewPlantView = Backbone.View.extend({
  events: {
    "submit ": "create"
  },

  render: function(){
    var that = this;
    if(this.template){
      var html = this.template;
      this.$el.html(html);
    } else {
      $.get("/api/new_plant_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template();
        that.$el.html(html);
      });
    }
    return this;
  },
  create: function(event){
    event.preventDefault();
    console.log(event);
    var name = event.target[0].value;
    var type = event.target[1].value;
    var serial = event.target[2].value;
    var redline = event.target[3].value;
    var owner_id = this.model.attributes._id;
    console.log(name);
    console.log(type);
    console.log(serial);
    console.log(redline);
    console.log(owner_id);
    var data = {
      pi_serial_id: serial,
      redline: redline,
      nickname: name,
      owner_id: owner_id,
      plant_type: type
    };
    var plant = new Plant(data);
    plant.save(data);
    
   
    $.post("/register/"+owner_id+"/"+serial+"/"+redline).done(function(){
      console.log("success!");
     });
    window.location.href('/profile');
   
  }
});

// var PlantCollectionView = Backbone.View.extend({

//   intialize: function(){
//     this.listenTo(this.collection, "reset", this.render);
//   },
//   tagName: "ul",
//   className: "lorax",
//   render: function(){
//     this.$el.html("");
//     this.collection.each(function(lorax){
//       var loraxView = new LoraxView({ model: lorax });
//       this.$el.append(loraxView.render().el);
//     }, this);
//     return this;
//   }
// });

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "signup": "signup",
    "login" : "login",
    "profile": "profile",
    "newplant": "newplant"

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
    var view = new ProfileView({model: current_user});
    $("body").html(view.render().el);
    console.log(current_user);
    //Check against plants with Owner Id = Current User Id
    //if 0, then empty
    if (_.isEmpty(current_user.attributes.plants)){
      var new_plant = new NewPlantView({model: current_user});
      console.log("no plants yet");
      $("body").append(new_plant.render().el);
    } else {
      var plant = new PlantView({model: current_user.attributes.plant});
      console.log("has a plant");
      $("body").append(plant.render().el);
    }
  },
  newplant: function() {
    var view = new NewPlantView();
    $("body").html(view.render().el);
  }
});





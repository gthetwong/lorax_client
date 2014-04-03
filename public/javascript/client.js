

var Plant = Backbone.Model.extend({
  idAttribute: "_id",
  //return url for when we save a model
  url:'/api/plants'
});

var PlantCollection = Backbone.Collection.extend({
  model: Plant,
  //grabs all plants for current user
  url:"api/plants"
});

var CurrentUser = Backbone.Model.extend({
  //grabs current user
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
        var html = that.template(that.model.attributes);
        that.$el.html(html);
     });
    }
    return this;
  }
});

var PlantView = Backbone.View.extend({
  className: "plant",
  events: {
    "click .plant" : "detail"
  },

  render: function(){
    var that = this;
    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/api/plant_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template(that.model.attributes);
        that.$el.html(html);
      });
    }
    return this;
  },
  detail: function(){
    var that = this;
    var detailView = new PlantDetailView({model: that.model});
    $('.plants').html(detailView.render().el);
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
    //we're getting the values of the form from the submission event
    var name = event.target[0].value;
    var type = event.target[1].value;
    var serial = event.target[2].value;
    var redline = event.target[3].value;
    var owner_id = this.model.attributes._id;
    //logging the values to check 
    console.log(name);
    console.log(type);
    console.log(serial);
    console.log(redline);
    console.log(owner_id);
    //creating an object to hold all the values so we can easily create a new plant
    var data = {
      pi_serial_id: serial,
      redline: redline,
      nickname: name,
      owner_id: owner_id,
      plant_type: type
    };
    //this is where the backbone model is created
    var plant = new Plant(data);
    plant.isNew();
    plant.save();
   //this post sends data to a local express route which then posts to the service layer
    $.post("register/"+owner_id+"/"+serial+"/"+redline).done(function(){
      console.log("success!");
     });

  }
});

var PlantCollectionView = Backbone.View.extend({

  intialize: function(){
    this.listenTo(this.collection, "reset", this.render);
  },
  className: "plants",
  render: function(){
    this.$el.html("");
    this.collection.each(function(plant){
      var plantView = new PlantView({ model: plant });
      this.$el.append(plantView.render().el);
    }, this);
    return this;
  }
});


var PlantDetailView = Backbone.View.extend({
  className:"chart",
  render: function(){
    var that = this;
    if(this.template){
      var html = this.template(this.model.attributes);
      this.$el.html(html);
    } else {
      $.get("/api/plant_detail_template").done(function(template){
        var Template = Handlebars.compile(template);
        var html = Template(that.model.attributes);
        that.$el.html(html);
      });
    }
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
    var view = new ProfileView({model: current_user});
    $("body").html(view.render().el);

    var garden = new PlantCollection();
    garden.fetch({success:function(){
      var gardenView = new PlantCollectionView({ collection: garden });
      $("body").append(gardenView.render().el);
      console.log(garden);
      if (garden.length < 8){
        var newPlantView = new NewPlantView({model: current_user});
        $(".plants").append(newPlantView.render().el);
      }
    }
  });
  }
});





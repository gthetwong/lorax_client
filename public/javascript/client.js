var Plant = Backbone.Model.extend({
  idAttribute: "_id",
  //this route links to a get request for a single plant. 
  //can we have it post to the create plant w/ data?
  url:'/api/plants'
});

var PlantCollection = Backbone.Collection.extend({
  model: Plant,
  url:"api/plants"
  // ,
  // initialize:function(){
  //  this.fetch();
  // }
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
        // console.log(that.model.attributes);
        var html = that.template(that.model.attributes);
        that.$el.html(html);
     });
    }
    return this;
  }
});

var PlantView = Backbone.View.extend({
  className: "plant",

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
    console.log(plant);
       
    //at some point here, we need to also push the data into the current user
    //maybe push the data object into current_user.attributes.plants 
   
   //this post sends data to a local express route which then posts to the service layer
    $.post("register/"+owner_id+"/"+serial+"/"+redline).done(function(){
      console.log("success!");
     });
    // window.location.href('/profile');
   
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
      //FROM EACH STATEMENT
      console.log(plant,"from each");
      var plantView = new PlantView({ model: plant });
      this.$el.append(plantView.render().el);
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
    var view = new ProfileView({model: current_user});
    $("body").html(view.render().el);

    var garden = new PlantCollection();
    garden.fetch({success:function(){
      console.log(garden.models, "callback");
      //seems like we're at least able to get into the collection with this
      //but it doesn't seem like we're getting the models out quite yet
      var gardenview = new PlantCollectionView({ collection: garden });
      console.log("heya");
      $("body").append(gardenview.render().el);
    }
  });
    
    // var gardenview = new PlantCollectionView({ collection: garden});
    // console.log(garden, "garden");
    // $("body").append(gardenview.render().el);




            //          //if current user has no plants
            //   if (_.isEmpty(current_user.attributes.plants)){
            //     //model being passed in is current user so we can associate the plant we create with them
            //     var new_plant = new NewPlantView({model: current_user});
            //     console.log("no plants yet");
            //     //replace plant box with form to create a plant
            //     $("body").append(new_plant.render().el);
            //     //we need to figure out how to associate the post method in NewPlantView with the user, or push it into their model when it gets created

            // } else { //if current user has plants
            //     //"plant" is the current user's plant object

            //     var plant = new PlantView({model: current_user.attributes.plant});
            //     console.log("has a plant");
            //     //"plant" gets rendered into the view
            //     $("body").append(plant.render().el);
            //     }
  }
});





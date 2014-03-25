window.ClientApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(){
    this.router = new this.Routers.Main();
    Backbone.history.start({pushstate:true});
    this.makeNav();
  },

  makeNav: function(){
    var view = new this.Views.Nav();
    $('#header').html(view.render().$el);
  }
};

$(document).ready(function(){
  ClientApp.start();

});

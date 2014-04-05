window.loraxApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  start: function(){
    this.router = new this.Routers.Main();
    Backbone.history.start({ pushState: true });
  }
};


$(function(){
  loraxApp.start();
});
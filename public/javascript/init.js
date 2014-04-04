window.loraxApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  start: function(){
    // var loraxRouter = new loraxApp.Routers.Main();
    // this.router = new this.Routers.Main();
    this.router = new this.Routers.Main();
    Backbone.history.start({ pushState: true });
  }
};


$(function(){
  loraxApp.start();
});
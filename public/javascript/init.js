window.loraxApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  start: function(){
    var loraxRouter = new AppRouter();
    Backbone.history.start({ pushState: true });
  }
};


$(function(){
  loraxApp.start();
});
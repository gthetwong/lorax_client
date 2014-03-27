$(function(){
  var collection = new LoraxCollection();
  collection.fetch({
    success: function(data){
      var view = new LoraxCollectionView({ collection: data });
      $("body").append(view.render().el);
    }
  });
});
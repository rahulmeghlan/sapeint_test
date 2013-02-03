window.sapient = window.sapient || {};

window.sapient.views = Backbone.Marionette.ItemView.extend({
  template : '#user_list',
  initialize : function(){
  },
  ready : function(){
    alert("Inside the ready of page_controller");
//    this.user_list_region = new Backbone.Marionette.Region({
//      el : this.$el.find('div.left_container')
//    });
  }
})
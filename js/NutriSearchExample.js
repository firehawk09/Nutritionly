;
(function(exports) {

    "use strict";

    // Router

    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {

            Backbone.history.start();

        },

        routes: {
            "*default": "home"
        },

        home: function() {
            var self = this;
            this.model.fetch().then(function(d) {
                console.log(d);
            })
            $(document.body).append(d);
        }

    });

    // Models

    Backbone.Nutrimodel = Backbone.Model.extend({
        defaults: {
            url: "https://nutritions.herokuapp.com/api/v1/venues?near=77365"
        }
    });

    // Collections
    Backbone.NutriScience = Backbone.Collection.extend({
        model: Backbone.Nutrimodel
    });

    // Views


    Backbone.HealthyView = Backbone.View.extend({  //Backbone.TemplateView.extend({
        el: ".container"
    });



})(typeof module === 'object' ? module.exports : window);

;
(function(exports) {

    "use strict";

    // Router

    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {
            console.log("initialized");
            this.collection = new Backbone.NutriScience();
            this.collection.zip = 77365
            this.view = new Backbone.HealthyView({
                collection: this.collection
            });

            this.container = document.querySelector('.leftContainer');

            Backbone.history.start();
        },

        routes: {
            '': 'home',
            'details/*': 'details'
        },

        home: function(){
            this.collection.fetch()
        },

        details: function(){
            $(document.body).append("Details has been called..");
        }
    });

    // Views

    Backbone.HealthyView = Backbone.TemplateView.extend({
        el: ".leftContainer",
        view: "listTemp"
    });

    // Models

    Backbone.NutriModel = Backbone.Model.extend({
        defaults: {
            zip: 77365
        },
        url: function(){
            return [
                "https://nutritions.herokuapp.com/api/v1/venues",
                this.get('zip') ? '?near='+this.get('zip') : ''
            ].join('')
        }
    });

    // Collections

    Backbone.NutriScience = Backbone.Collection.extend({
        model: Backbone.NutriModel,
        url: function(){
            return [
                "https://nutritions.herokuapp.com/api/v1/venues",
                this.zip ? '?near='+this.zip : ''
            ].join('')
        },
        parse: function(data){
            return data.venues
        }
    });


})(typeof module === 'object' ? module.exports : window);

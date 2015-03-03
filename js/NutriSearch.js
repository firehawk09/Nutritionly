;
(function(exports) {

    "use strict";



    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {
            this.container = document.querySelector('.container');

            Backbone.history.start();
        },

        routes: {
            '*default': 'home'
        },

        home: function() {
            this.model = new Backbone.NutriModel
            this.homeView = z(Backbone.SongView, {
                model: this.model
            });
            var nutritionix = require('nutritionix')({
                appId: '944703ea',
                appKey: '41f92b5b38c4d23259b61a97139c1c35'
            }, false);
            var self = this;
            this.model.fetch().then(function(d) {})

        }
    });

    Backbone.NutriScience = Backbone.Collection.extend({
        model: Backbone.NutriModel
    });

    Backbone.NutriModel = Backbone.Model.extend({

        defaults: {
            // url: 'https://api.nutritionix.com/v1_1',
            urlExample: "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=944703ea&appKey=41f92b5b38c4d23259b61a97139c1c35"
        },
        initialize: function() {
        }
    });

})(typeof module === 'object' ? module.exports : window);

;
(function(exports) {

    "use strict";



    Backbone.NutriRouter = Backbone.Router.extend({
        routes: {
            '*default': 'home'
        },
        YOUR_APP_ID: function() {
            return "944703ea"
        },

        YOUR_APP_KEY: function() {
            return "41f92b5b38c4d23259b61a97139c1c35"
        },

        var nutritionix = require('nutritionix')({
            appId: 'YOUR_APP_ID',
            appKey: 'YOUR_APP_KEY'
        }, false);

        home: function() {
            this.model = new Backbone.Song
            this.homeView = z(Backbone.SongView, {
                model: this.model
            });
            var self = this;
            this.model.fetch().then(function(d) {
            })

        },
        initialize: function() {
            console.log(yey);
            this.el = document.querySelector('.container');
            Backbone.history.start();
        }
    });

    Backbone.NutriScience = Backbone.Collection.extend({
        model: Backbone.NutriModel
    });

    Backbone.NutriModel = Backbone.Model.extend({

        defaults: {
            url: 'https://api.nutritionix.com/v1_1'
        },
        initialize: function() {
            console.log(yey);
        }
    });

})(typeof module === 'object' ? module.exports : window);

;
(function(exports) {

    "use strict";



    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {
            this.el = document.querySelector('.container');
            Backbone.history.start();
        },
        routes: {
            '*default': 'home'
        },
        var YOUR_APP_ID = "944703ea",
        var YOUR_APP_KEY = "41f92b5b38c4d23259b61a97139c1c35",

        var nutritionix = require('nutritionix')({
                appId: 'YOUR_APP_ID',
                appKey: 'YOUR_APP_KEY'
            }, false);

        home: function() {
        }
    });

    Backbone.NutriModel = Backbone.Model.extend({

        defaults: {
            url: 'https://api.nutritionix.com/v1_1'
        },
        initialize: function() {
        }
    });

})(typeof module === 'object' ? module.exports : window);

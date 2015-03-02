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
        home: function() {

        }
    });

    Backbone.NutriModel = Backbone.Model.extend({

        defaults: {
            url: ' '
        },
        initialize: function() {
        }
    });

})(typeof module === 'object' ? module.exports : window);
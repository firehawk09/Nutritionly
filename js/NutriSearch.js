;
(function(exports) {

    "use strict";

    // Router

    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {
            this.venues_collection = new Backbone.NutriScience();
            this.venues_collection.zip = 77365

            this.user = new Backbone.UserModelForSignup()

            // this.reviews_collection = new Backbone.ReviewsCollection();
            // this.reviews_collection.user = this.user

            // testing new Review model
            // this.reviews_collection.create({})

            this.view = new Backbone.HealthyView({
                collection: this.venues_collection,
                user: this.user
            });

            Backbone.history.start();
        },

        routes: {
            '/:id/': 'details',
            "search/:query": "search",
            "*default": "home"
        },

        home: function() {
            this.venues_collection.fetch()
        }
    });

    // Views

    Backbone.HealthyView = Backbone.TemplateView.extend({
        el: ".container",
        view: "home",
        events: {
            "submit #submitForm": "submit"
        },
        hideForm: function(){
            this.el.querySelector("#submitForm").style.display = 'none'
        }


Backbone.logInView = Backbone.TemplateView.extend({

});

    // Models

    Backbone.UserModelForSignup = Backbone.Model.extend({
        validate: function(attrs, options) {
            if (attrs.password1 !== attrs.password2)
                return "Passwords must match"
        },
        signUp: function() {
            var self = this;
            var url = [
                    "https://nutritions.herokuapp.com/api/v1/registrations?email=",
                    this.get('email'),
                    "&password=",
                    this.get('password1'),
                    "&password_confirmation=",
                    this.get('password2')
                ].join('')

            return $.post(url).then(function(data){
                self.set(data)
                return data;
            })
        },
        signIn: function() {
            var url = [
                    "https://nutritions.herokuapp.com/api/v1/signin?email=",
                    this.get('email'),
                    "&password=",
                    this.get('password1')
                ].join('')

            var self = this

            return $.post(url).then(function(data){
                self.set(data)
                return data;
            })
        }
    })

    Backbone.NutriModel = Backbone.Model.extend({
        defaults: {
            zip: 77365
        },
        url: function() {
            return [
                "https://nutritions.herokuapp.com/api/v1/venues",
                this.get('zip') ? '?near=' + this.get('zip') : ''
            ].join('')
        }
    });

    Backbone.Review = Backbone.Model.extend({
        url: function(){
            return [
                "https://nutritions.herokuapp.com/api/v1/reviews?",
                "venue_id=",
                this.get("venue_id"),
                "&body=",
                this.get('body'),
                "&rating=",
                this.get('rating'),
                "&auth_token=",
                this.collection.user.get("auth_token")
            ].join('')
        }
    })

    // Collections

    Backbone.NutriScience = Backbone.Collection.extend({
        model: Backbone.NutriModel,
        url: function() {
            return [
                "https://nutritions.herokuapp.com/api/v1/venues",
                this.zip ? '?near=' + this.zip : ''
            ].join('')
        },
        parse: function(data) {
            return data.venues
        }
    });

    Backbone.ReviewsCollection = Backbone.Collection.extend({
        model: Backbone.Review,
        url: function(){
            return [
                "https://nutritions.herokuapp.com/api/v1/reviews/1"
            ].join('')
        }
    })


})(typeof module === 'object' ? module.exports : window);

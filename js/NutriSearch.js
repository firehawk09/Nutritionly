;
(function(exports) {

    "use strict";

    // Router

    Backbone.NutriRouter = Backbone.Router.extend({
        initialize: function() {
            this.venues_collection = new Backbone.List_Collection();
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
            '*default': 'home',
            '/logIn': 'signIn',
            '/:id/': 'details',
            'search/:query': 'search',
        },

        home: function() {
            this.venues_collection.fetch()
        },
        signIn: function() {
        },
        details: function() {
            this.venues_collection.fetch()
        },
        search: function() {
            this.reviews_collection.fetch()
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
        },
        submit: function(e) {
            e.preventDefault()
            this.options.user.set({
                email: this.el.querySelector('input[name="email"]').value,
                password1: this.el.querySelector('input[name="password"]').value,
                password2: this.el.querySelector('input[name="password"]').value
            })

            var signedIn = null;
            var signedUp = this.options.user.signUp()
            var self = this
            signedUp.then(function(data){
                // remove login form?
                self.hideForm()
                // model should have auth token
            })
            signedUp.fail(function(){
                signedIn = self.options.user.signIn()

                signedIn.then(function(data){
                    // remove login form?
                    self.hideForm()
                    // model should have auth token
                })

                signedIn.fail(function(){
                    // shrug?
                    alert("this is just going down hill fast.")
                })
            })
        }
    });
    Backbone.DetailsView = Backbone.TemplateView.extend({
        el: ".container",
        view: "details",
        events: {
            "submit #submitForm": "submit"
        },
        hideForm: function(){
            this.el.querySelector("#submitForm").style.display = 'none'
        },
        submit: function(e) {
            e.preventDefault()
            this.options.user.set({
                email: this.el.querySelector('input[name="email"]').value,
                password1: this.el.querySelector('input[name="password"]').value,
                password2: this.el.querySelector('input[name="password"]').value
            })

            var signedIn = null;
            var signedUp = this.options.user.signUp()
            var self = this
            signedUp.then(function(data){
                // remove login form?
                self.hideForm()
                // model should have auth token
            })
            signedUp.fail(function(){
                signedIn = self.options.user.signIn()

                signedIn.then(function(data){
                    // remove login form?
                    self.hideForm()
                    // model should have auth token
                })

                signedIn.fail(function(){
                    // shrug?
                    alert("this is just going down hill fast.")
                })
            })
        }
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

    Backbone.Venue_List = Backbone.Model.extend({
        defaults: {
            zip: 77365
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

    Backbone.List_Collection = Backbone.Collection.extend({
        model: Backbone.Venue_List,
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

// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
Campground = require('./models/campground');
Comment = require('./models/comment');
User = require('./models/user');
seedDB = require('./seeds');

// Config
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// === PASSPORT CONFIG ===
app.use(require('express-session')({
    secret: 'Once again Rusty wins cutest dog',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// === ROUTES ===

app.get('/', function(req, res){
    res.render('landing');
});

// INDEX - shows all campgrounds
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, AllCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: AllCampgrounds});
        }
    });
});

// CREATE - adds campgrounds to DB
app.post('/campgrounds', function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log();
        } else {
            // redirex back to campgrounds page
            res.redirect('/campgrounds');
        }
    })    
});

// NEW - shows form to create new campground
app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//==============================
// COMMENTS ROUTES  
//==============================

app.get('/campgrounds/:id/comments/new', function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', function(req, res){
    // Look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    // Create new comment
    // Connet new comment to campground
    // Redirect to campground show page

});

// === AUTH ROUTES ===

// show register form
app.get('/register', function(req, res){
    res.render('register');
});

// handle sign up logic
app.post('/register', function(req, res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render('/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});


app.listen(3000, function(){
    console.log('YelpCamp Server has started!.');
});
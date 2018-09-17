// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Campground = require('./models/campground');
// Comment = require('./models/comment');
seedDB = require('./seeds');

// Config
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();

// ===== ROUTES =====

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
            res.render('index', {campgrounds: AllCampgrounds});
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
    res.render('new.ejs');
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
            res.render('show', {campground: foundCampground});
        }
    });
});



app.listen(3000, function(){
    console.log('YelpCamp Server has started!.');
});
// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// TEMPORAL
// Campground.create({
//     name: 'Granite Hill',
//     image: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebb0b2d80f4b2d82f3587492b80e2321&auto=format&fit=crop&w=750&q=80'
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log('Newly Created Campground');
//         console.log(campground);
//     }
// });

// ===== ROUTES =====

// Index
app.get('/', function(req, res){
    res.render('landing');
});

// Campgrounds
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, AllCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: AllCampgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});





app.listen(3000, function(){
    console.log('YelpCamp Server has started!.');
});
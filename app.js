// Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
Campground = require('./models/campground');
Comment = require('./models/comment');
User = require('./models/user');
// seedDB = require('./seeds'); // seed the database

// Requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

// Config
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // seed the database

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function(){
    console.log('YelpCamp Server has started!.');
});
// Setup
var express = require('express');
var app = express();

// Config
app.set('view engine', 'ejs');

// ===== ROUTES =====

// Index
app.get('/', function(req, res){
    res.render('landing');
});

// Campgrounds
app.get('/campgrounds', function(req, res){
    var campgrounds = [
        { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebb0b2d80f4b2d82f3587492b80e2321&auto=format&fit=crop&w=750&q=80'},
        { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=750&q=80' },
        { name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=750&q=80' }
    ];
    
    res.render('campgrounds', {campgrounds: campgrounds});
});






app.listen(3000, function(){
    console.log('YelpCamp Server has started!.');
});
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Cloud\'s Rest',
        image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=750&q=80',
        description: 'Bla blah bla blah'
    },
    {
        name: 'Desert Mesa',
        image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=750&q=80',
        description: 'Bla blah bla blah'
    },
    {
        name: 'Canyon Floor',
        image: 'https://images.unsplash.com/photo-1503789597747-41de608aca69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e39a51d6a2893ca49d551ad22e86ccc&auto=format&fit=crop&w=750&q=80',
        description: 'Bla blah bla blah'
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Removed campgrounds!.');
        // Add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Added a campground.');
                    // Create a comment
                    Comment.create({
                        text: 'This place is great, but I wish there was internet.',
                        author: 'Homer'
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comment.push(comment);
                            campground.save();
                            console.log('Created new comment.');
                        }
                    });
                }
            })
        });
    }); 
    
    
    // Add a few comments
    
}

module.exports = seedDB;
/**
 * Created with JetBrains WebStorm.
 * User: Alan
 * Date: 03/05/13
 * Time: 14:48
 * To change this template use File | Settings | File Templates.
 */


Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");
Hexagons = new Meteor.Collection("hexagons");
Alphabet = new Meteor.Collection("alphabet");
Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");
//
//Meteor.methods({
//    'addUserToNewGame': function(user, color){
//        Games.insert({game: {playerOne: {user: user.username, color: color}, playerTwo: {user: "", color: 'blue'}}});
//        console.log(Games.find().fetch())
//    },
//    'addSecondUserToGame': function(userId, game){
//
//    }
//});

// get a shuffled alphabet befor creating the broad
getShuffledAlphabet = function () {
    return shuffle(alphabet);
};

// function to shuffle an array
// source http://jsfromhell.com/array/shuffle
shuffle = function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


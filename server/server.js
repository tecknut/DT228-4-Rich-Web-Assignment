/**
 * Created with JetBrains WebStorm.
 * User: Alan
 * Date: 01/05/13
 * Time: 15:32
 * To change this template use File | Settings | File Templates.
 */

Meteor.startup(function () {
    // alphabet to be used in creating the game board\
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y"];

    Meteor.publish('alphabet', function() {
        return Alphabet.find();
    });

    Alphabet.insert({letters: alphabet});

    Meteor.publish('players', function() {
        return Meteor.users.find();
    });

    Meteor.publish('games', function() {
        return Games.find();
    });

    Meteor.publish('questions', function() {
        return Questions.find();
    });

    Meteor.publish('hexagons', function() {
        return Hexagons.find();
    });

    Questions.insert({questions: {
        'A': "What A allows dynamic content on web pages?",
        'B': "What B is a linux distribution aimed at hackers?",
        'C': "What C is a language that compiles to JavaScript?",
        'D': "What D is a web development framework?",
        'E': "What E is is the committee responsible for the javascript standard?",
        'F': "What F is a protocol for file transferring?",
        'G': "What G is a web development framework?",
        'H': "What H is the protocol for the web?",
        'I': "What I is a html tag that allows a web view to be embed within a page?",
        'J': "What J is the programming language of the web?",
        'K': "What K is an IDE for common web development languages?",
        'L': "What L is a language that compiles to JavaScript?",
        'M': "What M is a file used to build software?",
        'N': "What N is a html tag for placing navigation links?",
        'O': "What O is a web browser with over 300 million users worldwide?",
        'P': "What P was a common language for implementing CGI?",
        'Q': "What Q is an interrogative sentence?",
        'R': "What R is a web development framework?",
        'S': "What S is an XML based data exchange protocol?",
        'T': "What T is web server for java servlets?",
        'U': "What U is used as an address for web sites?",
        'V': "What V is a Microsoft scripting language?",
        'W': "What W is the best operating system ever?",
        'Y': "What Y is a human readable data serialisation format?" }});

    Meteor.publish('answers', function() {
        return Answers.find();
    });

    Answers.insert({answers: {
        'A': "ajax",
        'B': "backtrack",
        'C': "coffeescript",
        'D': "django",
        'E': "ecma",
        'F': "ftp",
        'G': "grails",
        'H': "http",
        'I': "iframe",
        'J': "javascript",
        'K': "komodo",
        'L': "livescript",
        'M': "make",
        'N': "nav",
        'O': "opera",
        'P': "perl",
        'Q': "question",
        'R': "rails",
        'S': "soap",
        'T': "tomcat",
        'U': "url",
        'V': "vbscript",
        'W': "windows",
        'Y': "ymal"}});
});


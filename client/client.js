Meteor.subscribe("alphabet");
Meteor.subscribe("questions");
Meteor.subscribe("answers");
Meteor.subscribe("players");
Meteor.subscribe("games");
Meteor.subscribe("hexagons");

Accounts.ui.config({
    requestPermissions: {
        facebook: ['user_likes'],
        github: ['user', 'repo']
    },
    requestOfflineToken: {
        google: true
    },
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Meteor.startup(function () {
    Deps.autorun(function () {
        if (!Session.get("user")) {
            var user = Meteor.user();
            if (user) {
                Session.set("user", user.username);
            }
        }
    });
});


Template.answer.events({
    'submit form': function (event) {
        event.preventDefault();

        var $answer = $('#answer');
        var text = inPlay.text.getText();
        var answer = Answers.find().fetch()[0].answers[text];
        if (answer == $.trim($answer.val().toLowerCase())) {
            selected = false;
            inPlay.text.setFill(playerColor);
            inPlay.hexagon.setFill(playerColor);
            inPlay.hexagon.setStroke('black');
            inPlay.shapeLayer.draw();
            inPlay.textLayer.draw();
        } else {
            $answer.attr("disabled", "disabled");
        }
        $answer.val("");
    }
});

Template.list.helpers({
    listUsers: function () {
        var users = Meteor.users.find().fetch();
        if (users) {
            return users;
        }
    },
    listGames: function () {
        var games = Games.find().fetch();
        if (games) {
            return games
        }
    }
});

Template.list.events({
    'submit form': function (event) {
        event.preventDefault();
        var $game = $('#game');

        console.log(game.value)
        var gameStuff = Games.findOne({name: game.value});
        var letters = gameStuff.letters;

        startLetter = gameStuff.startLetter;
        console.log(startLetter)
        playerColor = 'blue';

        createGame(letters, startLetter);

//        var rad = 55;
//        var side = Math.floor(rad * 3 / 2);
//        var height = Math.floor(rad * Math.sqrt(3));
//        var heightOffset = height / 2;
//        var width = (rad * 2);
//        var widthOffset = width / 2;
//
//        var alphabetOffsets = { "A": {"x": 28, "y": 48}, "B": {"x": 25, "y": 48}, "C": {"x": 25, "y": 48}, "D": {"x": 25, "y": 48}, "E": {"x": 23, "y": 48}, "F": {"x": 23, "y": 48}, "G": {"x": 30, "y": 48}, "H": {"x": 29, "y": 48}, "I": {"x": 12, "y": 48}, "J": {"x": 16, "y": 48}, "K": {"x": 25, "y": 48}, "L": {"x": 19, "y": 48}, "M": {"x": 40, "y": 48}, "N": {"x": 30, "y": 48}, "O": {"x": 30, "y": 48}, "P": {"x": 23, "y": 48}, "Q": {"x": 33, "y": 50}, "R": {"x": 25, "y": 49}, "S": {"x": 20, "y": 49}, "T": {"x": 23, "y": 48}, "U": {"x": 30, "y": 48}, "V": {"x": 26, "y": 48}, "Y": {"x": 24, "y": 48}, "W": {"x": 41, "y": 42}};
//        var letterGrid = ["11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35", "41", "42", "43", "44", "45"];
//
//        var shapeLayer = new Kinetic.Layer();
//        var textLayer = new Kinetic.Layer();
//
//        var stage = new Kinetic.Stage({
//            container: 'board',
//            width: (width * 5 ) - widthOffset,
//            height: (height * 6) - heightOffset
//
//        });
//        for (var rowIndex = 0; rowIndex < 6; ++rowIndex) {
//            for (var colIndex = 0; colIndex < 7; ++colIndex) {
//
//                var i = rowIndex.toString().concat(colIndex.toString());
//
//                console.log(letters[i])
//            }
//        }
//        stage.add(shapeLayer);
//
////        console.log(hexagons)
    }
});

Template.game.events({
    'click #new': function (event) {
        var $answer = $('#answer');
        $answer.removeAttr("disabled");
        var $new = $('#new');
        $new.attr("disabled", "disabled");
        var letters = createGame();
        var game = Games.find({name: Meteor.user().username}).fetch()[0];
        if (game) {
            console.log('here')
            console.log(game._id)
            Games.remove({_id: game._id})
        }
        Games.insert({
            name: Meteor.user().username,
            playerOne: {user: Meteor.user().username,
                color: playerColor},
            playerTwo: {user: "",
                color: 'blue'},
            letters: letters,
            startLetter: inPlay.text.getId()});
    },
    'click #clear': function (event) {
        var $new = $('#new');
        $new.removeAttr("disabled");
        Meteor.call('clearBoard');
    }
});

var selected = true;
var inPlay;
var playerColor;

var joinGame = function (game) {
    if (Meteor.user()) {

    }
};

var createGame = function (joined, startLetter) {
    if (Meteor.user()) {

        playerColor = 'white';

        // remove any Kinetic js content from the game board div
        $gameBoard = $('#gameBoard');
        $gameBoard.empty();
        $gameBoard.append('<div class="game-board" id="board"></div>');
        // hexaon variables
        var rad = 55;
        var side = Math.floor(rad * 3 / 2);
        var height = Math.floor(rad * Math.sqrt(3));
        var heightOffset = height / 2;
        var width = (rad * 2);
        var widthOffset = width / 2;


        // x and y offsets to center the letters in a hexagon
        var alphabetOffsets = { "A": {"x": 28, "y": 48}, "B": {"x": 25, "y": 48}, "C": {"x": 25, "y": 48}, "D": {"x": 25, "y": 48}, "E": {"x": 23, "y": 48}, "F": {"x": 23, "y": 48}, "G": {"x": 30, "y": 48}, "H": {"x": 29, "y": 48}, "I": {"x": 12, "y": 48}, "J": {"x": 16, "y": 48}, "K": {"x": 25, "y": 48}, "L": {"x": 19, "y": 48}, "M": {"x": 40, "y": 48}, "N": {"x": 30, "y": 48}, "O": {"x": 30, "y": 48}, "P": {"x": 23, "y": 48}, "Q": {"x": 33, "y": 50}, "R": {"x": 25, "y": 49}, "S": {"x": 20, "y": 49}, "T": {"x": 23, "y": 48}, "U": {"x": 30, "y": 48}, "V": {"x": 26, "y": 48}, "Y": {"x": 24, "y": 48}, "W": {"x": 41, "y": 42}};

        // array of coordinates for the perimeter of the game board
        // used to descriminate between hexagons that should have
        // event listeners
        var letterGrid = ["11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35", "41", "42", "43", "44", "45"];
        // layers for the hexagons and text
        var shapeLayer = new Kinetic.Layer();
        var textLayer = new Kinetic.Layer();

        // arrays to get a handel on hexagon and letter objects
        var hexagons = {};
        var letters = {};


        var userLetters = {};


        // Kinetic js stage
        var stage = new Kinetic.Stage({
            container: 'board',
            width: (width * 5 ) - widthOffset,
            height: (height * 6) - heightOffset

        });

        var shuffledAlphabet = shuffle(Alphabet.find().fetch()[0].letters);

        // create the board
        for (var rowIndex = 0; rowIndex < 6; ++rowIndex) {
            for (var colIndex = 0; colIndex < 7; ++colIndex) {

                // set up the x and y for the hexagon
                var xoff = colIndex * side;
                var yoff;

                // vary the y axis to create the tessellation
                if (colIndex % 2 == 0) {
                    yoff = height + (height * rowIndex) - heightOffset;
                } else {
                    yoff = (height / 2) + (height * rowIndex) - heightOffset;
                }

                // set color for the hexagon
                if (rowIndex == 5 && colIndex > 0 && colIndex < 6 || rowIndex == 0 && colIndex > 0 && colIndex < 6) {
                    var color = 'white';
                } else if (colIndex == 0 || colIndex == 6) {
                    var color = 'blue';
                } else {
                    var color = 'yellow';
                }

                // create hexagon
                var hexagon = new Kinetic.RegularPolygon({
                    id: rowIndex.toString().concat(colIndex.toString()),
                    x: xoff,
                    y: yoff,
                    sides: 6,
                    radius: rad,
                    rotationDeg: 90,
                    stroke: 'black',
                    strokeWidth: 4,
                    fill: color
                });

                // only give the hexagon a letter and even listeners
                // if the hexagon is in the playing area
                if ($.inArray(rowIndex.toString().concat(colIndex.toString()), letterGrid) > -1) {
                    // get a letter for the hexagon
                    var letter
                    if (joined) {
                        letter = joined[rowIndex.toString().concat(colIndex.toString())];
                    } else {
                        letter = shuffledAlphabet.pop();
                    }

                    userLetters[rowIndex.toString().concat(colIndex.toString())] = letter;

                    // add the hexagon to an array
                    hexagons[rowIndex.toString().concat(colIndex.toString())] = hexagon;

                    // get the x and y offset for the letter
                    var offsets = alphabetOffsets[letter];

                    // create the text object
                    var simpleText = new Kinetic.Text({
                        id: rowIndex.toString().concat(colIndex.toString()),
                        x: xoff - offsets.x,
                        y: yoff - offsets.y,
                        text: letter,
                        fontStyle: "bold",
                        fontSize: 90,
                        fontFamily: 'Calibri',
                        fill: 'black'
                    });

                    // add the text object to an array
                    letters[rowIndex.toString().concat(colIndex.toString())] = simpleText;

                    // event for a mouse click or screen touch on the hexagon
                    hexagon.on('mouseup touchend', function () {
                        if (!selected && $.inArray(this, hexagons)) {
                            selected = true;
                            $('#answer').focus();
                            $question = $('#question');
                            $question.empty();
                            $question.append('<h1>' + Questions.find().fetch()[0].questions[letters[this.getId()]] + '</h1>');
                            this.setFill('#CCCC00');
                            this.moveToTop();
                            this.setStroke('FF8300');
                            inPlay = {text: letters[this.getId()], hexagon: this, shapeLayer: shapeLayer, textLayer: textLayer};
                            delete letters[this.getId()];
                            delete hexagons[this.getId()];
                            shapeLayer.draw();
                            textLayer.draw();
                        }
                    });


                    // event for a mouse click or screen touch on the text
                    simpleText.on('mouseup touchend', function () {
                        if (!selected && $.inArray(this, letters)) {
                            selected = true;
                            $('#answer').focus();
                            $question = $('#question');
                            $question.empty();
                            $question.append('<h1>' + Questions.find().fetch()[0].questions[this.getText()] + '</h1>');
                            var hex = hexagons[this.getId()];
                            hex.moveToTop();
                            hex.setStroke('FF8300');
                            hex.setFill('#CCCC00');
                            inPlay = {text: this, hexagon: hexagons[this.getId()], shapeLayer: shapeLayer, textLayer: textLayer};
                            delete letters[this.getId()];
                            delete hexagons[this.getId()];
                            shapeLayer.draw();
                            textLayer.draw();
                        }
                    });

                    // add the text to the text layer
                    textLayer.add(simpleText);
                }

                // add the hexagon to the shape layer
                shapeLayer.add(hexagon);

                // add each layer to the stage
                stage.add(shapeLayer);
                stage.add(textLayer);
            }
        }

        var key = Math.floor(Math.random() * letterGrid.length);
        var start;
        $question = $('#question');
        $question.empty();
        if (startLetter){
            start = hexagons[letterGrid[startLetter]];
            $question.append('<h1>' + Questions.find().fetch()[0].questions[letters[letterGrid[startLetter]].getText()] + '</h1>');
        } else {
            start = hexagons[letterGrid[key]];
            $question.append('<h1>' + Questions.find().fetch()[0].questions[letters[letterGrid[key]].getText()] + '</h1>');
        }
        start.moveToTop();
        start.setStroke('FF8300');
        start.setFill('#CCCC00');
        inPlay = {startLetter: userLetters[letterGrid[key]], text: letters[letterGrid[key]], hexagon: hexagons[letterGrid[key]], shapeLayer: shapeLayer, textLayer: textLayer};
        delete letters[key];
        delete hexagons[key];
        shapeLayer.draw();
    }
    console.log(userLetters)
    return userLetters;
};

Meteor.methods({
//    createGame: ,
    shuffleArray: function (array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    },
    listPlayers: function () {
        return Meteor.users.find();
    },
    clearBoard: function () {
        $('#gameBoard').empty();
    }
});
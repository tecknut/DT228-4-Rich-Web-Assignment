DT228-4-Rich-Web-Assignment
===========================

This is supposed to be a blockbuster style game. 
Players log in and create a game. Other players can see games and join to play.

The hexaons are drawn with Kinetic js, a html5 graphics library. The tessellated grid was put together by caluclating the points 
for each hexagon and offseting them.

The idea was to have each player try type the answer and the quickest correct answer wins.

Each player has a color and claims the board as they answer correctly.

Issues arrose once I started to try and get synchronous gameplay. The Kinetic objects didn't serialise well and I couldn't get the game board to update.

I tried a few different things but nothing worked right.

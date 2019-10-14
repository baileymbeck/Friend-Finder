// referencing friend.js

var friends = require("../data/friend");


module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

 app.post("/api/friends", function(req, res) {
//     6. Determine the user's most compatible friend using the following as a guide:

//   * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//   * With that done, compare the difference between current user's scores against those from other users,
//     question by question. Add up the differences to calculate the `totalDifference`.
//       * Example:
//         * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//         * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//         * Total Difference: **2 + 1 + 2 =** **_5_**
//     * Remember to use the absolute value of the differences. Put another way: no negative solutions! 
//       Your app should calculate both `5-3` and `3-5` as `2`, and so on.
//     * The closest match will be the user with the least amount of difference.
 var totalDifference;
 var bestMatch = {name:"", photo:"", friendDifference: Infinity};
 var userData = req.body;
 var userScores = userData.scores;

 for(var i = 0; i < friends.length; i++){
     var currentFriend = friends[i];
     totalDifference = 0;
     for(var k = 0; k < currentFriend.scores.length; k++){
         var currentFriendScore = currentFriend.scores[k];
         var currentUserScore = userScores[k];
         totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
     }
     if(totalDifference <= bestMatch.friendDifference){
         bestMatch.name = currentFriend.name;
         bestMatch.photo = currentFriend.photo;
         bestMatch.friendDifference = totalDifference;
     }
 }
      friends.push(userData);
      res.json(bestMatch);
    
  });
}
var friendsData = require("../data/friends");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var newFriend = req.body;
        var diffArray = [];
        for (var i = 0; i < friendsData.length; i++) {
            var sum = 0;
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                sum += Math.abs(parseInt(newFriend.scores[j]) - parseInt(friendsData[i].scores[j]));
            }
            diffArray.push(sum);
        }

        var friendSelected = 0;
        var friendValue= parseInt(diffArray[0]);
        for (var k = 1; k < diffArray.length; k++) {
            if (parseInt(diffArray[k]) < friendValue) {
                friendSelected = k;
                friendValue=parseInt(diffArray[k]);
            }
        }

        friendsData.push(newFriend);
        res.send(friendsData[friendSelected]);
    });

};

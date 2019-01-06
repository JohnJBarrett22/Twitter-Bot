console.log("~Twitter bot initiating!~")

var Twit = require('twit');
var config = require('./config')

var T = new Twit(config)


// Get
var params = {
    q: 'warren',
    count: 5 
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response){
    var tweets = data.statuses;
    for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);        
    }
}

//Post
function tweetPost(txt){
    var tweet = {
        status: 'Testing a 3rd tweet!'
    };

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log('~Error!~', err)
        } else {
            console.log('~Tweet successful!~', data)
        }  
    };
}

//Stream Follow
var stream = T.stream('user');
stream.on('follow', followed);
    
function followed(eventMsg) {
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    tweetPost('@' + screenName + ' how long have you liked following robots around?');
}


// setInterval(tweetPost, 1000*20)

tweetPost();
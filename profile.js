/*
* Http Status Codes
* 200 = Okay
* 500 = Internal Server Error (End point issue)
* 301 = Server Moved
* 404 = Request error (Not found)
*/

var https = require('https');

// Print the data.
function printMessage(username, badgeCount, points) {
    console.log(`${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`);   
}

function getProfile(username){

    try{
        // Connect to the API URL (https://teamtreehouse.com/${username}.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

            if(response.statusCode === 200){
                let body = "";
                let bodyJson;

                // Read the data
                response.on('data', data => {
                    body += data.toString();
                });

                // Parse the data after read
                response.on('end', () => {
                    try{
                        bodyJson = JSON.parse(body);
                        printMessage(username,bodyJson.badges.length, bodyJson.points.JavaScript);
                    }catch (error){
                        console.error(error.message);
                    }
                });
            }else{
                const statusCodeError = new Error(`There was an error getting the profile for ${username} - ${response.statusCode}`);
                console.error(statusCodeError.message);
            }
        });
        request.on('error', error => console.error(`Problem with request ${error.message}`));
    }catch (error){
        console.error(error.message);
    } 
} 

module.exports.getProfileApi = getProfile;
const request = require('request');
const _ = require('lodash');
const moment = require('moment');

//initialize websites array where by each website must contain url and unique ID
const websites = [
    {
        url: 'http://www.google.com',
        ID: 1
    },
    {
        url: 'http://www.clickpesa.com',
        ID: 2
    },
    {
        url: 'http://www.tj.com',
        ID: 3
    }
];

let webs = [];
let similarWeb = {};

const monitor = function(){
    //loop websites to check each website url status
    websites.forEach(function (website) {

        try {
            // send request
            request(website.url, function (error, res) {

                if (!error && res.statusCode === 200) {
                    //success
                    //manage success response
                    //assign website status equals tp true then push website into webs array
                    website['status'] = true;
                    webs.push(website);

                } else {
                    //failure
                    //manage failed response
                    //assign website status equals tp false then push website into webs array
                    website['status'] = false;
                    webs.push(website);
                }
            });
        }
        catch (err) {
            // console.log(err)
        }

    });

    //After pushing every website and their statuses into webs array,
    //loop over webs array website to find failed url
    webs.forEach(function (website) {

        //put all similar websites in individual similar web object
        //check if website already exists in similar web object or not
        if (`${website.ID}` in similarWeb) {
            //website already exists
            //push response into website responses array
            let responses = similarWeb[`${website.ID}`].responses;
            responses.push(website.status);

            //set the response properties into similar web object
            similarWeb[`${website.ID}`].responses = responses;
        } else {
            //website does not exists into similar web object
            //set website and its response into similar web object
            similarWeb[`${website.ID}`] = {
                ID: website.ID,
                url: website.url,
                responses: [website.status],
            }
        }
    })


    //using lodash map the similar web object to get websites responses array
      _.map(similarWeb, web => {

          //initialize website response array
          const responseArray = web.responses;

          //check if there are three consecutive false statuses which indicates 3 consecutive failures on a single website
          const checkThreeConsecutiveFailure = (responseArray) => {
              //initialize previous
              const prev = {
                  element: null,
                  count: 0
              };

              for(let i = 0; i < responseArray.length; i++){
                  //
                  const { count, element } = prev;

                  //
                  if(count === 2 && element === responseArray[i] && element === false){
                      //there are three consecutive false statuses which indicates 3 consecutive failures
                      //record website url and time stamp then console
                      //get time using moment
                      let time = moment().toDate();

                      let msg = 'Time: ' + time;
                      msg += '||Website: ' + web.url;

                      //send a report
                      console.log(msg);

                      //After send report clear the response array that contain consecutive similar elements (false status) to avoid repetition;
                      responseArray.splice(0, responseArray.length);
                      //after send report clear the webs array that contain all websites and their statuses to avoid repetition;
                      webs.splice(0, webs.length);
                  }

                  prev.count = element === responseArray[i] ? count + 1 : count;
                  prev.element = responseArray[i];
              }
          };

          //call the check function
          checkThreeConsecutiveFailure(responseArray);

    })
}


//execute monitor function once after every 2 minutes
setInterval(monitor, 120000);
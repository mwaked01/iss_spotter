const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(body) {
  return request(`http://ipwho.is/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${JSON.parse(body).latitude}&lon=${JSON.parse(body).longitude}`);
};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then (fetchISSFlyOverTimes)
    .then(body => {
      return JSON.parse(body).response;
    } );
};

module.exports = { nextISSTimesForMyLocation};
const AmazonDateParser = require('../utils/amazon_date_converter');
const UTCtoCST = require('../utils/UTCtoCST');

// I'm just going to hard-code this assuming people will ask it primarily on week days
// Trying to find the weekend schedule is a pain

const unionDepartureTimes = ["6:30", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:33", "19:13", "20:56", "22:36"]
const discoveryParkDepartureTimes = ["6:46", "7:46", "8:26", "8:56", "9:26", "9:56", "10:26", "10:56", "11:26", "11:56", "12:26", "12:56", "13:26", "13:56", "14:26", "14:56", "15:26", "15:56", "16:26", "16:56", "17:26", "17:57", "19:37", "21:20", "23:00"]

// console.log(`${unionDepartureTimes.length} vs ${discoveryParkDepartureTimes.length}`)

function convertTime(time) {
    time = time.split(":");
    let convertedTime = Number(time[0]) + (Number(time[1]) * (100/60)) /100;
    return convertedTime;
}

function timePrettifier(time) {
    time = time.split(":");
    if (time[1] == '00') {
        time[1] = "o'clock";
    }
    if (Number(time[0]) > 12) {
        time[0] -= 12;
    }
    return `${time[0]} ${time[1]}`;
}

/**
 * Returns the next union bus time as a string.
 * @param time An already converted time float
 */
function getNextUnionBus(time) {
    for (departureTime of unionDepartureTimes) {
        if (time < convertTime(departureTime)) {
            return departureTime;
        }
    }
    return "no more buses today"
}

/**
 * Returns the next D Park bus time as a string.
 * @param time An already converted time float
 */
function getNextDiscoveryParkBus(time) {
    for (departureTime of discoveryParkDepartureTimes) {
        if (time < convertTime(departureTime)) {
            return departureTime;
        }
    }
    return "no more buses today"
}

// console.log(getNextUnionBus(17.5))

function DiscoveryIntent(handlerInput) {
    let speakOutput = "Speak output is not modified in Discovery Intent. ";
    let speakAddition = ""; // Use this to add any additional content you want Alexa to say

    let isLocationSpecified = handlerInput.requestEnvelope.request.intent.slots.bus_location.resolutions;
    let location;
    if (isLocationSpecified == null) {
        console.log(`Location was not specified, setting it to Main Campus`);
        location = 'main';
        speakAddition += "For future reference, you can specify whether you want times from Main Campus or from Discovery Park. ";
    } else {
        location = String(handlerInput.requestEnvelope.request.intent.slots.bus_location.resolutions.resolutionsPerAuthority[0].values[0].value.id)
        console.log(`\nGot location from resolutions: ${location}`);
    }
    let time = handlerInput.requestEnvelope.request.intent.slots.time.value;
    if (time == null) {
        console.log(`Time was ${time}, setting it to now`);
        time = Date().split(" ")[4];
    } else {
        console.log(`\nGot time from slots: ${time}`);
    }
    time = String(time);
    let convertedTime = UTCtoCST(Number(time.substring(0,2))) + (Number(time.substring(3,5)) * 100/60) / 100.0;
    console.log(`Got converted time as ${convertedTime}`);

    if (location == 'main') {
        let nextTime = getNextUnionBus(convertedTime);
        console.log(`Got next time as ${nextTime}`);
        nextTime = timePrettifier(nextTime);
        speakOutput = `The next bus to Discovery Park leaves the union at ${nextTime}. `;
    } else if (location == 'd_park') {
        let nextTime = getNextDiscoveryParkBus(convertedTime);
        console.log(`Got next time as ${nextTime}`);
        nextTime = timePrettifier(nextTime);
        speakOutput = `The next bus departs for the union at ${nextTime}. `;
    } else {
        console.log(`ERROR: Neither main nor d_park were specified, somehow.`);
        speakOutput = "Sorry, I did not understand you. ";
    }


    return handlerInput.responseBuilder
        .speak(speakOutput + speakAddition)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = DiscoveryIntent;
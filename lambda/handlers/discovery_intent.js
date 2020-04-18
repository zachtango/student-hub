const AmazonDateParser = require('../utils/amazon_date_converter');

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
        console.log(`Time was ${time}, setting it to PRESENT_REF`);
        time = 'PRESENT_REF'; // set time to the current time, according to the Amazon time format
    } else {
        console.log(`\nGot time from slots: ${time}`);
    }

    let parsedTime = new AmazonDateParser(time);
    console.log(`Parsed time: ${parsedTime}`);





    return handlerInput.responseBuilder
        .speak(speakOutput + speakAddition)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = DiscoveryIntent;
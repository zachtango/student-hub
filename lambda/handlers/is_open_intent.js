const isOpen = require('../utils/open_times')
const UTCtoCST = require('../utils/UTCtoCST');

function isOpenIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";
    let location = handlerInput.requestEnvelope.request.intent.slots.location.value;
    location = location.toLowerCase() // Make sure location is lowercase to ensure function works correctly

    console.log(`What I got from the slot is ${location}`);
    // console.log(`Here is the json for slots: ${Object.keys(handlerInput.requestEnvelope.request.intent.slots.location)}`);
    console.log(`Value got from ID: ${handlerInput.requestEnvelope.request.intent.slots.location.resolutions.resolutionsPerAuthority[0].values[0].value.id}`);

    location = String(handlerInput.requestEnvelope.request.intent.slots.location.resolutions.resolutionsPerAuthority[0].values[0].value.id);
    location = location.toLowerCase();

    let date = Date();
    date = date.split(" ");
    let dayLetters = date[0].substring(0,2).toLowerCase(); // first two letters of current day
    let hours = date[4].substring(0,2);
    let minutes = date[4].substring(3,5);
    let fractionTime = UTCtoCST(Number(hours)) + (Number(minutes) * 100/60) / 100; // this converts, say, 12:30 into 12.5

    console.log(`Calling isOpen(${location}, ${dayLetters}, ${fractionTime}). `);
    const locationIsOpen = isOpen(location, dayLetters, fractionTime);

    if (locationIsOpen) {
        speakOutput = `Yes, ${location} is currently open.`;
    } else {
        speakOutput = `No, ${location} is not open right now. `;
    }

    // we can have alexa say, "usually, McConnell is open" or something...
    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = isOpenIntent;
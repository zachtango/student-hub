const isOpen = require('../utils/open_times')

function isOpenIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";
    let location = handlerInput.requestEnvelope.request.intent.slots.location.value;

    console.log(`What I got from the slot is ${location}`);

    // we can have alexa say, "usually, McConnell is open" or something...
    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = isOpenIntent;
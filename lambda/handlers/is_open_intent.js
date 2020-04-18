

function isOpenIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";
    let location = handlerInput.requestEnvelope.request.intent.slots.location.value;

    console.log(`What I got from the slot is ${location}`);


    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = isOpenIntent;
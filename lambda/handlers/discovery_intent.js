
function DiscoveryIntent(handlerInput) {
    let speakOutput = "Speak output is not modified in Discovery Intent.";

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = DiscoveryIntent;
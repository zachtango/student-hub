
const ACCEPTED_LEVELS = [1,2,3,4,5]



function LevelXViolationIntent(handlerInput) {
    let speakOutput = "Speak output has not been modified.";

    let level = handlerInput.requestEnvelope.request.intent.slots.level.value;
    console.log(`The level we got was: ${level}`);
    if (!ACCEPTED_LEVELS.includes(level)) {
        return handlerInput.responseBuilder
        .speak("Please specify a value between 1 and 5.")
        .getResponse();
    }
    console.log(`User wants to know about violations of level ${level}`);

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = LevelXViolationIntent;
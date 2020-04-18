const PointsGetter = require('../utils/points_getter');

function DisciplinaryPointsIntent(handlerInput) {
    let speakOutput = "The speak output has not been modified."; 
    
    let infractionSpecified = handlerInput.requestEnvelope.request.intent.slots.infraction.resolutions.resolutionsPerAuthority;
    if (infractionSpecified == null) {
        return handlerInput.responseBuilder
        .speak("A violation was not specified. Please repeat the message specifying a violation.")
        .getResponse();
    }
    let infraction = handlerInput.requestEnvelope.request.intent.slots.infraction.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    infraction = String(infraction);
    console.log(`GOT INFRACTION: ${infraction}`);

    pointsString = PointsGetter(infraction);
    speakOutput = pointsString;

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = DisciplinaryPointsIntent;
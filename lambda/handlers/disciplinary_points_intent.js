const PointsGetter = require('../utils/points_getter');

function DisciplinaryPointsIntent(handlerInput) {
    let speakOutput = "The speak output has not been modified."; 
    



    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = DisciplinaryPointsIntent;
const AmazonDateParser = require("../../node_modules/amazon-date-parser");

function CurfewIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";

    let date = handlerInput.requestEnvelope.request.intent.slots.date;
    if (date == null) {
        console.log("\nDate is undefined or not specified.");
    } else {
        console.log(`Date retrieved as AMAZON.DATE: ${date}`);
    }

    var date = new AmazonDateParser(date);

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = CurfewIntent;
const AmazonDateParser = require('../utils/amazon_date_converter')

const SHORTENED_DAYS = {
    MONDAY: 'Mo',
    TUESDAY: 'Tu',
    WEDNESDAY: 'We',
    THURSDAY: 'Th',
    FRIDAY: 'Fr',
    SATURDAY: 'Sa',
    SUNDAY: 'Su',
}

function CurfewIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";

    let date = handlerInput.requestEnvelope.request.intent.slots.date.value;
    if (date == null) {
        console.log("\nDate is undefined or not specified.");
        date = 'PRESENT_REF';
    } else {
        console.log(`Date retrieved as AMAZON.DATE: ${date}`);
    }

    let parsedDate = new AmazonDateParser(date);
    console.log(`Parsed date looks like this: ${parsedDate}`);
    let startDate = parsedDate.startDate; // we will only work with the user-specified start date
    startDate = String(startDate);
    console.log(`\nJust casted startDate to a string, it looks like this: ${startDate}`);
    let dateLetters = startDate.substring(0,2);

    switch(dateLetters) {
        case SHORTENED_DAYS.SUNDAY:
        case SHORTENED_DAYS.MONDAY:
        case SHORTENED_DAYS.TUESDAY:
        case SHORTENED_DAYS.WEDNESDAY:
        case SHORTENED_DAYS.THURSDAY:
            speakOutput = "Curfew is 11:00 P. M.";
        break;
        case SHORTENED_DAYS.FRIDAY:
        case SHORTENED_DAYS.SATURDAY:
            speakOutput = "Curfew is at 1:00 A. M.";
        break;
        default:
            speakOutput = "Sorry, I don't know the curfew at this date.";
        break;
    }

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

let x = AmazonDateParser("PRESENT_REF")
console.log(String(x.startDate))

module.exports = CurfewIntent;
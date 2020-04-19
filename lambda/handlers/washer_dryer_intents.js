const fetch = require('node-fetch');

const projectID = 'tamslaundry'
const key = 'AIzaSyAn7K5TBf8B2EU9X0m275GOKu9u0qSjsd0'
const doc = 'form_data/washers/'
const url = `https://firestore.googleapis.com/v1beta1/projects/${projectID}/databases/(default)/documents/${doc}?key=${key}`

const washers = [1,2]
const dryers = [1,2]

async function WasherIntent(handlerInput) {
    let speakOutput = "Speak output not modified.";

    let washerNum = handlerInput.requestEnvelope.request.intent.slots.washer_num.value;
    console.log(`Got washerNum as ${washerNum}`);
    washerNum = Number(washerNum);
    console.log(`Casted washerNum as ${washerNum}`);

    if (!washers.includes(washerNum)) {
        return handlerInput.responseBuilder
        .speak("Sorry, I didn't recognize this as a valid washer number.")
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
    }

    let statuses;
    await fetch(url)
        .then(res => {
            statuses = res.json();
        });

    statuses = statuses.json();
    console.log(`Got statuses as ${statuses}`);
    let washerString = `washer${washerNum}`;
    console.log(`washerString looks like this: ${washerString}`);
    let status = statuses.fields[washerString].stringValue;
    console.log(`Got status: ${status}`);
    status = status.toLowerCase();

    if (status == 'true') {
        speakOutput = `Washer ${washerNum} is open.`;
    } else {
        speakOutput = `Washer ${washerNum} is currently occupied.`;
    }

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}
async function DryerIntent(handlerInput) {
    let speakOutput = "Speak output not modified."; 

    let dryerNum = handlerInput.requestEnvelope.request.intent.slots.dryer_num.value;
    console.log(`Got dryer num as ${dryerNum}`);



    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}


fetch(url)
    .then(response => response.json())
    .then(json => console.log(json.fields.dryer1.stringValue));

module.exports = {
    WasherIntent,
    DryerIntent
}
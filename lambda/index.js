require('dotenv').config();

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const CurfewIntent = require('./handlers/curfew_intent');
const IsOpenIntent = require('./handlers/is_open_intent');
const DiscoveryIntent = require('./handlers/discovery_intent');
const DisciplinaryPointsIntent = require('./handlers/disciplinary_points_intent');
const RoomAvailableHandler = require('./handlers/room_available_handler');
const UpcomingEventsHandler = require('./handlers/upcoming_events_handler');
const LevelXViolationIntent = require('./handlers/level_x_violation_intent');
const WasherDryerIntents = require('./handlers/washer_dryer_intents');
const messages = require('./messages');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = messages.HELLO_MESSAGE;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * This is where we sort our intents that are stored in separate files.
 */
const IntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' 
        && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'CurfewIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'IsOpenIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'RoomAvailableIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'DiscoveryIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpcomingEventsIntent' 
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'DisciplinaryPointsIntent' 
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'LevelXViolationIntent' 
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'WasherIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'DryerIntent')
    },
    async handle(handlerInput) {
        // if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent') {
        //     const speakOutput = 'Hello World!';
        //     return handlerInput.responseBuilder
        //     .speak(speakOutput)
        //     //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        //     .getResponse();
        // }
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'CurfewIntent') {
            return CurfewIntent(handlerInput);
        }
        else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'IsOpenIntent') {
            return IsOpenIntent(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'RoomAvailableIntent'){
            return RoomAvailableHandler(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'DiscoveryIntent') {
            return DiscoveryIntent(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpcomingEventsIntent'){
            return UpcomingEventsHandler(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'DisciplinaryPointsIntent'){
            return DisciplinaryPointsIntent(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'LevelXViolationIntent'){
            return LevelXViolationIntent(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'WasherIntent'){
            return WasherDryerIntents.WasherIntent(handlerInput);
        } else if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'DryerIntent'){
            return WasherDryerIntents.DryerIntent(handlerInput);
        } 
    }
}

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again, or contact the developers for assistance.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt(speakOutput) // this is annoying
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        // HelloWorldIntentHandler,
        IntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

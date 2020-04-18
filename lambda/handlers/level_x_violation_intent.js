
const ACCEPTED_LEVELS = [1,2,3,4,5]

const violationStrings = {
    1: `Level one docks include Being up to fifteen minutes late for curfew,
    Checking out a loaner key more than three times in a semester,
    Loitering or lingering in center stairwell,
    Missing mandatory academy functions,
    Roughhousing,
    and Failing to meet room inspection standards within 24 hours of warning.`,
    2: `Level two docks include Being late for curfew by 15 to 29 minutes,
    Violating P D A policy,
    Violating the privilege system,
    Having a pet in the hall,
    Violating visitation policy, and
    Violating any combination of 3 for 30 policies within a 30 day period`,
    3: `Level three docks include Being late for curfew by 30 to 44 minutes,
    Being off-limits,
    Being non-compliant,
    Using a meal card or I D card in an unauthorized manner,
    Misbehaving in the cafeteria,
    Using a stairwell other than the central stairwell during a non-emergency, Using an emergency exit during a non-emergency, Tampering with window tabs,
    Having a candle or an open flame, and
    Harassing someone.`,
    4: `Being late to curfew by 45 or more minutes, Violating PDA policy,
    Smoking or possession of any tobacco products, Violating visitation policy,
    Participating in vandalism,
    Verbally abusing staff,
    Fighting,
    Violating computer policy,
    Violating safety and security policies, Harassing someone,
    Hosting or hiding an unregistered overnight guest, and
    Being absent from the hall overnight without permission`,
    5: `Possessing and/or using alcohol or illegal drugs or drug paraphernalia,
    Acts that would constitute violations of law, other than a minor traffic violation or smoking,
    Violating safety and security policies,
    Exploring or crawling in off-limits areas, and
    Violation of computer policy`
}

function LevelXViolationIntent(handlerInput) {
    let speakOutput = "Speak output has not been modified.";

    let level = handlerInput.requestEnvelope.request.intent.slots.level.value;
    level = Number(level);
    console.log(`The level we got was: ${level}`);
    if (!ACCEPTED_LEVELS.includes(level)) {
        return handlerInput.responseBuilder
        .speak("Please specify a value between 1 and 5.")
        .getResponse();
    }
    console.log(`User wants to know about violations of level ${level}`);

    speakOutput = violationStrings[level];

    return handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}

module.exports = LevelXViolationIntent;
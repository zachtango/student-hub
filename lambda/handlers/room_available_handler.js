const fetch = require('node-fetch');

const url = 'https://tamsinfo-b33c7.firebaseio.com/roomAvailability.json';


async function roomAvailableHandler(handlerInput){
    const room = handlerInput.requestEnvelope.request.intent.slots.room.value;
    
    let key = null;
    if(room === 'kitchenette'){
        key = 'kitchenette';
    } else if(room === 'tv room'){
        key = 'tvRoom';
    }
    
    // get room availability from url
    let rooms;
    await fetch(url)
        .then(res => res.text())
        .then(body => {
            rooms = JSON.parse(body);
        });

    // decide if room is available based on data received from api
    let speakOutput = 'null';
    if(rooms[key]){
        speakOutput = 'The ' + room + ' is available';
    } else{
        speakOutput = 'The ' + room + ' is not available';
    }

    //console.log(room[key]);
    return handlerInput.responseBuilder
        .speak(key)
        .getResponse();
}


module.exports = roomAvailableHandler;
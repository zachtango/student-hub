const fetch = require('node-fetch');

const url = 'https://tamsinfo-b33c7.firebaseio.com/clubEvents/';

class Event{
    constructor(name, date, weekAway){
        this.name = name;
        this.date = date;
        this.weekAway = weekAway;
        this.day = null;
        switch(date.getDay()){
            case 0:
                this.day = 'sunday';
                break;
            case 1:
                this.day = 'monday';
                break;
            case 2:
                this.day = 'tuesday';
                break;
            case 3:
                this.day = 'wednesday';
                break;
            case 4:
                this.day = 'thursday';
                break;
            case 5:
                this.day = 'friday';
                break;
            case 6:
                this.day = 'saturday';
                break;
            default:
                this.day = '';
                break;
        }
    }
}

async function upcomingEventsHandler(handlerInput){
    const input = handlerInput.requestEnvelope.request.intent.slots.club.value;
   
    let club = null;
    if(input === 'CSO' || input === 'computer club' || input === 'computer science organization'){
        club = 'CSO';   
    } else if(input === 'JETS' || input === 'jets'){
        club = 'JETS';
    } else if(input === 'RO' || input === 'research organization' || input === 'research club'){
        club = 'RO';
    } else if(input === 'sports' || input === 'sports club'){
        club = 'sports';
    }
    
    let events = null;
    await fetch(url + `${club}.json`)
    .then(res => res.text())
    .then(body => {
        events = JSON.parse(body);
    });

    if(events === null){
        return handlerInput.responseBuilder
        .speak('There are no upcoming events currently.')
        .getResponse();
    }
    
    //console.log(Object.keys(events));
    
    let now = new Date();
    let fortnightAway = new Date(Date.now() + 12096e5);
    let weekAway = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    let keys = Object.keys(events);
    
    let filteredEvents = [];

    keys.forEach((k) => {
        //console.log(events[k]);
        //console.log();
        //console.log('DateCheck');
        
        let event = null;
        let date = new Date(`${events[k].date}T${events[k].time}Z`);
        if(now <= date && date <= weekAway){
            //console.log('week away');
            event = new Event(
                k,
                date,
                true
            );
            filteredEvents.push(event);
        } else if(now <= date && date <= fortnightAway){
            //console.log('2 weeks away');
            event = new Event(
                k,
                date,
                false
            );
            filteredEvents.push(event);
        } else{
            //console.log('more than 2 weeks away');
        }
    });
    
    let speakOutput = format(club, filteredEvents);
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
}

function format(club, events){
    let word = 'next next';
    
    let speakOutput = `Okay, here are some upcoming events for the ${club} club. `;
    for(let i = 0; i < events.length; ++i){
        if(events[i].weekAway){
            word = 'next';
        }
        speakOutput += `There is the ${events[i].name} event ${word} ${events[i].day}. `
    }

    return speakOutput;
}

module.exports = upcomingEventsHandler;
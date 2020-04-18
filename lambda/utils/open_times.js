const DAYS = require('./days_of_the_week')

/**
 * Holds the various hours for different locations. Couldn't find a better way to do this, lol.
 */
const hours = {
    bruce: {
        mo: { first: {open: 7, close: 21}},
        tu: { first: {open: 7, close: 21}},
        we: { first: {open: 7, close: 21}},
        th: { first: {open: 7, close: 21}},
        fr: { first: {open: 7, close: 20}},
        sa: { first: {open: null, close: null}},
        su: { first: {open: null, close: null}},
    },
    champs: {
        mo: {
            first: {open: 7, close: 9.5},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        tu: {
            first: {open: 7, close: 9.5},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        we: {
            first: {open: 7, close: 9.5},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        th: {
            first: {open: 7, close: 9.5},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        fr: {
            first: {open: 7, close: 9.5},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        sa: { first: {open: null, close: null}},
        su: { first: {open: null, close: null}},
    },
    kerr: {
        mo: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        tu: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        we: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        th: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        fr: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5}
        },
        sa: {
            first: {open: 10, close: 14},
            second: {open: 16.5, close: 19},
        },
        su: {
            first: {open: 10, close: 14},
            second: {open: 16.5, close: 21},
        }
    },
    maple: {
        mo: {
            first: {open: 7, close: 10},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        tu: {
            first: {open: 7, close: 10},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        we: {
            first: {open: 7, close: 10},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        th: {
            first: {open: 7, close: 10},
            second: {open: 11, close: 14},
            third: {open: 16.5, close: 20},
        },
        fr: {
            first: {open: 7, close: 10},
            second: {open: 11, close: 14},
        },
        sa: { first: {open: null, close: null}},
        su: { first: {open: null, close: null}},
    },
    // NOTE: I don't actually know if this is right for West
    west: {
        mo: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        tu: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        we: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        th: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5},
            third: {open: 16.5, close: 20},
        },
        fr: {
            first: {open: 7, close: 10},
            second: {open: 10.5, close: 14.5}
        },
        sa: { first: {open: null, close: null}},
        su: { first: {open: null, close: null}},
    },
    pohl: {
        mo: {first: {open: 6, close: 24}},
        tu: {first: {open: 6, close: 24}},
        we: {first: {open: 6, close: 24}},
        th: {first: {open: 6, close: 24}},
        fr: {first: {open: 6, close: 22}},
        sa: {first: {open: 8, close: 19}},
        su: {first: {open: 10, close: 24}},
    },
    cvs: {
        mo: {first: {open: 7, close: 21}},
        tu: {first: {open: 7, close: 21}},
        we: {first: {open: 7, close: 21}},
        th: {first: {open: 7, close: 21}},
        fr: {first: {open: 7, close: 21}},
        sa: {first: {open: 7, close: 21}},
        su: {first: {open: 7, close: 21}},
    },
    // willis always be open
    willis: {
        mo: {first: {open: 0, close: 24}},
        tu: {first: {open: 0, close: 24}},
        we: {first: {open: 0, close: 24}},
        th: {first: {open: 0, close: 24}},
        fr: {first: {open: 0, close: 24}},
        sa: {first: {open: 0, close: 24}},
        su: {first: {open: 0, close: 24}},
    }, 
    sycamore: {
        mo: {first: {open: 8, close: 22}},
        tu: {first: {open: 8, close: 22}},
        we: {first: {open: 8, close: 22}},
        th: {first: {open: 8, close: 22}},
        fr: {first: {open: 8, close: 17}},
        sa: {first: {open: 12, close: 16}},
        su: {first: {open: 13, close: 22}},
    },
}

/**
 * Returns a bool of whether a location is open.
 * @param location A string for location
 * @param day First two digits of day, "mo," "tu," etc.
 * @param time The time to be checked against, e.g. 4 for 4:00 AM or 24 for Midnight
 */
function isOpen(location, day, time) {
    times = hours[location][day]
    timesEntries = Object.values(times);
    for (timeSlot of timesEntries) {
        if (between(time, timeSlot)) {
            return true;
        }
    }
    return false;
    // iterate through times and check if you're ever in it
}

function between(time, timeThing) {
    if (time > timeThing.open && time < timeThing.close) {
        return true;
    } else {
        return false;
    }
}

// OLD TESTING STUFF:
// console.log(`Let's see if Kerr is open Saturday at midnight: ${isOpen("kerr", "sa", 24)}`)

// console.log(`Is sycamore open at 7:00: ${between(9, hours.bruce.mo.first)}`)
// // this is how we can access the data
// // console.log(hours.champs.mo.first.open)
// x = Object.values(hours.champs.mo);
// console.log(`After entries is ${x}`)
// for (y of x) {
//     console.log(y)
//     // for (x of y) {
//     //     console.log(x);
//     // }
// }

module.exports = isOpen;

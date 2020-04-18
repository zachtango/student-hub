

function convertTime(hour) {
    let newTime = hour - 5;
    if (newTime < 0) {
        newTime += 24;
    }
    return newTime;
}

// console.log(convertTime(24))
// console.log(convertTime(2))

module.exports = convertTime;
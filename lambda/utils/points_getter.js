

function PointsGetter(infraction) {
    switch(infraction) {
        case 'late_15_minutes':
        case 'loaner_key':
        case 'loitering':
        case 'missing_mandatory_functions':
        case 'roughhousing':
        case 'room_inspection_ignoring':
            return '10 to 20 points';
        case 'late_30_minutes':
        case 'pda':
        case 'privilege_violation':
        case 'having_pet':
        case 'visitation':
            return '20 to 30 points';
        case 'late_45_minutes':
        case 'off_limits':
        case 'non_compliance':
        case 'unauthorized_card_use':
        case 'cafeteria_misbehaving':
        case 'different_stairwell':
        case 'emergency_exit':
        case 'window_tab_tampering':
        case 'open_flame':
        case 'harassment':
            return '30 to 50 points';
        case 'late_45_or_more_minutes':
        case 'sexual_intercourse':
        case 'smoking':
        case 'vandalism':
        case 'verbal_abuse':
        case 'fighting':
        case 'violating_computer_policy':
        case 'safety_and_security_violation':
        case 'overnight_guest':
        case 'overnight_absence':
            return '50 to 90 points';
        case 'alcohol_or_drugs':
        case 'law_violation':
        case 'off_limits_areas':
            return '100 points; typically an automatic dismissal.';
        case 'general_curfew_violation':
            return 'anywhere from 10 to 90 points, depending on how late you are.';
        default:
            console.log(`Unknown value sent to points-getter.`)
            return 'unknown';
    }
}

// console.log(PointsGetter('fighting'));


module.exports = PointsGetter;
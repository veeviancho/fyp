const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = function validateTiming(data) {
    const date1 = data.date + "T" + data.start + "+00:00" + "/" + data.date + "T" + data.end + "+00:00"
    const range1  = moment.range(date1);

    if (data.isBooking) {
        for (let i=0; i<data.arr.length; i++) {
            let date2 = data.arr[i].date + "T" + data.arr[i].start + "+00:00" + "/" + data.arr[i].date + "T" + data.arr[i].end + "+00:00" 
            let range2 = moment.range(date2);
            // Check for overlapping
            if (range1.overlaps(range2)) {
                return true
            }
        }
    } 
    
    else if (data.isBookingSeat) {
        let count = 0
        for (let i=0; i<data.arr.length; i++) {
            let date2 = data.arr[i].date + "T" + data.arr[i].start + "+00:00" + "/" + data.arr[i].date + "T" + data.arr[i].end + "+00:00" 
            let range2 = moment.range(date2);
            // Check for overlapping
            if (range1.overlaps(range2)) {
                count += 1
            }
            if (count == data.room.maxUsers) {
                return true
            }
        }
    } 
    
    else {
        for (let i=0; i<data.arr.length; i++) {
            let date2 = data.arr[i].date + "T" + data.arr[i].startTime + "+00:00" + "/" + data.arr[i].date + "T" + data.arr[i].endTime + "+00:00" 
            let range2 = moment.range(date2);
            // Check for overlapping
            if (range1.overlaps(range2)) {
                return true
            }
        }
    }
}
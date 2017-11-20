/* NOTE uncomment for unit test
class DebugException extends Error {
    constructor() {
        super('This exception should never be thrown. If you see this, please contact with author');
        this.name = 'DebugException';
    }
}
*/

class Time extends Date {
    constructor(...params) {
        if (params.length === 0) {
            super();
        } else if (params.length === 1) {
            super((Number)((params[0]).getNanotime()));
        } else {
            throw new DebugException();
        }
    }

    getNanotime() {
        return this.getTime().toString();
    }

    // override
    getDate() {
        var year = '' + super.getFullYear();
        var month = ((super.getMonth() + 1) < 10 ? '0' : '') + (super.getMonth() + 1); // months are zero based
        var day = (super.getDate() < 10 ? '0' : '') + super.getDate();
        return Array.of(year, month, day).join('-');
    }

    setMonthGap(months) {
        var month = super.getMonth() + months;
        while (month > 11) {
            this.setFullYear(super.getFullYear() + 1);
            month -= 12;
        }
        super.setMonth(month);
        return this;
    }

    setYearGap(years) {
        this.setFullYear(super.getFullYear() + years);
        return this;
    }

    // override
    setFullYear(year) {
        super.setFullYear(year);
        return this;
    }

    // override
    setMonth(month) {
        super.setMonth(month - 1);
        return this;
    }

    setNanotime(nanotime) {
        super.setTime(nanotime);
        return this;
    }

    isInAYear(that) {
        var curNanotime = (Number)(this.getNanotime());
        var thatNanotime = (Number)(that.getNanotime());
        var maxNanotime = new Time(this).setYearGap(1).getNanotime();

        return curNanotime < thatNanotime && thatNanotime <= maxNanotime;
    }
}

// var curTime = new Time();
// var endTime = new Time(curTime).setMonthGap(6);
// var maxTime1 = new Time(curTime).setYearGap(1);
// var maxTime2 = new Time(curTime).setMonthGap(12);
// var errTimeHigh = new Time(curTime).setMonthGap(13);
// var errTimeLow = new Time(curTime).setMonth(10);
//
// console.log(curTime.getDate());
// console.log(endTime.getDate());
// console.log(maxTime1.getDate());
// console.log(maxTime2.getDate());
// console.log(errTimeHigh.getDate());
// console.log(errTimeLow.getDate());
//
// console.log(curTime.getNanotime());
// console.log(endTime.getNanotime());
// console.log(maxTime1.getNanotime());
// console.log(maxTime2.getNanotime());
// console.log(errTimeHigh.getNanotime());
// console.log(errTimeLow.getNanotime());
//
// console.log(curTime.isInAYear(endTime));
// console.log(curTime.isInAYear(maxTime1));
// console.log(curTime.isInAYear(maxTime2));
// console.log(curTime.isInAYear(errTimeHigh));
// console.log(curTime.isInAYear(errTimeLow));

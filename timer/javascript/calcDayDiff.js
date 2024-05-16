function calcDayDiff1(inputDate, nowDate) {
    const now = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
    );

    const diff = new Date(inputDate - now);

    return {
        year: diff.getFullYear() - 1970,
        month: diff.getMonth(),
        day: diff.getDate() - 1,
        totalDay: diff.getTime() / 1000 / 60 / 60 / 24,
    };
}

function calcDayDiff2(inputDate, nowDate) {
    const now = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
    );

    let monthsDiff = 0;
    let daysDiff = 0;
    let increase = 0;

    while (inputDate.getTime() !== now.getTime()) {
        now.setDate(now.getDate() + 1);
        increase++;
        daysDiff++;
        if (getEndDate(now) === daysDiff) {
            monthsDiff++;
            daysDiff = 0;
        }
    }

    return {
        year: Math.floor(monthsDiff / 12),
        month: monthsDiff > 12 ? monthsDiff % 12 : monthsDiff,
        day: daysDiff,
        totalDay: increase,
    };
}

function getEndDate(dateObj) {
    return new Date(
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        0
    ).getDate();
}

function calcDayDiff3(inputDate, nowDate) { // 오늘의  date를 기준으로 한 1개월 계산
    const now = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
    );
    
    let monthsDiff = 0;
    let daysDiff = 0;

    let dateDiff = (inputDate - now) / 1000 / 60 / 60 / 24;
    const dateOffset = now.getDate();

    for (let i = dateDiff; i > 0; i--) {
        now.setDate(now.getDate() + 1);
        daysDiff++;
        if (now.getDate() === dateOffset) {
            monthsDiff++;
            daysDiff = 0;
        }
    }

    return {
        year: Math.floor(monthsDiff / 12),
        month: monthsDiff > 12? monthsDiff % 12 : monthsDiff,
        day: daysDiff,
        totalDay: dateDiff,
    }
}

export { calcDayDiff3 };
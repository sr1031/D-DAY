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
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
}

function calcDayDiff3(milliseconds, request, title) {
    // 오늘의  date를 기준으로 한 1개월 계산
    let monthsDiff = 0;
    let daysDiff = 0;

    const nowDate = new Date(milliseconds);
    const seconds = nowDate.getTime() / 1000;
    const dateOffset = nowDate.getDate();
    let dateDiff = Math.floor(seconds / 60 / 60 / 24);

    for (let i = dateDiff; i > 0; i--) {
        nowDate.setDate(nowDate.getDate() + 1);
        daysDiff++;
        if (nowDate.getDate() === dateOffset) {
            monthsDiff++;
            daysDiff = 0;
        }
    }

    const resultDays = {
        year: Math.floor(monthsDiff / 12),
        month: monthsDiff >= 12 ? monthsDiff % 12 : monthsDiff,
        day: daysDiff,
        totalDay: dateDiff,
    };

    request.innerText = `${resultDays.year}년 ${resultDays.month}개월 ${resultDays.day}일`;
    title.innerText = `D-${resultDays.totalDay}`;
}

function calcTimeDiff(milliseconds, time) {
    const seconds = milliseconds / 1000;
    const hourDiff = Math.floor(seconds / 60 / 60) % 24;
    const minuteDiff = Math.floor(seconds / 60) % 60;
    const secondDiff = Math.floor(seconds) % 60;

    time.innerText = `${String(hourDiff).padStart(2, '0')}시간 ${String(
        minuteDiff
    ).padStart(2, '0')}분 ${String(secondDiff).padStart(2, '0')}초 남았습니다~`;
}

export { calcDayDiff3, calcTimeDiff };

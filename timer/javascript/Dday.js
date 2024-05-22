import { calcDayDiff3, calcTimeDiff } from "./calcDayDiff.js";
(function () {
    //즉시 실행 함수로 dom 구조 로드 후에 사용될 js 코드를 입력할 수도 있지만,
    // <script src="..." defer></script>로 defer를 이용해
    //dom 로드와 동시에 js 파일을 읽을 수도 있다.
    "use strict";

    window.addEventListener("DOMContentLoaded", () => {
        const title = document.querySelector(".header h1");
        const year = document.getElementById("year");
        const month = document.getElementById("month");
        const day = document.getElementById("day");
        const request = document.querySelector(".request");
        const time = document.querySelector(".time");
        const countDown = document.getElementById("countDown");
        const reset = document.getElementById("reset");
        let timeInterval = null;

        countDown.addEventListener("click", (event) => {
            countDownStart(event.target, {
                year: year,
                month: month,
                day: day,
            });
        });

        reset.addEventListener("click", () => {
            resetStart({
                year: year,
                month: month,
                day: day,
            }, countDown, request, title, time);
        });

        function resetStart(inputDates, countDown, request, title, time) {
            for (const key in inputDates) {
                inputDates[key].disabled = false;
                inputDates[key].value = "";
                inputDates[key].disabled = false;
                inputDates[key].style = "";
                localStorage.removeItem(key);
            }

            countDown.disabled = false;
            countDown.style = "";
            title.innerText = "D-Day";
            title.style.color = "";
            request.innerText = "D-Day를 입력해주세요";
            clearInterval(timeInterval);
            time.innerText = "";
        }

        function countDownStart(button, inputDates) {
            if (isValidated(inputDates)) {
                const yearValue = parseInt(inputDates.year.value);
                const monthValue = parseInt(inputDates.month.value);
                const dayValue = parseInt(inputDates.day.value);

                const inputDate = new Date(yearValue, monthValue - 1, dayValue);
                const milliseconds = inputDate - new Date();

                if (milliseconds <= 0) {
                    d_day(title, request, time);
                    pleaseReset(button, inputDates);
                    return;
                }

                calcDayDiff3(milliseconds, request, title);
                calcTimeDiff(milliseconds, time);

                timeInterval = setInterval(() => {
                    const millisec = inputDate - new Date();
                    if (millisec < 0) {
                        d_day(title, request, time);
                    } else {
                        calcDayDiff3(millisec, request, title);
                        calcTimeDiff(millisec, time);
                    }
                }, 1000);

                pleaseReset(button, inputDates);
            } else {
                request.innerText = "다시 입력해주세요!";
            }
        }

        function pleaseReset(countDown, inputDates) {
            countDown.disabled = true;
            countDown.style =
                "background-color: rgba(255, 255, 255, 0.9); cursor:default";
                for (const i in inputDates) {
                    inputDates[i].disabled = true;
                    inputDates[i].style = "background-color: light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3));"
                }
        }

        function d_day(title, request, time) {
            title.innerText = "!D-DAY!";
            title.style = "color: red";
            request.innerText = "오늘! 당일입니다!";
            clearInterval(timeInterval);
            time.innerText = "0시 0분 0초 남았습니다...!";
        }

        function isValidated(inputDates) {
            const yearValue = parseInt(inputDates.year.value);
            const monthValue = parseInt(inputDates.month.value);
            const dayValue = parseInt(inputDates.day.value);
            const inputDate = new Date(yearValue, monthValue - 1, dayValue);
            const nowDate = new Date();

            if (yearValue < nowDate.getFullYear() || isNaN(yearValue)) {
                inputDates.year.value = "";
                return false;
            }

            if (monthValue < 0 || monthValue > 12 || isNaN(monthValue)) {
                inputDates.month.value = "";
                return false;
            }

            if (
                dayValue < 0 ||
                monthValue == inputDate.getMonth() ||
                isNaN(dayValue)
            ) {
                inputDates.day.value = "";
                return false;
            }

            const millisec = inputDate.getTime() - nowDate.getTime();

            if (millisec < -1000 * 60 * 60 * 24) {
                inputDates.year.value = "";
                inputDates.month.value = "";
                inputDates.day.value = "";
                return false;
            }

            return true;
        }
    });
})();

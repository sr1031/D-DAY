import { calcDayDiff3 } from './calcDayDiff.js';
(function () {
    'use strict';

    window.addEventListener('DOMContentLoaded', () => {
        const title = document.querySelector('.header h1');
        const year = document.getElementById('year');
        const month = document.getElementById('month');
        const day = document.getElementById('day');
        const request = document.querySelector('.request');
        const countDown = document.getElementById('countDown');
        const reset = document.getElementById('reset');

        countDown.addEventListener('click', () => {
            if (isValidated(year, month, day)) {
                const yearValue = parseInt(year.value);
                const monthValue = parseInt(month.value);
                const dayValue = parseInt(day.value);
                const inputDate = new Date(yearValue, monthValue - 1, dayValue);
                const result = calcDayDiff3(inputDate, new Date());

                request.innerText = `${result.year}년 ${result.month}개월 ${result.day}일 남았습니다~`;
                title.innerText = `D-${result.totalDay}`;
            } else {
                request.innerText = '다시 입력해주세요!';
            }
        });

        reset.addEventListener('click', () => {
            year.value = '';
            month.value = '';
            day.value = '';
            title.innerText = 'D-Day';
            request.innerText = 'D-Day를 입력해주세요';
        });

        function isValidated(year, month, day) {
            const yearValue = parseInt(year.value);
            const monthValue = parseInt(month.value);
            const dayValue = parseInt(day.value);
            const inputDate = new Date(yearValue, monthValue - 1, dayValue);
            const nowDate = new Date();

            if (yearValue < 2024 || isNaN(yearValue)) {
                year.value = '';
                return false;
            }

            if (monthValue < 0 || monthValue > 12 || isNaN(monthValue)) {
                month.value = '';
                return false;
            }

            if (dayValue < 0 || dayValue > 31 || isNaN(dayValue)) {
                day.value = '';
                return false;
            }

            if (inputDate.getTime() < nowDate.getTime()) {
                year.value = '';
                month.value = '';
                day.value = '';
                return false;
            }

            return true;
        }
    });
})();

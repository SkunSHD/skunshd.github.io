(function (window) {
  'use strict';
  let subcalone = (function () {
    // variable change below (var chache on let cache) is causing the error
    // how to do in that case?
    var cache = cache || {};

    let generateCalendar = function (year, month) {
        const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let daysInMonths = [31, (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let haveDays = true;
        let day = 1, i, j;
        let calendar = [];
        let postFirstDay = 1;

        let startDay = (function () {
            let sd = new Date(year, month, day).getDay();
            sd === 0 ? sd = 6 : sd -= 1;
            return sd;
        })();

        let getDateAgo = (date, days) => {
            let dateCopy = new Date(date);
            dateCopy.setDate(dateCopy.getDate() - days);
            return dateCopy;
        };
        let preFirstDay = getDateAgo(new Date(year, month, day), startDay).getDate();

        if (cache[year]) {
            if (cache[year][month]) {
                return cache[year][month];
            }
        } else {
            cache[year] = {};
        }

        i = 0;
        while (haveDays) {
            calendar[i] = [];
            for (j = 0; j < 7; j++) {
                if (i === 0) {
                if (j < startDay) {
                    calendar[i][j] = preFirstDay++;
                } else if (j === startDay) {
                    calendar[i][j] = day++;
                    startDay++;
                }
                } else if (day <= daysInMonths[month]) {
                    calendar[i][j] = day++;
                } else {
                    calendar[i][j] = postFirstDay++;
                    haveDays = false;
                }
                if (day > daysInMonths[month]) {
                    haveDays = false;
                }
            }
        i++;
        }

        if (calendar[5]) {
        for (i = 0; i < calendar[5].length; i++) {
            if (calendar[5][i] !== "") {
                calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
            }
        }
        calendar = calendar.slice(0, 5);
        }

        for (i = 0; i < calendar.length; i++) {
            calendar[i] = _.template(app.templates.li)({arr: calendar[i]});
        }

        calendar = '<ol class="curr-days">' + calendar.join("") + "</ol>";
        let tempWrap = document.createElement('div');
        tempWrap.innerHTML = calendar;
        calendar = tempWrap.firstChild;

        // adding class 'today' for today
        for (i = 0; i < calendar.childNodes.length; i++) {
            // todo: add a month check feature
            if (calendar.children[i].textContent === new Date().getDate().toString()) {
                calendar.children[i].className += ' today';
            }
        }

        let addDaysNames = (parNode) => {
            const TAG_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sanday"];
            for (i = 0; i < 7; i++) {
                parNode.children[i].textContent += ', ' + TAG_NAMES[i];
            }
            return parNode;
        };
        calendar = addDaysNames(calendar);

        cache[year][month] = {
            calendar: () => calendar.cloneNode(true),
            label: MONTHS[month] + " " + year
        };

        return cache[year][month];
    };
    
    let createCalendar = (year, month) => generateCalendar(year, month);

    return {
        createCalendar: createCalendar
    }
  })();

  window.app = window.app || {};
  window.app.subcalone = subcalone;
})(window);
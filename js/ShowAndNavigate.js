(function(window) {
    'use strict';

    function ShowDateMethods() {

	}

    // Monat und Jar aus localStorage
    ShowDateMethods.getLocalDateObj = function() {
        var monthString = localStorage.getItem('month');
        var yearString = localStorage.getItem('year');
        return new Date(yearString, monthString);
    }

    ShowDateMethods.parseStrInDate = function(str) {
        var arr = str.trim().split('.');
        var day = parseInt(arr[0]);
        var month = parseInt(arr[1])-1;
        var year = parseInt(arr[2]);

        return new Date(year, month, day);
    }

    ShowDateMethods.showToday = function () {
		
        var today = new Date();
        window.app.storage.setData('month', today.getMonth());
        window.app.storage.setData('year', today.getFullYear());

        new window.app.Calendar().createCalendar();
        ShowDateMethods.showDate();
    }
 
    ShowDateMethods.setMonthYearInLocalStorage = function(month, year) {
        window.app.storage.setData(month, today.getMonth());
        window.app.storage.setData(year, today.getFullYear());
    }

    ShowDateMethods.listener = function() {
        var calendar = new window.app.Calendar();
        return function() {
            var target = event.target;
            if(target.id == 'button-next') calendar.nextMonthOrYear();
            if(target.id == 'button-previous') calendar.previousMonthOrYear();
        }
    };

    ShowDateMethods.showDate = function() {
        var parent = document.getElementById('day-select');
        // first time adding date or not
        if(parent.children[1].className != 'date-indicator') {
            var date = new Date();
            window.app.storage.setData('month', date.getMonth());
            window.app.storage.setData('year', date.getFullYear());

            var dateString = date.toLocaleString('en', { year: 'numeric', month: 'long' });

            // var p = document.createElement('p');
            // p.className = 'date-indicator';
            // p.innerHTML = dateString;

            // parent.insertBefore(p, parent.children[1]);
			
			var parent = document.querySelector('date-indicator');
			parent.appendChild(dateString);
        } else {
		
            var selectedDate = ShowDateMethods.getLocalDateObj();
            var selectedDateString = selectedDate.toLocaleString('en', { year: 'numeric', month: 'long'});

            // show just years if it month view ( 2010 )
            if( document.querySelector('.calendar-list-month')) selectedDateString = selectedDate.toLocaleString('en', { year: 'numeric'});

            // show years diapason if it years view ( 2010 - 2019 )
            if( document.querySelector('.calendar-list-year')) {
                var startYear = selectedDate.getFullYear() - selectedDate.getFullYear() % 10;
                var endYear = startYear + 11;
                selectedDateString = startYear + ' - ' + endYear;
            }

            var p = window.app.Methods.createAndSetTag('p', 'date-indicator', '', selectedDateString);
            parent.replaceChild(p, parent.children[1]);
        }
        parent.onclick = function() { if(event.target.className == 'date-indicator') showMonthOrYear.getInstance().getMonthOrYear(); };
    }

    // single tone for MonthYearView constructor
    var showMonthOrYear = (function() {
        var instance;

        function createInstance() {
            var object = new MonthYearView();
            return object;
        }

        return {
            getInstance: function() {
                if(!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        }
    })();

    // Show monthlist or yearlist
    function MonthYearView() {
        this.getMonthOrYear = function() {
            window.app.Methods.closePopupWindow();
            if( !document.querySelector('.calendar-list-month') && !document.querySelector('.calendar-list-year') ) showMonthList();
            else if( !document.querySelector('.calendar-list-year')) this.showYearList();
        }

        function showMonthList() {
            var wrapper = document.getElementById('calendar');

            var container = window.app.Methods.createAndSetTag('div');

            var ol = window.app.Methods.createAndSetTag('ol', 'calendar-list-month');
            var clear = window.app.Methods.createAndSetTag('div', 'calendar-clear');

            var getMonth = monthCounter();

            for(var i=0; i< 12; i++) {
                // Methods.createAndSetTag = function(tag, className, container, text)
                var date = new Date();

                var currentLi = window.app.Methods.createAndSetTag('li', 'calendar-left-side calendar-list-item calendar-list-item', ol, '<span>' + getMonth() + '</span>', goInMonthYear );
                currentLi.setAttribute('index', i);
                ol.appendChild(currentLi);
            }

            container.appendChild(ol);
            container.appendChild(clear);

            wrapper.lastChild.remove();
            wrapper.appendChild(container);
            ShowDateMethods.showDate();
        }

        // closure for
        function monthCounter() {
            var counter = 0;
            var date = new Date();

            return function() {
                date.setMonth(counter);
                counter++;
                return date.toLocaleString('en', { month: 'long' });
            }
        }

        this.showYearList = function () {

            var wrapper = document.getElementById('calendar');
            var container = window.app.Methods.createAndSetTag('div');

            var ol = window.app.Methods.createAndSetTag('ol', 'calendar-list-year');
            var clear = window.app.Methods.createAndSetTag('div', 'calendar-clear');

            var getYear = yearCounter();

            for(var i=0; i< 12; i++) {
                var currentYear = getYear();
                var currentLi = window.app.Methods.createAndSetTag('li', 'calendar-left-side calendar-list-item calendar-list-item', ol, '<span>' + currentYear + '</span>', goInMonthYear);
                currentLi.setAttribute('index', currentYear);
                ol.appendChild(currentLi);

            }

            container.appendChild(ol);
            container.appendChild(clear);

            wrapper.lastChild.remove();
            wrapper.appendChild(container);
            ShowDateMethods.showDate();
        }

        function yearCounter() {
            var date = ShowDateMethods.getLocalDateObj();
            var start = date.getFullYear() - date.getFullYear() % 10;

            return function() {
                date.setFullYear(start);
                start++;
                return date.getFullYear();
            }
        }

        function goInMonthYear(event) {
            if(document.querySelector('.calendar-list-month')) {
                localeStorage.setItem('month', this.getAttribute('index'));
                new window.app.Calendar().createCalendar();
            }
            if(document.querySelector('.calendar-list-year')) {
                window.app.storage.setData('year', this.getAttribute('index'));
                showMonthList();
            }
            ShowDateMethods.showDate();
        }
    }

    window.app = window.app || {};
    window.app.ShowDateMethods = ShowDateMethods;

})(window);
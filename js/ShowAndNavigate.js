(function() {
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
        localStorage.setItem('month', today.getMonth());
        localStorage.setItem('year', today.getFullYear());

        new Calendar().createCalendar();
        ShowDateMethods.showDate();
    }

    ShowDateMethods.setMonthYearInLocalStorage = function(month, year) {
        localStorage.setItem(month, today.getMonth());
        localStorage.setItem(year, today.getFullYear());
    }

    ShowDateMethods.listener = function() {
        var calendar = new Calendar();
        return function() {
            var target = event.target;
            if(target.id == 'button-next') calendar.nextMonthOrYear();
            if(target.id == 'button-previous') calendar.previousMonthOrYear();
        }
    }

    ShowDateMethods.showDate = function() {
        var parent = document.getElementById('day-select');
        // first time adding date or not
        if(parent.children[1].className != 'date-indicator') {
            date = new Date();
            localStorage.setItem('month', date.getMonth());
            localStorage.setItem('year', date.getFullYear());

            var dateString = date.toLocaleString('en', { year: 'numeric', month: 'long' });

            var p = document.createElement('p');
            p.className = 'date-indicator';
            p.innerHTML = dateString;

            parent.insertBefore(p, parent.children[1]);
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

            var p = Methods.createAndSetTag('p', 'date-indicator', '', selectedDateString);
            parent.replaceChild(p, parent.children[1]);
        }
        parent.onclick = function() { if(event.target.className == 'date-indicator') showMonthOrYear.getInstance().getMonthOrYear(); };
    }
// single tone for MonthYearView construnctor
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
            Methods.closePopupWindow();
            if( !document.querySelector('.calendar-list-month') && !document.querySelector('.calendar-list-year') ) showMonthList();
            else if( !document.querySelector('.calendar-list-year')) this.showYearList();
        }

        function showMonthList() {
            var wrapper = document.getElementById('calendar');

            var container = Methods.createAndSetTag('div');

            var ol = Methods.createAndSetTag('ol', 'calendar-list-month');
            var clear = Methods.createAndSetTag('div', 'calendar-clear');

            var getMonth = monthCounter();

            for(var i=0; i< 12; i++) {
                // Methods.createAndSetTag = function(tag, className, container, text)
                var date = new Date();

                var currentLi = Methods.createAndSetTag('li', 'calendar-left-side calendar-list-item calendar-list-item', ol, '<span>' + getMonth() + '</span>', goInMonthYear );
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
            var container = Methods.createAndSetTag('div');

            var ol = Methods.createAndSetTag('ol', 'calendar-list-year');
            var clear = Methods.createAndSetTag('div', 'calendar-clear');

            var getYear = yearCounter();

            for(var i=0; i< 12; i++) {
                var currentYear = getYear();
                var currentLi = Methods.createAndSetTag('li', 'calendar-left-side calendar-list-item calendar-list-item', ol, '<span>' + currentYear + '</span>', goInMonthYear);
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
                localStorage.setItem('month', this.getAttribute('index'));
                new Calendar().createCalendar();
            }
            if(document.querySelector('.calendar-list-year')) {
                localStorage.setItem('year', this.getAttribute('index'));
                showMonthList();
            }
            ShowDateMethods.showDate();
        }
    }

// hier starts first function in document
    ShowDateMethods.showDate();
})();
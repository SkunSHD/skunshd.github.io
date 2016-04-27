(function (window) {
    'use strict';
	
	/*
    // Fast note
    function WindowFastNote() {

        this.addPopupWindow = function () {
            Methods.closePopupWindow();
            // popup container: creating and positioning
            var container = Methods.createAndSetTag('div', 'fast-add-container');
            Methods.createAndSetTag('div', 'pointer-vertical', container);

            Methods.createAndAddButton('button-close-fast', 'x', container, function () {
                Methods.closePopupWindow();
            });

            Methods.createAndAddInput('input', 'input-popup-fast', 'popupFast', container, '4 October; Mein Geburtstag');

            Methods.createAndAddButton('button-popup', 'Save', container, function () {
                saveFastNote();
                Methods.closePopupWindow();
            });

            var coord = event.target.getBoundingClientRect();

            var top = coord.top + document.body.scrollTop;

            container.style.top = top + 45 + 'px';
            container.style.left = coord.left + 'px';

            document.body.appendChild(container);
            document.querySelector('.input-popup-fast').focus();
        }
	*/
	
	/*
        function saveFastNote() {
            var now = window.app.ShowDateMethods.getLocalDateObj();
            var info = document.body.querySelector('.input-popup-fast').value.trim();
            if (!info) return;

            var eventDate = info.split(';')[0];
            var eventText = info.split(';')[1];

            var dateStr = eventDate.split(' ');

            var parseDate = new Date(dateStr[1] + ' ' + dateStr[0] + ', ' + now.getFullYear());

            // right fast note in localStorage whitout participants and description
            window.app.storage.setData(Methods.formatDate(parseDate), eventText + '//');
            //if add in another month -> don't add note in table now
            if (parseDate.getMonth() != now.getMonth()) return;

            var cell = document.getElementById(Methods.formatDate(parseDate));

            // don't change cell color if cell is already has 'today' heighlight
            if (cell.className != 'today') cell.className = 'td-with-note';

            // if cell already has some note -> delete old note
            if (cell.lastChild.id == 'event-container') cell.lastChild.remove();

            var div = document.createElement('div');
            div.id = 'event-container';

            Methods.createAndSetTag('h5', 'small-event-text', div, Methods.textCut(eventText));

            cell.appendChild(div);
        }
    }
	*/
	
	/*
	// Create, edit, del popup windows hier
    function SelectedCell() {
        var table = document.getElementsByTagName('table')[0];
        table.className = 'table';

        table.onclick = function (event) {
            var target = event.target;

            // searching td if it is parent node
            while (target != table) {
                if (target.tagName == 'TD') {
                    if (isAnotherMonthCell(target)) break;
                    Methods.closePopupWindow();
                    Methods.highlight(target);
                    target.lastChild.id == 'event-container' ? addWindowEvent(target, false) : addWindowEvent(target, true);
                    return;
                }
                target = target.parentNode;
            }
        }
		
		
        // Closing any popups if clicked on 'clean' areas
        document.body.addEventListener('click', function (event) {
            if (event.target.id == 'page' || event.target.tagName == 'HEADER' || event.target.tagName == 'NAV')    Methods.closePopupWindow();
        });
		
        //flag == true -> create window for new note || flag == false -> create window for edit note
        function addWindowEvent(target, flag) {
            // create event div
            // Methods.createAndAddInput(input, className, name, place, placeholder, func, typeEventForFunction)
            var addWindow = Methods.createAndAddInput('div', 'add-event-window', '', document.body);

            // create form for all inputs
            var form = Methods.createAndAddInput('form', 'popupform');

            form.name = 'popup';

            //pointer element
            var pointer = Methods.createAndAddInput('div', 'pointer', '', document.body);

            //create and add close element
            Methods.createAndAddButton('close-button', 'x', addWindow, function () {
                Methods.closePopupWindow();
            });

            if (flag) {
                //create and add input elements for new element
                Methods.createAndAddInput('input', 'input-lines', 'event', form, 'Event');
                Methods.createAndAddInput('input', 'input-lines', 'date-indicator', form, 'Date, Month, Year', function () {
                    delLetters(this);
                });

                Methods.createAndAddInput('input', 'input-lines', 'names', form, 'Names of the participants');

                Methods.createAndAddInput('textarea', 'input-description', 'description', form, 'Event description');
                addWindow.appendChild(form);

            } else {
                //edit form
                Methods.createAndAddInput('input', 'input-lines edit', 'eventEdit', form, '', function () {
                    this.readOnly = false;
                }, 'onclick');

                var dateEditInput = Methods.createAndAddInput('input', 'input-lines edit', 'dateEdit', form, '', function () {
                    if (this.value != target.id) this.value = target.id;
                    this.readOnly = false;
                }, 'onclick');
                dateEditInput.onkeyup = function () {
                    delLetters(this)
                };

                Methods.createAndAddButton('participants', 'Participants:', form);
                Methods.createAndAddInput('input', 'input-lines edit', 'namesEdit', form, '', function () {
                    this.readOnly = false;
                }, 'onclick');
                Methods.createAndAddInput('textarea', 'input-description', 'description', form, 'Event description');

                var arrInfo = window.app.storage.getData(target.id).split('/');

                if (arrInfo[0] != 'undefined') form.eventEdit.value = arrInfo[0];
                form.dateEdit.value = Methods.parseDate(target.id);
                if (arrInfo[1] != 'undefined') form.namesEdit.value = arrInfo[1];
                if (arrInfo[2] != 'undefined') form.description.value = arrInfo[2];

                addWindow.appendChild(form);
            }

            Methods.createAndAddButton('add-button', 'Ok', addWindow, saveForm);

            Methods.createAndAddButton('del-button', 'Delete', addWindow, function () {
                localStorage.removeItem(target.id);
                if (target.lastChild.tagName == 'DIV') {
                    target.removeChild(target.lastChild);
                    target.classList.remove('td-with-note');
                }
                Methods.closePopupWindow();
            });

            // take coordinates
            var coord = target.getBoundingClientRect();
            var rightSide = true;

            // main window positioning
            var top = coord.top + document.body.scrollTop - 20;
            if (coord.top + document.body.scrollTop + addWindow.offsetHeight > document.body.clientHeight) {

                top = document.body.clientHeight - addWindow.offsetHeight - 10;
            }
            // 21- image width, 10 - margin
            var left = coord.left + target.offsetWidth + pointer.offsetWidth - 12;
            if (document.body.clientWidth < coord.left + target.offsetWidth + addWindow.offsetWidth + 21 + 10) {
                left = coord.left - addWindow.offsetWidth - 10;
                rightSide = false;
            }
            //pointer element positioning
            var topPointer = coord.top + document.body.scrollTop;
            var leftPointer;

            if (rightSide) {
                leftPointer = coord.left + target.offsetWidth - 10;
                pointer.style.background = 'url(img/sp-bg.png) no-repeat';
                pointer.style.backgroundPosition = '-121px -18px';
            } else {
                pointer.style.background = 'url(img/sp-bg.png) no-repeat';
                pointer.style.backgroundPosition = '-140px -18px';
                leftPointer = coord.left - 12;
            }
            //adding position for main window
            addWindow.style.top = top + 'px';
            addWindow.style.left = left + 'px';

            //adding position for pointer
            pointer.style.top = topPointer + 'px';
            pointer.style.left = leftPointer + 'px';

            // focus on first line
            if (document.getElementsByName('event')[0]) document.getElementsByName('event')[0].focus();
        }
		

        function delLetters(field) {
            var value = field.value;
            var rep = /[-;":'a-zA-Z�-��-�]/;
            while (rep.test(value)) {
                value = value.replace(rep, '');
                field.value = value;
            }
        }

        function createAndSetTag(tag, text, container, className) {
            var elem = document.createElement(tag);
            if (className)  elem.className = className;
            elem.textContent = text;
            container.appendChild(elem);
        }

        function saveForm() {
            var form = document.forms.popup;
            var formObj = getFormData(form);

            window.app.storage.setData(formObj.date, formObj.event + '/' + formObj.names + '/' + formObj.description);

            setFormDataInTable(formObj);
        }

        function getFormData() {
            var form = document.forms.popup;
            //set values
            var date, event, names, description = '';

            if (form.elements[0].value.trim()) {
                event = form.elements[0].value;
            } else {
                event = 'Event';
            }

            // if date input empty -> fill with date from cell id
            if (form.elements[1].value.trim()) {
                date = Methods.checkSimbolsInDate(form.elements[1].value);
            } else {
                date = document.querySelector('.highlight').id;
            }
            // 'first case' means edit; 'default' means first time save
            switch (form.elements[2].className) {
                case 'participants':
                    if (form.elements[3].value) names = form.elements[3].value;
                    if (form.elements[4].value) description = form.elements[4].value;
                    break;
                default:
                    if (form.elements[2].value) names = form.elements[3].value;
                    if (form.elements[3].value) description = form.elements[3].value;
                    break;
            }

            return { event: event, date: date, names: names, description: description };
        }

        // if happend click on day from another month -> showing that month
        function isAnotherMonthCell(target) {
            var calendar = new Calendar()
            if (target.classList.contains('pre-post')) {
                if (target.id < 7) calendar.nextMonthOrYear();
                else calendar.previousMonthOrYear();
                return true;
            } else {
                return false;
            }
        }

        function setFormDataInTable(formObj) {
            // do not add if note was add in another month
            var clickedCell = document.querySelector('.highlight');

            var div = document.createElement('div');
            div.id = 'event-container';

            Methods.createAndSetTag('h5', 'small-event-text', div, Methods.textCut(formObj.event));
            Methods.createAndSetTag('p', 'event-names', div, Methods.textCut(formObj.names));
            Methods.createAndSetTag('p', 'event-description', div, Methods.textCut(formObj.description));

            // if wrote date in form == date from clicked cell
            if (Methods.formatDate(window.app.ShowDateMethods.getLocalDateObj()).substring(3, 10) == formObj.date.substring(3, 10)) {
                var targetContainer = document.getElementById(formObj.date);
                targetContainer.className = 'td-with-note';
                //if in cell already has some note
                if (targetContainer.lastChild.id == 'event-container') targetContainer.replaceChild(div, targetContainer.lastChild);
                else targetContainer.appendChild(div);
            }

            // delete cell in case date editing
            if (formObj.date != clickedCell.id) {
                localStorage.removeItem(clickedCell.id);
                clickedCell.lastChild.remove();
                clickedCell.className = '';
            }

            Methods.closePopupWindow();
        }
    }
	 <!-- SelectedCell -->
	*/
   

	// Static methods
    function Methods() {
    }

    Methods.textCut = function (text) {
        if (!text || text == 'undefined') return '';

        text = text.trim();
        if (text.length > 50 && text.indexOf(' ') < 0) {
            text = text.substring(0, 20) + '...';
        } else if (text.length > 57) {
            text = text.substring(0, 20) + '...';
        }
        return text;
    };

    Methods.createAndAddInput = function (input, className, name, place, placeholder, func, typeEventForFunction) {
        var input = document.createElement(input);
        input.className = className;
        if (className == 'input-lines edit') input.readOnly = true;
        input.name = name;
        if (placeholder) input.placeholder = placeholder;
        if (func) {
            if (typeEventForFunction == 'onclick') input.onclick = func;
            else input.onkeyup = func;
        }

        if (place) place.appendChild(input);
        return input;
    };

    Methods.createAndSetTag = function (tag, className, container, text, func) {
        var elem = document.createElement(tag);
        if (className) elem.className = className;
        if (text) {
            if (text[0] == '<' && text[text.length - 1] == '>') elem.innerHTML = text;
            else elem.textContent = text;
        }
        if (container) container.appendChild(elem);
        if (func) elem.onclick = func;

        return elem;
    };

// check date and correct ("3,3,16" || 19 March 2016 -> "03.03.2016")
    Methods.checkSimbolsInDate = function (str) {
        // date where month is word parse hier
        if (str.match(/[a-zA-Z]/)) {
            var eventDate, eventMonth, eventYear = '';
            var fullDate = str.trim().split(' ');

            eventDate = fullDate[0];
            eventMonth = fullDate[1];
            eventYear = fullDate[2];

            //Create from string 'March 18, 2016' new date obj
            var dateObj = new Date(eventMonth + ' ' + eventDate + ', ' + eventYear);

            str = Methods.formatDate(dateObj);

            return str;
        }
        var arr, dd, mm, yy = '';

        if (str.indexOf('.') > 0) {
            arr = str.split('.');
        }
        if (str.indexOf(',') > 0) {
            arr = str.split(',');
        }

        var dd = parseInt(arr[0]);
        if (dd < 10) dd = '0' + dd;

        var mm = parseInt(arr[1]);
        if (mm < 10) mm = '0' + mm;

        var yy = parseInt(arr[2]);
        if (yy < 10) yy = '200' + yy;
        if (yy > 10 && yy < 100) yy = '20' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    Methods.createAndAddButton = function (className, value, place, func) {
        var button = document.createElement('input');
        button.className = className;
        button.type = 'button';
        button.value = value;
        if (func) button.onclick = func;

        place.appendChild(button);
    }

    Methods.closePopupWindow = function () {
        while (document.body.lastChild.className) {
            var takedClassName = document.body.lastChild.className;
            if (takedClassName == 'pointer') {
                document.body.removeChild(document.body.lastChild);
                document.body.removeChild(document.body.lastChild);
            }
            if (takedClassName == 'search-popup' || takedClassName == 'fast-add-container') {
                document.body.removeChild(document.body.lastChild);
            }
        }
        if (document.querySelector('.highlight')) {
            document.querySelector('.highlight').classList.remove('highlight');
        }
    };

    Methods.formatDate = function (obj) {
        return (obj.toLocaleString("ru", {year: "numeric", month: "numeric", day: "numeric"}) );
    };

// take 18.03.2016, return 18 March 2016
    Methods.parseDate = function (str) {
        var arr = str.split('.');
        var day = parseInt(arr[0]);
        var month = parseInt(arr[1]);
        var year = parseInt(arr[2]);

        var newDate = new Date(year, month - 1, day);

        return newDate.getDate() + ' ' + newDate.toLocaleString('en', {month: 'long'}) + ' ' + newDate.getFullYear();
    };

    Methods.highlight = function (target) {
        if (document.querySelector('.highlight')) {
            document.querySelector('.highlight').classList.remove('highlight');
        } else {
            target.classList.add('highlight');
        }
    };

    window.app = window.app || {};
    // window.app.Calendar = Calendar;
    window.app.Methods = Methods;
    // window.app.WindowFastNote = WindowFastNote;

})(window);
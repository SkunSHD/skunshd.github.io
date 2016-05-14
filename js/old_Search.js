(function (window) {
    'use strict';

    function Search() {

        var searchInput = document.querySelector('.find');

        this.start = function() {
            searchInput.onclick = function() {
                window.app.Methods.closePopupWindow();
                createSearchPopup(this);
                // when in input already has text
                if(this.value.trim().length > 0) {
                    findInLocalStorage();
                } else {
                    addItemsInPopup(getAllFromLocalStorage());
                }
            }

            searchInput.onkeyup = function() {
                clearAllItems();
                if( this.value.trim().length > 0 ) {
                    findInLocalStorage();
                } else {
                    //findInLocalStorage();
                    addItemsInPopup(getAllFromLocalStorage());
                }
            }
        }

        function findInLocalStorage() {
            clearAllItems();

            var inputText = searchInput.value.trim().toLowerCase();

            var arrElemFromLocalStorage = getAllFromLocalStorage();
            var arrSearchResult=[];

            for(var i=0; i< arrElemFromLocalStorage.length; i++) {
                if(arrElemFromLocalStorage[i].date.toLowerCase().indexOf(inputText) != -1) arrSearchResult.push(arrElemFromLocalStorage[i]);
                if(arrElemFromLocalStorage[i].title.toLowerCase().indexOf(inputText) != -1) arrSearchResult.push(arrElemFromLocalStorage[i]);
                if(arrElemFromLocalStorage[i].id.toLowerCase().indexOf(inputText) != -1) arrSearchResult.push(arrElemFromLocalStorage[i]);
            }
            addItemsInPopup(arrSearchResult);
        }

        // get all notes with date
        function getAllFromLocalStorage() {
            var arr = [];

            for(var i = 0; i <= localStorage.length; i++) {
                if(localStorage.key(i) != null && localStorage.key(i).length == 10 && localStorage.key(i).indexOf('.') == 2 && localStorage.key(i).indexOf('.', 3) == 5) {

                    arr.push({
                        id: localStorage.key(i),
                        title: localStorage[localStorage.key(i)],
                        date: window.app.Methods.parseDate(localStorage.key(i))
                    });
                }
            }
            return arr;
        }

        // put all notes in popup window
        function addItemsInPopup(arr) {
            var arrElemFromLocalStorage = arr;

            var popupWindow = document.getElementsByClassName('search-popup-wrapper')[0];
            for(var i=0; i<arrElemFromLocalStorage.length; i++) {
                var item = createOneItem(arrElemFromLocalStorage[i]);
                popupWindow.appendChild(item);
            }

            if(popupWindow.offsetHeight < 375) popupWindow.style.overflowY = 'hidden';
            else popupWindow.style.overflowY = 'scroll';
        }

        function createOneItem(note) {
            var container = window.app.Methods.createAndSetTag('div', 'search-result__container');

            container.id = note.id;
            container.onclick = goToDate;
            container.onmouseover = highlightSearch;

            var item = window.app.Methods.createAndSetTag('div', 'search-result__item', container);
            window.app.Methods.createAndSetTag('div', 'search-result__line', container);

            window.app.Methods.createAndSetTag('div', 'search-result__item-title', item, window.app.Methods.textCut(note.title.split('/')[0]) );
            window.app.Methods.createAndSetTag('div', 'search-result__item-date', item, note.date);

            return container;
        }

        // create and show popup window
        function createSearchPopup(event){
            var coords = event.getBoundingClientRect();

            var container = window.app.Methods.createAndSetTag('div', 'search-popup');
            window.app.Methods.createAndSetTag('div', 'search-pointer', container);

            window.app.Methods.createAndSetTag('div', 'search-popup-wrapper', container);

            var top = coords.top + event.offsetHeight + document.body.scrollTop + 15;
            var left = coords.left;

            container.style.top = top + 'px';
            container.style.left = left + 'px';

            document.body.appendChild(container);
        }

        function AddSelect() {
            if(this.className == 'search-result__container') {
                document.getElementById(this.id).classList.add('highlight');
            }
        }

        function highlightSearch() {
            if (document.querySelector('.highlight')) {
                document.querySelector('.highlight').classList.remove('highlight');
            }
            document.getElementById(this.id).classList.add('highlight');
        }

        function goToDate() {
            var strGoToDate = this.id;

            var goToDate = window.app.ShowDateMethods.parseStrInDate(strGoToDate);

            window.app.storage.setData('month', goToDate.getMonth());
            window.app.storage.setData('year', goToDate.getFullYear());

            new window.app.Calendar().createCalendar();
            window.app.ShowDateMethods.showDate();

            // highlight selected in search popup cell
            var arr = document.querySelectorAll('.td-with-note, .today');

            for(var i = 0; i<arr.length; i++) if(arr[i].id == this.id) {
                arr[i].classList.add('highlight');
                break;
            }
        }

        function clearAllItems() {
            var searchItemsContainer = document.getElementsByClassName('search-popup-wrapper')[0];
            while(searchItemsContainer.firstChild) searchItemsContainer.firstChild.remove();
        }

    }

    window.app = window.app || {};
    window.app.Search = Search;
})(window);
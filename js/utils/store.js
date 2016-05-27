<<<<<<< HEAD
(function (window) {	'use strict';    /**     * storage - {object literal}     *     * @description     *  Manage data in locale storage     *     * @type {{setData: setData, getData: getData, deleteData: deleteData, deleteAllData: deleteAllData}}     */	var storage = {        setData: function (key, value) {            if (!key || !value) {                return;            }            localStorage.setItem(key, value);        },        getData: function (key) {            if (!key) {                return;            }			return localStorage.getItem(key);        },
=======
(function (window) {	'use strict';    /**     * storage - {object literal}     *     * @description     *  Manage data in locale storage     *     * @type {{setData: setData, getData: getData, deleteData: deleteData, deleteAllData: deleteAllData}}     */	var storage = {		init: function () {			var lsId = new Date();			lsId.setDate(1);			lsId.setHours(0, 0, 0, 0);			localStorage.setItem('current-month', lsId.getTime());		},		        setData: function (key, value) {            if (!key || !value) {                return;            }            localStorage.setItem(key, value);        },        getData: function (key) {            if (!key) {                return;            }			return localStorage.getItem(key);        },
>>>>>>> develop
		
		getAllData: function() {
			var result = [];
			for(var i in localStorage) {				var obj = {					key: i,					value: localStorage[i]				};				result.push(obj);
			}
			return result;
		},        deleteByKey: function (key) {            localStorage.removeItem(key);        },        deleteAll: function () {            localStorage.clear();        }    };	window.app = window.app || {};	window.app.storage = storage;})(window);

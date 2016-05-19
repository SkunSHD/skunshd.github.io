(function (window) {	'use strict';    /**     * storage - {object literal}     *     * @description     *  Manage data in locale storage     *     * @type {{setData: setData, getData: getData, deleteData: deleteData, deleteAllData: deleteAllData}}     */	var storage = {        setData: function (key, value) {            if (!key || !value) {                return;            }            localStorage.setItem(key, value);        },        getData: function (key) {            if (!key) {                return;            }			return localStorage.getItem(key);        },
		
		getAllData: function() {
			var result = [];
			for(var i in localStorage) {
				if(!new Date(i)) continue;
				var date = new Date(i);
				
				var str = localStorage[i];
				var obj = JSON.parse(str);
				
				result.push( {key: date, value: obj} );
			}
			
			return result;
		},        deleteByKey: function (key) {            localStorage.removeItem(key);        },        deleteAll: function () {            localStorage.clear();        }    };	window.app = window.app || {};	window.app.storage = storage;})(window);

// This custom JavaScript file provides some functionality not available from the Jekyll theme
// IE compatible fetch command
var getJSON = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};

var addCSS = function (url) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.id = cssId;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	link.media = 'all';
	head.appendChild(link);
};

var updateDates = function () {
	// Get the current page
	var data_attributes = document.querySelectorAll('[data-updated]');
	if (data_attributes && data_attributes.length > 0) {
		// For each one we have to call the Github API to get the latest commit
		data_attributes.forEach(function (span) {
			// Find the first instance appearing in our commits
			var file = span.dataset.updated;
			if (file) {
				var folder = file.split('_')[0];
				var file = file.replace(folder + '_', '') + '.csv';
				getJSON('https://api.github.com/repos/librarieswest/opendata/commits?path=' + folder + '/' + file,
					function (err, data) {
						if (data && data.length && data.length > 0) {
							var latest = data[0];
							var date = new Date(latest.commit.committer.date);
							txt = document.createTextNode(date.toLocaleDateString("en-GB"));
							span.appendChild(txt);
						}
					});
			}
		});
	}
};

var createMemberMap = function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZHhyb3dlIiwiYSI6ImNqMnI5Y2p2cDAwMHQzMm11cjZlOGQ2b2oifQ.uxhJoz3QCO6cARRQ8uKdzw';

	const map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v9'
	});

	map.addControl(new mapboxgl.FullscreenControl());

};

document.addEventListener("DOMContentLoaded", function () {

	// Get the current page
	var path = window.location.pathname;

	if (path === '/data/') {
		updateDates();
	}
	if (path === '/map/') {
		addCSS('https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/0.46.0/mapbox-gl.css');
		addCSS('/assets/css/lw-custom.css');
		createMemberMap();
	}
});
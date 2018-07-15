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
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
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


	// First get LSOA JSON
	getJSON('/downloads/LibrariesWestLSOAsWithPop.geojson',
		function (err, lsoa_data) {
			if (lsoa_data) {
				// Then we get our latest members CSV
				Papa.parse('https://raw.githubusercontent.com/LibrariesWest/opendata/master/membership/members.csv', {
					download: true,
					complete: function (members) {
						// First do our processing on the geojson
						let member_data = members.data;
						for (var i = 0; i < lsoa_data.features.length; i++) {
							lsoa_data.features[i].properties.users = {};
							// For each feature (LSOA) we need to add all the libraries
							var population = lsoa_data.features[i].properties['LSOAPopulation_All Ages'];
							var user_count = 0;
							for (var y = 0; y < member_data.length; y++) {
								if (member_data[y][11] === lsoa_data.features[i].properties.lsoa11cd) {
									var users = member_data[y][12];
									if (users !== '*') user_count += parseInt(users);
									lsoa_data.features[i].properties.users[member_data[y][1]] = member_data[y][1];
								}
							}
							lsoa_data.features[i].properties.population_percentage = Math.round(user_count / population * 100);
							lsoa_data.features[i].properties.opacity = Math.round((user_count / population), 1);
						}
						// Now add the map
						mapboxgl.accessToken = 'pk.eyJ1IjoiZHhyb3dlIiwiYSI6ImNqMnI5Y2p2cDAwMHQzMm11cjZlOGQ2b2oifQ.uxhJoz3QCO6cARRQ8uKdzw';
						const map = new mapboxgl.Map({
							container: "map",
							style: 'mapbox://styles/mapbox/light-v9',
							center: [-3.00, 51.13],
							zoom: 12
						});
						map.addControl(new mapboxgl.FullscreenControl());
						var nav = new mapboxgl.NavigationControl();
						map.addControl(nav, 'top-left');
						map.on('load', function () {
							['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
							map.addSource('lsoas', { type: 'geojson', data: lsoa_data });
							map.addLayer({
								"id": "lsoas",
								"type": "fill",
								"source": "lsoas",
								'paint': {
									'fill-color': [
										'interpolate',
										['linear'],
										['get', 'population_percentage'],
										0, '#FFEDA0',
										4, '#FED976',
										8, '#FEB24C',
										12, '#FD8D3C',
										18, '#FC4E2A',
										22, '#E31A1C',
										26, '#BD0026',
										30, '#800026'
									],
									'fill-opacity': 0.6
								}
							});
							// Create a popup, but don't add it to the map yet.
							var popup = new mapboxgl.Popup({
								closeButton: false,
								closeOnClick: false
							});
							map.on('mouseenter', 'lsoas', function (e) {
								// Change the cursor style as a UI indicator.
								map.getCanvas().style.cursor = 'pointer';

								var coordinates = e.features[0].geometry.coordinates[0][0].slice();
								var description = '<strong>Library users <em>' + e.features[0].properties.population_percentage + '</strong> percent of population</em>';

								popup.setLngLat(coordinates)
									.setHTML(description)
									.addTo(map);
							});

							map.on('mouseleave', 'lsoas', function () {
								map.getCanvas().style.cursor = '';
								popup.remove();
							});

						});
					}
				});
			}
		});
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
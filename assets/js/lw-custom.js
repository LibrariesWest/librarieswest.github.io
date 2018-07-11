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
}

document.addEventListener("DOMContentLoaded", function () {
	// Get the current page
	var path = window.location.pathname;
	var page = path.split("/").pop().pop();

	if (page === 'data') updateDates();
});
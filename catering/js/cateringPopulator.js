function EventProperties(imageLink, videoLink, eventLink, date, title, description) {
	this.imageLink = imageLink;
	this.videoLink = videoLink;
	this.eventLink = eventLink;
	this.date = date;
	this.title = title;
	this.description = description;
}

function populateEventDataFromFile(eventId) {
	console.log('called function populate');
}

$(document).ready(function() {
    populateEventDataFromFile('event1');
    populateEventDataFromFile('event2');
    populateEventDataFromFile('event3');
});
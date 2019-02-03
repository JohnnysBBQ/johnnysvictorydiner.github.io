function EventProperties(imageLink, videoLink, eventLink, date, title, description) {
	this.imageLink = imageLink;
	this.videoLink = videoLink;
	this.eventLink = eventLink;
	this.date = date;
	this.title = title;
	this.description = description;
}

function getEventProperties(eventId) {
    var fileData = '';
    $.ajax({
        url: '../catering/' + eventId + '.txt',
        type: "get",
        async: false,
        success: function(data) {
            fileData = data;
        },
        error: function() {
            console.log('Could not load event property data');
        }
    });
	
    var fileLines = fileData.split('\n');
    return new EventProperties(fileLines[0].split('~')[1], fileLines[1].split('~')[1], fileLines[2].split('~')[1], fileLines[3].split('~')[1], fileLines[4].split('~')[1], fileLines[5].split('~')[1]);
}

function getEventHtmlTemplate(templateUrl) {
    var htmlTemplate = '';
    $.ajax({
        url: templateUrl,
        type: "get",
        async: false,
        success: function(data) {
            htmlTemplate = data.replace('\n', '');
        },
        error: function() {
            console.log('Could not load event data');
        }
    });
	
    return htmlTemplate;
}

function populateEventDataFromFile(eventId) {
	console.log('called function populate');
}

$(document).ready(function() {
    populateEventDataFromFile('event1');
    populateEventDataFromFile('event2');
    populateEventDataFromFile('event3');
});
class EventProperties {
	constructor(imageLink, videoLink, eventLink, date, title, description) {
		this.imageLink = imageLink;
		this.videoLink = videoLink;
		this.eventLink = eventLink;
		this.date = date;
		this.title = title;
		this.description = description;
	}
}

function populateEventDataFromFile(eventId) {
	var eventProperties = getEventProperties(eventId);
	var templateUrl = eventProperties.imageLink === null ? "../catering/js/cateringVideoTemplate.txt" : "../catering/js/cateringImageTemplate.txt";
    var htmlTemplate = getHtmlTemplate(templateUrl);
    var generatedHtml = generateHtmlFromEventProperties(eventProperties, htmlTemplate);
    
	console.log('-' + eventProperties);
	console.log('--' + templateUrl);
	console.log('---' + htmlTemplate);
	console.log('----' + generatedHtml);
	
	$('#' + eventId).html(generatedHtml);
}

function getEventProperties(eventId) {
    fileData = '';
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
	
	fileLines = fileData.split('\n');
	return new EventProperties(fileLines[0].split('=')[1], fileLines[1].split('=')[1], fileLines[2].split('=')[1], fileLines[3].split('=')[1], fileLines[4].split('=')[1], fileLines[5].split('=')[1]);
}

function getHtmlTemplate(templateUrl) {
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

function generateHtmlFromEventProperties(eventProperties, htmlTemplate) {
	return htmlTemplate.replace('{imageLink}', eventProperties.imageLink)
		.replace('{videoLink}', eventProperties.videoLink)
		.replace('{eventLink}', eventProperties.eventLink === null ? '' : eventProperties.eventLink)
		.replace('{date}', eventProperties.date === null ? '' : eventProperties.date)
		.replace('{title}', eventProperties.title === null ? '' : eventProperties.title)
		.replace('{description}', eventProperties.description === null ? '' : eventProperties.description);
}

$(document).ready(function() {
    populateEventDataFromFile('event1');
    populateEventDataFromFile('event2');
    populateEventDataFromFile('event3');
});
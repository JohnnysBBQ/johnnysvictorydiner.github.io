function populateEventDataFromFile(eventId) {
    var eventPropertiesFileLines = getEventProperties(eventId);
	
	var imageLink = eventPropertiesFileLines[0].split('~')[1];
	var videoLink = eventPropertiesFileLines[1].split('~')[1];
	var eventLink = eventPropertiesFileLines[2].split('~')[1];
	var date = eventPropertiesFileLines[3].split('~')[1];
	var title = eventPropertiesFileLines[4].split('~')[1];
	var description = eventPropertiesFileLines[5].split('~')[1];
	
    var templateUrl = imageLink ? "../catering/js/cateringImageTemplate.txt" : "../catering/js/cateringVideoTemplate.txt";
    var htmlTemplate = getHtmlTemplate(templateUrl);
	
    var generatedHtml =  htmlTemplate.replace('{imageLink}', imageLink)
        .replace('{videoLink}', videoLink)
        .replace('{eventLink}', eventLink ? eventLink : '')
        .replace('{date}', date ? date : '')
        .replace('{title}', title ? title : '')
        .replace('{description}', description ?  description : '');
	
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

$(document).ready(function() {
    populateEventDataFromFile('event1');
    populateEventDataFromFile('event2');
    populateEventDataFromFile('event3');
});
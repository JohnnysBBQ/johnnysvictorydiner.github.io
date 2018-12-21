function populateMenuDataFromFile(menuType) {
    jQuery.get('../menu/' + menuType + 'Column1' + '.txt', function(data) {
		var column1GeneratedHtml = generateHtmlFromFileData(data)
		console.log(column1GeneratedHtml)
        $(menuType + 'Column1').html(column1GeneratedHtml);
    });

    jQuery.get('../menu/' + menuType + 'Column2' + '.txt', function(data) {
        var column2GeneratedHtml = generateHtmlFromFileData(data)
		console.log(column2GeneratedHtml)
        $(menuType + 'Column2').html(column2GeneratedHtml);
    });
}

function getHtmlTemplate() {
	htmlTemplate = '';
    jQuery.get('../menu/js/genericMenuTemplate.html', function(data) {
        htmlTemplate = data.replace('\n', '');
    });
	
	return htmlTemplate;
}

function generateHtmlFromFileData(fileData) {
    var fileLines = fileData.split('\n');

    var generatedHtml = '';
    for (line in fileLines) {
        var lineData = line.split(':');
        generatedHtml += getHtmlTemplate()
            .replace('{name}', lineData[0])
            .replace('{price}', lineData[1])
            .replace('{description}', lineData[2]);
    }

    return generatedHtml;
}

$(document).ready(function() {
    populateMenuDataFromFile('breakfast');
    populateMenuDataFromFile('lunch');
    populateMenuDataFromFile('bbq');
    populateMenuDataFromFile('beverages');
});
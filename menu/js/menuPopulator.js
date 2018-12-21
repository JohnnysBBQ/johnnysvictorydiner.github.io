function populateMenuDataFromFile(menuType) {
    jQuery.get('../menu/' + menuType + 'Column1' + '.txt', function(data) {
		var column1GeneratedHtml = generateHtmlFromFileData(data)
		console.log(menuType + 'Column1' + " -- column1data: " + column1GeneratedHtml)
        $(menuType + 'Column1').html(column1GeneratedHtml);
    });

    jQuery.get('../menu/' + menuType + 'Column2' + '.txt', function(data) {
        var column2GeneratedHtml = generateHtmlFromFileData(data)
		console.log(menuType + 'Column2' + " -- column2data: " + column2GeneratedHtml)
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
	
	console.log("fileLines: " + fileLines);

    var generatedHtml = '';
    for (index in fileLines) {
		console.log("line: " + fileLines[index]);
        var lineData = lineData[index].split(':');
		console.log("lineData[0]: " + lineData[0]);
		console.log("lineData[1]: " + lineData[1]);
		console.log("lineData[2]: " + lineData[2]);
        generatedHtml += getHtmlTemplate()
            .replace('{name}', lineData[0])
            .replace('{price}', lineData[1])
            .replace('{description}', lineData[2]);
    }
	
	
	console.log("generatedHtml: " + generatedHtml);

    return generatedHtml;
}

$(document).ready(function() {
    populateMenuDataFromFile('breakfast');
    populateMenuDataFromFile('lunch');
    populateMenuDataFromFile('bbq');
    populateMenuDataFromFile('beverages');
});
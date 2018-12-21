function populateMenuDataFromFile(menuType) {
    jQuery.get('../menu/' + menuType + 'Column1' + '.txt', function(data) {
	    console.log("column1" + menuType + " " + data);
		var column1GeneratedHtml = generateHtmlFromFileData(data)
        $(menuType + 'Column1').html(column1GeneratedHtml);
    });

    jQuery.get('../menu/' + menuType + 'Column2' + '.txt', function(data) {
		console.log("column2" + menuType + " " + data);
        var column2GeneratedHtml = generateHtmlFromFileData(data)
        $(menuType + 'Column2').html(column2GeneratedHtml);
    });
}

function getHtmlTemplate() {
    jQuery.get('../menu/js/genericMenuTemplate.html', function(data) {
        return data.replace('\n', '');
    });
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
	console.log("loading all items...");
    populateMenuDataFromFile('breakfast');
    populateMenuDataFromFile('lunch');
    populateMenuDataFromFile('bbq');
    populateMenuDataFromFile('beverages');
});
function populateMenuDataFromFile(menuType) {
    jQuery.get('../menu/' + menuType + 'Column1' + '.txt', function(data) {
		var column1GeneratedHtml = generateHtmlFromFileData(data)
        $(menuType + 'Column1').html(column1GeneratedHtml);
    });

    jQuery.get('../menu/' + menuType + 'Column2' + '.txt', function(data) {
        var column2GeneratedHtml = generateHtmlFromFileData(data)
        $(menuType + 'Column2').html(column2GeneratedHtml);
    });
}

function getHtmlTemplate() {
	htmlTemplate = '';
	$.ajax({
    url : '../menu/js/genericMenuTemplate.txt',
    type : "get",
    async: false,
    success : function(data) {
		console.log("data" + data)
        htmlTemplate = data.replace('\n', '');
    },
    error: function() {
       console.log('Could not load menu data');
    }
 });
	
		console.log("htmlTemplate" + htmlTemplate)
	return htmlTemplate;
}

function generateHtmlFromFileData(fileData) {
    var fileLines = fileData.split('\n');

    var generatedHtml = '';
    for (index in fileLines) {
        var lineData = fileLines[index].split(':');
        generatedHtml = generatedHtml.concat(getHtmlTemplate()
            .replace('{name}', lineData[0])
            .replace('{price}', lineData[1])
            .replace('{description}', lineData[2])
		);
			console.log("generatedHtml in loop: " + generatedHtml);
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
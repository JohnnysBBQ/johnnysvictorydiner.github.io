$(document).ready(function() {
	$.getJSON('https://www.instagram.com/web/search/topsearch/?query=johnny%27svictorydiner', function(data) {
		$("#instagramFollowerCount").text(data.users[0].user.follower_count);
	});
});
// min-gallery

$(document).ready( function() {

	$('#thumbs').delegate('img','click', function(){
    $('#big-img').attr('src',$(this).attr('src').replace('thumbs','img'));    
	});

});
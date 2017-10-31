$('.table > tbody > tr.clickable').click(function() {
	document.location = document.location+'/'+$(this).data('href');
});
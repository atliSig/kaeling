$('.table > tbody > tr.clickable').click(function() {
	document.location = '/'+$(this).data('type')+'/'+$(this).data('href');
});
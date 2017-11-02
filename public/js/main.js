$('.table > tbody > tr.clickable').click(function() {
	document.location = '/'+$(this).data('type')+'/'+$(this).data('href')+'/';
});

$('#change-form').click(function(){
	var attributes = {};
	var count = $('#nAttributes').val();
	for(var i=1; i<=count; i++){
		attributes['at'+i] = {};
	}
	$('.isOk').each(function(){
		attributes[$(this).data('key')].isOk = $(this).is(":checked");
	});
	$('.isFixed').each(function(){
		attributes[$(this).data('key')].isFixed = $(this).is(":checked");
	});
	$('.comment').each(function(){
		attributes[$(this).data('key')].comment = $(this).val();
	});
	$('input[name=attributes]').val(JSON.stringify(attributes));
});
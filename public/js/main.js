$('.table > tbody > tr.clickable').click(function() {
	document.location = '/'+$(this).data('type')+'/'+$(this).data('href')+'/';
});

$('#change-form').click(function(){
	var attributes = {};
	var measurements = {};
	var count = $('#nAttributes').val();
	for(var i=1; i<=count; i++){
		attributes['at'+i] = {};
	}
	var count = $('#nMeasurements').val();
	for(var i=1; i<=count; i++){
		measurements['m'+i] = {};
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
	$('.measurement').each(function(){
		measurements[$(this).data('key')] = {
			'identifier': $(this).data('identifier'),
			'value': $(this).val(),
			'unit': $(this).data('unit')
		}
	});

	$('input[name=attributes]').val(JSON.stringify(attributes));
	$('input[name=measurements]').val(JSON.stringify(measurements));
});

$('#new-job').click(function(){
	$('#job-modal').modal('toggle');
})

$('.overview-row').click(function(){
	var link = $(this).data('href');
	$(this).toggleClass('active');
	$(this).closest('tr').next('tr').toggle();
})

$('.overview-row .row-button').click(function(e){
	e.stopPropagation();
});


//Notification shower
if($('#notification')){
	$( "#notification" ).animate(
		{ left: "20px"},
		{ duration: 500}
	);
	setTimeout(function () {
		$( "#notification" ).animate(
			{ left: "-300px"}, 
			{ duration: 500}
		);
		setTimeout(function(){
			$('#notification').remove();
		}, 1000);
	}, 5000);
};
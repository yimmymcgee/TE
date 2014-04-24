$(function() {

	// capture all enter and do nothing
	$('#email').keypress(function(e) {
		if(e.which == 13) {
			$('#email').trigger('focusout');
			return false;
		}
	});

	// attach jquery plugin to validate address
	$('#email').mailgun_validator({
		api_key: 'pubkey-15vy7aovoudo4vo8ywia-qbrf6mqfxx5',
		in_progress: validation_in_progress,
		success: validation_success,
		error: validation_error,
	});

});

var hasInput = false;

// while the lookup is performing
function validation_in_progress() {
	hasInput = true;
	//$('#status').html("<img src='loading.gif' height='16'/>");
}

// if email successfull validated
function validation_success(data) {
	$('#emailValidity').html(get_suggestion_str(data['is_valid'], data['did_you_mean']));
}

// if email is invalid
function validation_error(error_message) {
	//$('#status').html(error_message);
}

// suggest a valid email
function get_suggestion_str(is_valid, alternate) {
	if (alternate) {
		validEmail = true;
		return "<aside><i class='fa  fa-check-circle weak'></i><span>Did you mean <em>"+alternate+"</em></span></aside>";
	} else if (is_valid) {
		validEmail = true;
		return "<i class='fa  fa-check-circle good'></i>";
	} else {
		validEmail = false;
		return "<i class='fa  fa-exclamation-circle bad'></i>";
	}
}
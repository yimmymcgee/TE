var validEmail = false;
var validPassword = false;

jQuery(function( $ ){

	$("input").keypress(function(e) {
		if(e.which == 13) {
			var inputs = $(this).closest('form').find(':input');
			inputs.eq( inputs.index(this)+ 1 ).focus();
			return false;
		}
	});
	
	focusControl(1,0);
				
	$( "#nav1" ).click(function() {
		focusControl(1,"slow");
		return false;
	});
	$( "#nav2, #input1" ).click(function() {
		if(validPassword && validEmail) {
			focusControl(2,"slow");
		} else {
			if ($("#email").val() == "") {
				$("#emailValidity").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			}
			if ($("#password").val() == "") {
				$("#passwordStrength").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			}
		}
		return false;
	});
	$( "#nav3, #input2" ).click(function() {
		if ($("#firstname").val() != "" && $("#lastname").val() != "") {
			focusControl(3,"slow");
		} else {
			if ($("#firstname").val() == "") {
				$("#firstValidity").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			} else {
				$("#firstValidity").html("");
			}
			if ($("#lastname").val() == "") {
				$("#lastValidity").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			} else {
				$("#lastValidity").html("");
			}
		}
		return false;
	});

	//submit
	$("#input3").click(function() {
		if ($("#companyweb").val() != "" && $("#companyname").val() != "") {
			// pass
		} else {
			if ($("#companyname").val() == "") {
				// put ! in field
				$("#companyValidity").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			} else {
				$("#companyValidity").html("");
			}
			if ($("#companyweb").val() == "") {
				// put ! in field
				$("#websiteValidity").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
			} else {
				$("#websiteValidity").html("");
			}
			return false;
		}
	});

	$( "#password" ).on('input',function(e){
		var passw = $('#password').val();
		if (passw.length >= 5) {
			validPassword = true;
			var pwStr = checkPassStrength(passw);
			$("#passwordStrength").html(pwStr);
		} else {
			validPassword = false;
			$("#passwordStrength").html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
		}
	});

	function focusControl(target,speed) {
		$('.section').slideUp(speed);
		$('nav#signUpBreadcrumb ul li').removeClass('active');
		if (target != null) {
			$('#section'+target).slideDown(speed);
			$('#nav'+target).parent().addClass('active');
		}
	}

	function scorePassword(pass) {
		var score = 0;
		if (!pass)
			return score;

		// award every unique letter until 5 repetitions
		var letters = new Object();
			for (var i=0; i<pass.length; i++) {
			letters[pass[i]] = (letters[pass[i]] || 0) + 1;
 			score += 5.0 / letters[pass[i]];
		}

			// bonus points for mixing it up
		var variations = {
			digits: /\d/.test(pass),
			lower: /[a-z]/.test(pass),
			upper: /[A-Z]/.test(pass),
			nonWords: /\W/.test(pass),
		}

		variationCount = 0;
		for (var check in variations) {
			variationCount += (variations[check] == true) ? 1 : 0;
		}
		score += (variationCount - 1) * 10;
		return parseInt(score);
	}

	function checkPassStrength(pass) {
		var score = scorePassword(pass);
		if (score > 50)
			return "<aside><i class='fa  fa-check-circle good'></i></aside>";
		return "<aside><i class='fa  fa-check-circle weak'></i></aside>";
	}

});
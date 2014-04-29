var validEmail = false;
var validPassword = false;

jQuery(function( $ ){

	$(".colorbox").colorbox({inline:true, width:"50%", closeButton:false, overlayClose:false});

	$(".colorboxclose").click(function() {
		$.colorbox.close();
	});

	$("input").keypress(function(e) {

		if(e.which == 13) {
			if (this.id == "input1" || this.id == "password") {
				if(validPassword && validEmail) {
					focusControl(2,"slow","#firstname");
				} else {
					contentControl("#email","#emailValidity",true);
					contentControl("#password","#passwordStrength");
				}
				return false;
			} else if (this.id == "input2" || this.id == "lastname") {
				if ($("#firstname").val() != "" && $("#lastname").val() != "") {
					focusControl(3,"slow","#companyname");
				} else {
					contentControl("#firstname","#firstValidity");
					contentControl("#lastname","#lastValidity");
				}
				return false;
			} else if (this.id == "input3" || this.id == "companyweb") {
				if ($("#companyweb").val() != "" && $("#companyname").val() != "") {
					$("#signUpForm").submit();
				} else {
					contentControl("#companyname","#companyValidity");
					contentControl("#companyweb","#websiteValidity");
				}
				return false;
			}
			var inputs = $(this).closest('form').find(':input');
			inputs.eq( inputs.index(this)+ 1 ).focus();
			return false;
		}
	});
	
	focusControl(1,0);

	$("#signUpBreadcrumb a").click(function() {
		return false;
	})

	$( "#input1" ).click(function() {
		if(validPassword && validEmail) {

			// silently submit

			focusControl(2,"slow","#firstname");
		} else {
			contentControl("#email","#emailValidity");
			contentControl("#password","#passwordStrength");
		}
		return false;
	});
	$( "#input2" ).click(function() {
		if ($("#firstname").val() != "" && $("#lastname").val() != "") {

			// silently submit

			focusControl(3,"slow","#companyname");
		} else {
			contentControl("#firstname","#firstValidity");
			contentControl("#lastname","#lastValidity");
		}
		return false;
	});

	//submit
	$("#input3").click(function() {
		if ($("#companyweb").val() == "" || $("#companyname").val() == "") {
			contentControl("#companyname","#companyValidity")
			contentControl("#companyweb","#websiteValidity")
			return false;
		}
	});

	function contentControl(field, notice) {
		if ($(field).val() == "") {
			$(notice).html("<aside><i class='fa  fa-exclamation-circle bad'></i></aside>");
		} else {
			$(notice).html("");
		}
	}

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

	function focusControl(target,speed,focusTarget) {
		$('.section').slideUp('fast');
		$('nav#signUpBreadcrumb ul li').removeClass('active');
		if (target != null) {
			$('#section'+target).slideDown(speed, function() {
				$(focusTarget).focus();
			});
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
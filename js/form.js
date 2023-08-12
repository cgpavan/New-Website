// request submission
var EnableDisableForm = function (objectType, btn1, btn1Text) {
	if (objectType == 'Disable') {
		$('#' + btn1).attr('disabled', 'disabled');
	} else {
		$('#' + btn1).removeAttr('disabled');
	}
	$('#' + btn1).val(btn1Text);
};


function AjaxFormSubmit(formname, btn1, btn1Text) {
	var options = {
		complete: function (response) {
			if ('Success') {

				swal({
					title: "Thank you!",
					text: "Your message has been successfully Submitted.",
					type: "success",
					confirmButtonText: 'Close',
					timer: 7000
				});

				$('#validation')[0].reset();
				$('#validation-career')[0].reset();

			}
			EnableDisableForm('Enabled', btn1, btn1Text);
		},
		error: function (response) {
			var data = response.responseText;
			console.log(data);
		}
	};
	$('#' + formname).ajaxSubmit(options);
}


// Ajax form validation
$('#validation').validate({
	errorElement: 'span',
	rules: {
		name: {
			required: true
		},
		email: {
			required: true
		},
		phone: {
			required: true
		},
		subject: {
			required: true
		},
		message: {
			required: true
		}
	},
	messages: {
		name: {
			required: 'This field is required'
		},
		email: {
			required: 'This field is required'
		},
		phone: {
			required: 'This field is required'
		},
		subject: {
			required: 'This field is required'
		},
		message: {
			required: 'This field is required'
		}
	},
	submitHandler: function (form) {
		EnableDisableForm('Disable');
		AjaxFormSubmit('validation', 'submit');
		return false; // required to block normal submit since you used ajax
	}
});


$(document).ready(function() {

	/**
	 * Create configuration data
	 */
	 
	window.config = {
		"form_id": 'ss-form',
		"GOOGLE_form_url": 'https://docs.google.com/forms/d/e/1FAIpQLScX_3B5dAQMLZ6667hyf1Tnp3elwXGvq4McaEkBNnO0jbB90A/formResponse',
		"GOOGLE_input_name": 'entry.993699804',
		"GOOGLE_input_phone": '',
		"GOOGLE_input_email": 'entry.1988190908',
		"GOOGLE_input_UTM": 'entry.893050924',
		"UTM_marks": ['utm_source','utm_campaign','utm_content'],
		"UTM_no_message": 'utm not found',
		"path_mailchimp_file": 'http://deyneko.tv/project/megadostigator/mailchimp.php',
		"path_page_thanks": 'http://deyneko.tv/project/megadostigator/thanks.html',
		"name_field_id": '#_name',
		"phone_field_id": '#_phone',
		"email_field_id": '#_email',
		"name_field_active": 1, //1 - active, 0 - no active
		"phone_field_active": 0,
		"email_field_active": 1,
	}

	/**
	 * getParameterByName
	 *
	 * Get parametr by name from URL
	 */
	var getParameterByName = function(name) {
	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	/**
	 * If submit form
	 */
	$("#ss-form").submit(function() {

		/**
		 * Set variables from form
		 */
		var form = document.getElementById(window.config.form_id);
		var form_name = (window.config.name_field_active) ? $(window.config.name_field_id).val() : '';
		var form_phone = (window.config.phone_field_active) ? $(window.config.phone_field_id).val() : '';
		var form_email = (window.config.email_field_active) ? $(window.config.email_field_id) .val() : '';
		var form_utm = '';

// console.log(form_name)

		/**
		 * Set our UTM marks: 'utm_source','utm_campaign','utm_content'
		 */
		var utm_marks_array = window.config.UTM_marks,
			utm_marks_all;

		/**
		 * Loop our utm marks KEY
		 */
		for (var i = 0; i < utm_marks_array.length; i++) {
			if (utm_marks_all) {
				utm_marks_all = utm_marks_all +', '+ getParameterByName(utm_marks_array[i]);
			} else {
				utm_marks_all = getParameterByName(utm_marks_array[i]);
			}
		}

		/**
		 * Set our utm
		 */
		utm_marks_all = (utm_marks_all) ? utm_marks_all : window.config.UTM_no_message;

		/**
		 * Send data in google forms
		 */
		sendDataInGoogleForm(form_name, form_phone, form_email, utm_marks_all);

		/**
		 * Send data in google form
		 */
		sendDataInMailChimp(form_name, form_phone, form_email);

		/**
		 * Show Success Message or Redirect Success Page
		 */
		

		/**
		 * Return false (not submit form)
		 */
		return false;
	})

	/**
	 * sendDataInGoogleForm
	 *
	 * Send data in google form
	 */
	sendDataInGoogleForm = function(form_name, form_phone, form_email, form_utm) {

		/**
		 * Set data object for google form send
		 */
		var google_data_obj = {
			[window.config.GOOGLE_input_name]: form_name,
			[window.config.GOOGLE_input_phone]: form_phone,
			[window.config.GOOGLE_input_email]: form_email,
			[window.config.GOOGLE_input_UTM]: form_utm
		};

		/**
		 * Send letter by AJAX in google
		 */
		$.ajax({
			type: "POST",
			dataType: "JSONP",
			url: window.config.GOOGLE_form_url,
			headers: {
				'Access-Control-Allow-Origin': form_name+' '+form_email
			},
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			cache: false,
			data: google_data_obj,
			complete: function(object) {
				/**
				 * Clear form or redirect page
				 */
			}
		});
	};

	/**
	 * sendDataInMailChimp
	 *
	 * Send data in google form
	 */
	sendDataInMailChimp = function(form_name, form_phone, form_email) {

		mailchimp_data_obj = {
			"name": form_name,
			"phone": form_phone,
			"email": form_email
		};

		/**
		 * Send letter by AJAX in MailChimp
		 */
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: window.config.path_mailchimp_file,
			data: mailchimp_data_obj,
			cache: false,
			success: function(object) {

				/**
				 * Convert OBJECT -> STRING
				 */
				var result_string = JSON.stringify(object);

				/**
				 * Conver STRING -> JSON
				 */
				var result_object = $.parseJSON(result_string);

				/**
				 * Show error or good message
				 */
				if (result_object.status == false) {
					//Show MailChimp Error
					// alert('Bad');
				} else {
					//Show success page
					window.location.href = window.config.path_page_thanks;
				}
			}
		});
	};
});
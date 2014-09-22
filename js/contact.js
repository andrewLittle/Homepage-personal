var contactPage = {
	init: function() {
		submitEl = document.getElementById('emailSubmit'),
		formEl = document.getElementById('emailForm'),
		fail = {
			empty: false,
			badEmail: false,
			noMatch: false
		};

		submitEl.addEventListener('click', contactPage.resetForm, false);
		submitEl.addEventListener('contactPage.reset', contactPage.validateForm, false);
		submitEl.addEventListener('contactPage.pass', contactPage.submit, false);
		submitEl.addEventListener('contactPage.fail', contactPage.errorMsg, false);
	},

	customEventTrigger: function(eventName) {
		var event, // The custom event that will be created
			element = submitEl;

		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(eventName, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = eventName;
		}

		event.eventName = eventName;

		if (document.createEvent) {
			element.dispatchEvent(event);
		} else {
			element.fireEvent("on" + event.eventType, event);
		}
	},

	resetForm: function() {
		var inputs = document.getElementsByTagName('input'),
			textArea = document.getElementById('message');

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

			input.className = "";
		}

		textArea.className = "";

		document.getElementById('form__error-empty').style.display = 'none';
		document.getElementById('form__error-badEmail').style.display = 'none';
		document.getElementById('form__error-noMatch').style.display = 'none';

		document.activeElement.blur();

		contactPage.customEventTrigger('contactPage.reset');
	},

	validateForm: function() {		
		var inputs = document.getElementsByTagName('input'),
			textArea = document.getElementById('message'),
			emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/,
			email = '';

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

			// Check for empty
			if(input.value === '') {
				input.className = 'error';
				fail.empty = true;
			}

			if(input.type === 'email') {
				email = input.value;
				var temp = emailRegex.test(email);
				if(!emailRegex.test(email)) {
					fail.badEmail = true;
				}
			}

			// Check for valid email
		}

		if(textArea.value === '') {
			textArea.className = 'error';
			fail.empty = true;
		}

		if(fail.empty || fail.badEmail || fail.noMatch) {
			contactPage.customEventTrigger('contactPage.fail');
		} else {
			contactPage.customEventTrigger('contactPage.pass');
		}
	},

	errorMsg: function() {
		if(fail.empty) {
			document.getElementById('form__error-empty').style.display = 'block';
		}

		if(fail.badEmail) {
			document.getElementById('form__error-badEmail').style.display = 'block';
		}
	},

	submit: function() {
		alert("Form is good to go.");
	}
};

contactPage.init();
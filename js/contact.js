var contactPage = {
	init: function() {
		submitEl = document.getElementById('emailSubmit'),
		formEl = document.getElementById('emailForm');

		submitEl.addEventListener('click', contactPage.resetForm, false);
		submitEl.addEventListener('contactPage.reset', contactPage.validateForm, false);
		submitEl.addEventListener('contactPage.pass', contactPage.submit, false);
		submitEl.addEventListener('contactPage.fail', contactPage.errorMsg, false);
	},

	customEventTrigger: function(eventName) {
		var event, // The custom event that will be created
			element = submitEl;

		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
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

		document.activeElement.blur();

		contactPage.customEventTrigger("contactPage.reset");
	},

	validateForm: function() {		
		var inputs = document.getElementsByTagName('input'),
			textArea = document.getElementById('message'),
			fail = false;

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

			if(input.value === "") {
				input.className = "error";
				fail = true;
			} 
		}

		if(textArea.value === "") {
			textArea.className = "error";
			fail = true;
		}

		if(fail) {
			contactPage.customEventTrigger('contactPage.fail');
		} else {
			contactPage.customEventTrigger('contactPage.pass');
		}
	},

	errorMsg: function() {
		alert("Please fill in the marked fields.");
	},

	submit: function() {
		alert("Form is good to go.");
	}
};

contactPage.init();
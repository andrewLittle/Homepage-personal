<?php
	$to = 'andrew.little@alittlewebdesign.net'; 
	$from = $_POST['email'];
	$name = $_POST['name'];
	$emailConfim = $_POST['emailConfirm'];
	$headers = "From: $from"; 
	$subject = "Web Contact Data"; 

	$fields = array(); 
	$fields{"name"} = "Name"; 
	$fields{"email"} = "Email"; 
	$fields{"message"} = "Message"; 

	$body = "We have received the following information:\n\n"; foreach($fields as $a => $b){ 	$body .= sprintf("%20s: %s\n",$b,$_POST[$a]; } 

	$headers2 = "From: noreply@alittlewebdesign.net"; 
	$subject2 = "Thank you for contacting us"; 
	$autoreply = "Thank you for contacting us. Somebody will get back to you as soon as possible, usualy within 48 hours. If you have any more questions, please consult our website at www.oursite.com";

	if(!filter_var($from, FILTER_VALIDATE_EMAIL)) {
		print "You have not entered a valid email, please go back and try again";
	} else { 
		if($name == '') {
			print "You have not entered a name, please go back and try again";
		} else { 
			$send = mail($to, $subject, $body, $headers); 
			$send2 = mail($from, $subject2, $autoreply, $headers2); 
			if($send) {
				header( "Location: ../contact.html" );
			} else {
				print "We encountered an error sending your mail, please notify andrew.little@alittlewebdesign.net"; 
			}
		} 
	}
?> 
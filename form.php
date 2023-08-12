<?php
// hide the errors
error_reporting( 0 );

// Get the values from html form
$name       =    $_POST['name'];
$email      =    $_POST['email'];
$phone    =    $_POST['phone'];
$message    =    $_POST['message'];

// Email Address where you want to received the mails
$to = "prathameshs25@gmail.com";


// Sender details
$sender_name = "Bakedmoon Studio";
$sender_email = "prathameshs25@gmail.com";

// Output table
$email_message = '<html>
<head>
    <title>Enquiry from website</title>
</head>
<body>
<table>
    <tr>
        <th align="left"><strong>Name:</strong></th>
        <td align="left">' . $name . '</td>
    </tr>
	  <tr>
        <th align="left"><strong>Email:</strong></th>
        <td align="left">' . $email . '</td>
    </tr>
    <tr>
        <th align="left"><strong>Phone:</strong></th>
        <td align="left">' . $phone . '</td>
    </tr>
       <tr>
        <th align="left"><strong>Message:</strong></th>
        <td align="left">' . $message . '</td>
    </tr>
</table><br /><br />
---<br />Message from www.bakedmoon.studio
</body>
</html>
';

//Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From:'.$sender_name.' <'.$sender_email.'>' . "\r\n";
$subject = "Contact from website";

//send mail
$mail = mail( $to, $subject, $email_message, $headers );


if ( $mail ) {

	// Success message
	echo 'Your mail was sent successfully';
} else {

	// Error message
	echo 'Error';
}
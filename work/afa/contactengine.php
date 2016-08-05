<?php

$EmailFrom = "admin@advancedfootballacademy.com.au";
$EmailTo = "rob@advancedfootballacademy.com.aum";
$Subject = "Contact Form Submission";
$Fname = Trim(stripslashes($_POST['firstname']));
$Lname = Trim(stripslashes($_POST['lastname']));
$Email = Trim(stripslashes($_POST['email']));
$Message = Trim(stripslashes($_POST['message']));

// validation
// $validationOK=true;
// if (!$validationOK) {
//   print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
//   exit;
// }
if(isset($_POST['g-recaptcha-response'])){
  $captcha=$_POST['g-recaptcha-response'];
}

if(!$captcha){
   echo '<h2>Please check the the captcha form.</h2>';
   exit;
 }

$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LcFlhUTAAAAACx_0y5gfLYOLfcPbk7fxbMdWiQq&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
if($response.success==false)
{
  echo '<h2>An issue with your submission was detected.</h2>';
} else
{

  // prepare email body text
  $Body = "";
  $Body .= "First name: ";
  $Body .= $Fname;
  $Body .= "\n";
  $Body .= "Last name: ";
  $Body .= $Lname;
  $Body .= "\n";
  $Body .= "Email: ";
  $Body .= $Email;
  $Body .= "\n";
  $Body .= "Message: ";
  $Body .= $Message;
  $Body .= "\n";

  // send email
  $success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

  // redirect to success page
  if ($success){
    print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.html\">";
  }
  else{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
  }


}

 ?>

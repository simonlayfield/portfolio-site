<?php

$EmailFrom = "admin@advancedfootballacademy.com.au";
$EmailTo = "info@advancedfootballacademy.com.aum";
$Subject = "Register Form Submission";
$playerFirst = Trim(stripslashes($_POST['player-first']));
$playerFamily = Trim(stripslashes($_POST['player-family']));
$playerRegistered = Trim(stripslashes($_POST['player-registered']));
$playerClub = Trim(stripslashes($_POST['player-club']));
$playerAge = Trim(stripslashes($_POST['player-age']));
$playerGender = Trim(stripslashes($_POST['player-gender']));
$playerLevel = Trim(stripslashes($_POST['player-level']));
$parentFirst = Trim(stripslashes($_POST['parent-first']));
$parentFamily = Trim(stripslashes($_POST['parent-family']));
$parentMobile = Trim(stripslashes($_POST['parent-mobile']));
$parentEmail = Trim(stripslashes($_POST['parent-email']));
$parentAddress = Trim(stripslashes($_POST['parent-address']));
$sessions = Trim(stripslashes($_POST['sessions']));
$offseasonSessions = Trim(stripslashes($_POST['offseason-sessions']));
$medical = Trim(stripslashes($_POST['medical-requirements']));
$yourMessage = Trim(stripslashes($_POST['your-message']));
$tncCheck = Trim(stripslashes($_POST['afa-agreement-check']));

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
  $Body .= "Player First Name: ";
  $Body .= $playerFirst;
  $Body .= "\n";
  $Body .= "Player Last name: ";
  $Body .= $playerFamily;
  $Body .= "\n";
  $Body .= "Player registered?: ";
  $Body .= $playerRegistered;
  $Body .= "\n";
  $Body .= "Player Club: ";
  $Body .= $playerClub;
  $Body .= "\n";
  $Body .= "Player Age: ";
  $Body .= $playerAge;
  $Body .= "\n";
  $Body .= "Player Gender: ";
  $Body .= $playerGender;
  $Body .= "\n";
  $Body .= "Player Level: ";
  $Body .= $playerLevel;
  $Body .= "\n";
  $Body .= "Parent First Name: ";
  $Body .= $parentFirst;
  $Body .= "\n";
  $Body .= "Parent Last Name: ";
  $Body .= $parentFamily;
  $Body .= "\n";
  $Body .= "Parent Mobile: ";
  $Body .= $parentMobile;
  $Body .= "\n";
  $Body .= "Parent Email: ";
  $Body .= $parentEmail;
  $Body .= "\n";
  $Body .= "Parent Address: ";
  $Body .= $parentAddress;
  $Body .= "\n";
  $Body .= "Preferred Session: ";
  $Body .= $sessions;
  $Body .= "\n";
  $Body .= "Offseason Session: ";
  $Body .= $OffseasonSessions;
  $Body .= "\n";
  $Body .= "Medical Requirements: ";
  $Body .= $medical;
  $Body .= "\n";
  $Body .= "Additional Message: ";
  $Body .= $yourMessage;
  $Body .= "\n";
  $Body .= "Terms & Conditions Approvel: ";
  $Body .= $tncCheck;
  $Body .= "\n";

  // send email
  $success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

  // redirect to success page
  if ($success){
    print "<meta http-equiv=\"refresh\" content=\"0;URL=form-register-thanks.html\">";
  }
  else{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
  }


}

 ?>

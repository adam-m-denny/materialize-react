<?php
  //require global keyword;
  global $wpdb;
  require '../../../wp-config.php';

  if($_POST['request'] == "titles"){
    $results = $wpdb->get_results( 'SELECT post_title, menu_order FROM wp_posts WHERE post_type = "page" AND post_status = "publish" ORDER BY "menu_order" ASC', OBJECT );
    $json = json_encode($results);
    echo($json);
  }
  if($_POST['request'] == "pages"){
    $results = $wpdb->get_results( 'SELECT post_date, post_title, post_content, menu_order FROM wp_posts WHERE post_type = "page" AND post_status = "publish" ORDER BY "menu_order" ASC', OBJECT );
    $json = json_encode($results);
    echo($json);
  }
  if($_POST['request'] == "footer"){
    $results = $wpdb->get_results( 'SELECT post_title, menu_order FROM wp_posts WHERE post_type = "page" AND post_status = "publish" ORDER BY "menu_order" ASC', OBJECT );
    $json = json_encode($results);
    echo($json);
  }
  if($_POST['request'] == "all"){
    $results = $wpdb->get_results( 'SELECT * FROM wp_posts WHERE post_type = "page" AND post_status = "publish" ORDER BY "menu_order" ASC', OBJECT );
    $json = json_encode($results);
    echo($json);
  }
  if($_POST['request'] == "formsub"){
    require './plivo_send.php';

    $recipient = $_POST['email'];
    $name = $_POST['name'];

    sendText("You have a new inquiry from ".$name);
    $sender = "NOREPLY@owpnow.com";
    $headers = "From: NOREPLY@owpnow.com" . "\r\n" . "Reply-To: adam.m.denny@gmail.com" . "\r\n" . 'X-Mailer: PHP/' . phpversion();
    $subject = "Thank you for your inquiry";
    $message = "Thank you for contacting Oregon Wellness Partners. An OWP representative will be contacting you shortly regarding your appointment.";
    mail($recipient, $subject, $message, $headers);

    $recipient = "adam.m.denny@gmail.com";
    $sender = "NOREPLY@owpnow.com";
    $headers = "From: NOREPLY@owpnow.com" . "\r\n" . "Reply-To: drewfrankel@gmail.com" . "\r\n" . 'X-Mailer: PHP/' . phpversion();
    $subject = "OWP has a new inquiry";
    $message = "OWP has a new appointment request from ". $_POST['name'] . " at " . $_POST['email'] . " " . $_POST['phone'];
    mail($recipient, $subject, $message, $headers);

    echo("Form complete.");
  }
?>

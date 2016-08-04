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
?>

<?php
  function sendText($text){
      $numbers = ['13602413553'];
      # Plivo AUTH ID
      $AUTH_ID = "MAMWEWMWYZMJHMYZBLOG";
      # Plivo AUTH TOKEN
      $AUTH_TOKEN = "NGQ5ZTVlMjEwMDE1ODY5ZDI0ZWIwNTFkY2VkNWVi";
      # SMS sender ID.
      $src = '15413138173';
      # SMS destination number
      $dst = '13602413553';
      # SMS text
      $url = 'https://api.plivo.com/v1/Account/'.$AUTH_ID.'/Message/';
      $data = array("src" => "$src", "dst" => "$dst", "text" => "$text");
      $data_string = json_encode($data);
      for($i = 0; $i < count($numbers); ++$i){
        $data = array("src" => "$src", "dst" => "$numbers[$i]", "text" => "$text");
        $data_string = json_encode($data);
        $ch=curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
        curl_setopt($ch, CURLOPT_USERPWD, $AUTH_ID . ":" . $AUTH_TOKEN);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        $response = curl_exec( $ch );
        curl_close($ch);
      }
    }
?>

<?php
header('Access-Control-Allow-Origin: *');
//$post_data = $_POST['log'];
$post_data = $_GET['log'];
$get_news_data = $_GET['news'];
if (!empty($post_data)) {
        $post_data =date("Y-m-d h:i:sa")." ".$post_data ."\n";
        $filename = 'kassandra_history_log.txt';
        $handle = fopen($filename, "a");
        fwrite($handle, $post_data);
        fclose($handle);
}else if(!empty($get_news_data)){
    if($get_news_data== "news"){
        $url = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=efdb21b0f09448deb1be033e0a7830bf';
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "GET",
          CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache"
          ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);

        echo($response);
        return $response;
    } else {    
        $url = 'https://newsapi.org/v2/everything?q=coronavirus&apiKey=efdb21b0f09448deb1be033e0a7830bf';
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "GET",
          CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache"
          ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        echo($response);
        return $response;
    }
    
}
?>
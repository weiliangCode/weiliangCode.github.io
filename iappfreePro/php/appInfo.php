<?php
    header('Access-Control-Allow-Origin:*');   //PHP后台设置支持跨域访问
    $appid = $_GET['appid'];
    $url = "http://iappfree.candou.com:8080/free/applications/".$appid."?currency=rmb";
    $content = file_get_contents($url);
    echo $content;
?>
<?php
    header('Access-Control-Allow-Origin:*');   //PHP后台设置支持跨域访问
    $currency = $_GET['currency'];
    $page = $_GET['page'];
    $url = "http://iappfree.candou.com:8080/free/applications/sales?currency=".$currency."&page=" . $page;
    $content = file_get_contents($url);
    echo $content;
?>
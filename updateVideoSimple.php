<?php
header('Access-Control-Allow-Origin:*');
$name = htmlspecialchars($_POST['name']);
$id = 12138;

$file = explode('.', $name)[1];
//限制只能上传MP4
if (!in_array($file, ['mp4'])) {
	return false;
}

$time = date('Y-m-d', time());
$dir = "{$time}/";

//文件路径
$file_name = $dir . $name;

$dir_name = $time ."/". $name;
if (!is_dir($dir)) {
    mkdir($dir, 0777,true);
}
if (!file_exists($file_name)) { 
    //第一次收到上传的分割文件
    move_uploaded_file($_FILES['fragment']['tmp_name'], $file_name);
} else {
    //如果文件已存在,即文件至少第二次被分割上传至此
    file_put_contents($file_name, file_get_contents($_FILES['fragment']['tmp_name']) ,FILE_APPEND);
}

//写入数据库
if (isset($_POST['isok'])) {
	$hostD = '127.0.0.1';
	$userD = 'root';
	$passwortD = '123456';

	$linkD = mysql_connect($hostD, $userD, $passwortD) or die('连接失败');
	mysql_query('use test', $linkD);
	mysql_query('set names utf8', $linkD);
	$date_time = time();

	$file_name = "http://pc.test.com/".$dir_name;

	$update = sprintf('update simple_star_view set video_url = "%s" where id = %s', $file_name, $id);
	file_put_contents('12313.txt', print_r($update,1),FILE_APPEND);
	$result = mysql_query($update);
}

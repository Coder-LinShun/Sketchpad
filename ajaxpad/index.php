<?php
include('./Config/config.php');
session_start();
if(!empty($_SESSION)&&empty($_POST)){
	include('./View/pad.html');
	// $_SESSION['true']='';
}elseif($_GET){
	include('./View/visit.html');
} else{
	// die($_SESSION['username']);
	$c = isset($_POST['c'])?$_POST['c']:'user';
	$c = ucfirst($c).'Controller';
	$a = isset($_POST['a'])?$_POST['a']:'index';
	$obj = new $c;
	$obj->$a();
}
	
function __autoload($classname){
	// die('aa');
	if(substr($classname, -10) == "Controller"){
		include "./Controller/{$classname}.class.php";
	}elseif ($classname == 'Model') {
		include "./Model/{$classname}.class.php";
	}else{
		include "./Org/{$classname}.class.php";
	}
}

?>
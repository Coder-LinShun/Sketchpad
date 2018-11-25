<?php
	//model类 数据库操作类
	class  Model{
		public $link;     //资源
		public  $table;   //表名

		//构造函数
		public  function __construct($table){
			date_default_timezone_set('PRC');
			//连接数据库
			$link = mysqli_connect(HOST,USERNAME,PASSWORD,DBNAME) or die('连接失败');
			mysqli_set_charset($link,'utf8');
			$this->link = $link;
			$this->table = $table;

		}

        //登录 验证
        public function login($name,$pass){
            $sql = "select *  from  ".$this->table." where  username='{$name}' and password='{$pass}'";
            // die('hh');
            $res = mysqli_query($this->link,$sql);

            $info = mysqli_fetch_assoc($res);

			return $info;
		}
		//执行注册
		public  function  reg($name,$pass){
			$sql1 = "select *  from  ".$this->table." where  username='{$name}'";
            // die('hh');
            $res1 = mysqli_query($this->link,$sql1);

			$info1 = mysqli_fetch_assoc($res1);
			
			if($info1){
				// die('aa');
				return false;
			}else{
				$time = "____-__-__  __:__:__";
				$sql2 = "insert into ".$this->table." values ('','{$name}','{$pass}','{$time}',' ')";
				$res2 = mysqli_query($this->link,$sql2);
				if($res2){
					// die('bb');
					return $time;
				}else{
					// var_dump($res2);
					// die('cc');
					return false;
				}
			}			
		}
		//删除用户
		public function  del($name){
			//拼接sql  delete from 表名 where id  =$id;
			$sql = "delete from ".$this->table." where username='{$name}'";

			$res = mysqli_query($this->link,$sql); 

			return  mysqli_affected_rows($this->link);
		}

		

		//执行保存
		public function  save($name,$data){
			$time = date("Y-m-d H:i:s");
			$sql="update ".$this->table." set data='{$data}',time='{$time}' where username='{$name}'";
			mysqli_query($this->link,$sql);

			$sql1 = "select * from ".$this->table." where username='{$name}'";
            // die('hh');
            $res1 = mysqli_query($this->link,$sql1);

			$info1 = mysqli_fetch_assoc($res1);

			if($info1['data'] == $data ){
				return $time;
			}else{
				return false;
			}
		}

		//查找用户名
		public  function  sle($name){
			$sql1 = "select *  from  ".$this->table." where  username='{$name}'";
            // die('hh');
            $res1 = mysqli_query($this->link,$sql1);

			return mysqli_fetch_assoc($res1);
		}
	}
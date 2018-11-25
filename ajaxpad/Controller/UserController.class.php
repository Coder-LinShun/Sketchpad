<?php
	class  UserController{
		//用户首页，要获取所有的信息
		public  function  index(){
			// echo "用户首页";
			//连接数据
			//
			//设置字符编码
			//
			//sql  
			// var_dump($info);
			// 将数据显示到模板上
			include './View/login.html';
			
		}
       
        //注册
		public function reg(){
			$name=$_POST['username'];
            $pass=$_POST['password'];  

            $model = new Model('userdata');

            $res  = $model->reg($name,$pass);
            
            if($res){
                $_SESSION['username']=$name;
                $_SESSION['password']=$pass;
                $_SESSION['data']=' ';
				$_SESSION['time']=$res;
				echo 1;
            }
		}

        //删除用户
		public  function del(){
			$name = $_SESSION['username'];
			$pass = $_POST['pass'];
			// var_dump($name);
			// die($name);
			$model = new Model('userdata');
			$res1 = $model->login($name,$pass);
			if($res1){
				$res  = $model->del($name);	
				if($res){
					session_unset();
					session_destroy();
				    echo true;
				}
			}
	
		}

				
        //登录
        public function login(){
            // die('登录验证');
            $name = $_POST['username'];
            $pass = $_POST['password'];  

            $model = new Model('userdata');

            $res  = $model->login($name,$pass);
            
            if($res){
                $_SESSION['username']=$name;
                $_SESSION['password']=$pass;
                $_SESSION['data']=$res['data'];
                $_SESSION['time']=$res['time'];
				echo 1;
            }
		}
		
		public function save(){
			$name  = $_SESSION['username'];			
			$data  = $_POST['data'];
			$model = new Model('userdata');
			$res   = $model->save($name,$data);
			if($res){
				$_SESSION['data'] = $data;
				echo $res; 
			}else{
				echo false;  
			}
		}

		public function out(){
			session_unset();
			session_destroy();
			echo 1;
		}


		public function sle(){
			$name = $_POST['name'];
			$model = new Model('userdata');
			$res   = $model->sle($name);
			if($res){
				echo 1;  
			}else{
				echo 0;
			}
		}

		
//



	}

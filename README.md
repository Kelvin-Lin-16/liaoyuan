# liaoyuan
###Day 1:

#####项目分析:
		    	-> 用户访问 - 首页
                  	-> 访问短链接 - 查询数据库
                   		-> 存在, 302重定向
                   		-> 不存在, 404找不到页面

					-> 创建短链接(异步验证是否已存在)
						-> 已存在, 页面警告提示
						-> 不存在, 保存到数据库并返回201

#####项目构建:
				express -e liaoyuan
				npm init

#####部署:
				sudo apt-get install mongo nginx git
				sudo git clone https://github.com/Kelvin-Lin-16/liaoyuan
				cd ./liaoyuan
				sudo npm install
				grunt
				forever start app.js

#####网址:
				http://www.linsapp.com



var fs = require("fs")
var path = require("path") 
const axios = require('axios');
var Ut = require('./utils')
	
var dirsname = "D:\\download\\chrome\\"
//var dirsname = "E:\\workplace\\python\\python-project\\book\\"
var root = path.join(dirsname)

//readDir(root)
readDirSync(root)
function readDirSync(path){
	var pa = fs.readdirSync(path);
	//pa.sort(function(a, b){return 0.5 - Math.random()});
	pa = my_sort(pa);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)
		if(info.isDirectory()){
			readDirSync(path+"/"+ele);
		}else{
			if(ele.indexOf('.epub') > 0) {
				my_axios_http(root+ele)
				sleep(1.5)
			}else{
				console.log(ele+" is not a epub file.\n")
			}
		}
	})
}

//readDir(path.join(root))
function readDir(path){
	fs.readdir(path,function(err,menu){	
		if(!menu)
			return;
		menu=my_sort(menu)
		menu.forEach(function(ele){	
			fs.stat(path+"/"+ele,function(err,info){
				if(info.isDirectory()){
					readDir(path+"/"+ele);
				}else{
					if(ele.indexOf('.epub') > 0) {
						my_axios_http(root+ele)
						sleep(1.5)
					}else{
						console.log(ele+" is not a epub file.")
					}
				}	
			})
		})			
	})
}

function my_sort(arr) {
var i, j, k;
  for (i = arr.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    k = arr[i]
    arr[i] = arr[j]
    arr[j] = k
  }
  return arr;
}

function sleep(time) {
	var _exit = Date.now() + time * 1000;
	while( Date.now() < _exit ) {}
	return ;
}


async function my_axios_http(file) {
	axios.get('http://127.0.0.1:8888',{
		  params: {
			 file: file
		  }
	   })
	  .then(res => {
		console.log('数据是:', res.data);
	  })
	  .catch((e) => {
		console.log('获取数据失败');
	  });
}

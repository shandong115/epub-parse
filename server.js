var http = require('http');
var url = require('url');
const EPub = require("epub");
var mysql  = require('mysql'); 
var fs = require("fs");


http.createServer(function (request, response) {

    response.writeHead(200, {'Content-Type': 'text/plain'});

	var params = url.parse(request.url, true).query;
	var msg = 'I have received a file:'+params.fullname;

    response.end(msg);
	epub_deal(params.fullname,params.filename)
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

function epub_deal(fullname, file) {
	let epub = new EPub(fullname);
	try{
		epub.on("end", function () {
			//console.log(fullname+' is available ...')
			//console.log(epubfile,epub.metadata);
			insert_book(file, epub.metadata)
		});
		epub.on("error", function (error) { 
			console.log(error)
			console.log(fullname+' error...')
			insert_book(file, epub.metadata)
		});
		epub.parse();		
	}
	catch(e){
		console.log( e );
		insert_book(file, '')
	}
}

function insert_book(fileName, metadata) {
	var connection = mysql.createConnection({
		  host     : '192.168.31.42',       
		  user     : 'dayou',              
		  password : 'asdasd321321',       
		  port: '3306',                   
		  database: 'bookdb' 
	}); 
	
	connection.connect();
	
	var description_info = Trim(metadata.description)
	if(description_info.length>4096) {
		description_info = description_info.substring(0,4095)
	}
	var  addSql = 'INSERT INTO book_meta(book_Id,name,title,author,publisher,language,publish_date,uuid,isbn,translator,size,path,subject,describe_info,isOk) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	var  addSqlParams = [fileName, Trim(metadata.title), Trim(metadata.creator), Trim(metadata.publisher), Trim(metadata.language),Trim(metadata.date),Trim(metadata.UUID),Trim(metadata.ISBN),'','','',Trim(metadata.subject), description_info,'0'];
	//console.log("sql:"+addSql)
	//console.log("params:"+addSqlParams)
	try {
		connection.query(addSql,addSqlParams,function (err, result) {
		        if(err){
					var errInof = fileName + '[INSERT ERROR] - ' +err.message;
					console.log(errInof);
					fs.writeFile('wrong.txt', errInof, { 'flag': 'a' }, function(err2) {
						if(err2) {
							console.log(err2);
						}
					});
					connection.end();
					return;
		        }        
		 
				//console.log(fileName+' inserted...');
		});
	}
	catch(e){
		console.log( 'insert Err...'+ e );
	}
	
	 
	connection.end();
}

function Trim(str)
{
	if(!str){
		return ""
	}
	else {
		return str.replace(/(^\s*)|(\s*$)/g, ""); 		
	}
	
}
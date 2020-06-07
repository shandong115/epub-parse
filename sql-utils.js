
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'dayou',              
  password : 'asdasd321321',       
  port: '3306',                   
  database: 'bookdb' 
}); 
 
connection.connect();
 
// var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

var  addSql = 'INSERT INTO book_meta(book_Id,name,title,author,publisher,language,publish_date,uuid,isbn,translator,size,path,subject,describe_info,isOk) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN','','','','','','','','','','0'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();

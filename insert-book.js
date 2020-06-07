const connect = require('connect');

const insert_book = (req, res) => {
	var  addSql = 'INSERT INTO book_meta(book_Id,name,title,author,publisher,language,publish_date,uuid,isbn,translator,size,path,subject,describe_info,isOk) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	
	
	connect(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
	         return;
	        }        
	 
	       console.log('--------------------------INSERT----------------------------');
	       //console.log('INSERT ID:',result.insertId);        
	       console.log('INSERT ID:',result);        
	       console.log('-----------------------------------------------------------------\n\n');  
	});
    const userId = req.body.userId;
    const sql = `INSERT INTO \`books\`.\`bookshelf\`(\`userid\`, \`bookid\`, \`bookname\`, \`author\`, \`images\`, \`wordcount\`, \`type\`, \`intro\`, \`serialize\`) 
    VALUES ('${userId}','${req.body['userInfo[id]']}','${req.body['userInfo[name]']}','${req.body['userInfo[author]']}','${req.body['userInfo[images]']}','${req.body['userInfo[wordcount]']}','${req.body['userInfo[type]']}','${req.body['userInfo[intro]']}','${req.body['userInfo[serialize]']}');`

    connect(sql, function (err, results, fileds) {
        if (err) throw err;
        if (results.affectedRows === 1) {
            res.send(true)
        } else {
            res.send(false)
        }
    })

}

module.exports = inShelf;
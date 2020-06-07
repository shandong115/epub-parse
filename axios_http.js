const axios = require('axios');

exports.axios_http = function(file) {
	axios.get('http://127.0.0.1:8888',{
		  params: {
			 id: file
		  }
	   })
	  .then(res => {
		console.log('数据是:', res.data);
	  })
	  .catch((e) => {
		console.log('获取数据失败');
	  });
	return 0
}
/* export function axios_http(file){} */ 
//axios_http('xxx')
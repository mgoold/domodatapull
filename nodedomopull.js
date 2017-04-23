
var request = require('request');
    var username = 'myusername';
    var password = 'mypassword';
    var url = 'https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data';
    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

options={username:username,password:password,url:url,auth:auth}

function get_response_body(options,callback) {	
	request(			
		{
		   url : options.url,
		   headers : {
			   "Authorization" : options.auth
		   }
		}, 
		
		function get_auth_token (error, response, body) {
			body=response['body'];
			if(typeof callback === 'function') {
				callback(body);
			}
		}
	);
}

get_response_body(options,parse_auth_token);

function parse_auth_token (body,callback) {
		access_token=JSON.parse(body)['access_token'];
		get_dataset(access_token,publish_results);
}


function publish_results(body) {
	console.log('data',body);
	
}

function get_dataset(access_token) {	

	options={
		host: 'api.domo.com',
		accept: 'text/csv',
		auth: {
			'bearer': access_token
			}
	}
		
	request.get('https://api.domo.com/v1/datasets/476adbba-3755-4d77-85e1-854177ed9f6b/data?includeHeader=true',options)
	.on('error', function(err) {console.log(err);})
	.on('response', function(response) {console.log(response);})
		

}


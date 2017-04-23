
var request = require('request');
    var username = 'myusername';
    var password = 'mypassword';
    var url = 'https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data';
    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

options={username:username,password:password,url:url,auth:auth}

// var request = require('request');
// var options={
//     url:'https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data',
// 	auth: {
// 	    username:'f7feb54c-f946-4cc2-a4d6-5eafee566947',
//     	password:'7695ecd9f969d946e0d94674b46f2ce10a96444b1106d9ebca02216eebfd233d',
// 	}
// };
// console.log('options',options);
// options.basic="Basic " + new Buffer(options['auth'].username + ":" + ['auth'].password).toString("base64")
// 		auth:"Basic " + new Buffer(username + ":" + password).toString("base64")
// dataset id f38be88e-4388-4ed1-9546-fcb05c48ccde
// GET /v1/datasets/317970a1-6a6e-4f70-8e09-44cf5f34cf44/data?includeHeader=true&fileName=data-dump.csv HTTP/1.1
// Accept: text/csv
// Host: api.domo.com
// Authorization: bearer <your-valid-oauth-access-token>

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
// 		console.log('access_token',access_token);	
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
//call body, get token, then hand token to caller to do further processes
// eyJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiQWRtaW4iLCJzY29wZSI6WyJkYXRhIl0sImV4cCI6MTQ5Mjg4NDc5MSwiZW52IjoicHJvZDMiLCJ1c2VySWQiOjc5NTkzOTEzNywianRpIjoiNDZmNDAwMGQtNTI4OC00YThiLWIyZTMtYzhiNzA5MzRmZDQ1IiwiY2xpZW50X2lkIjoiZjdmZWI1NGMtZjk0Ni00Y2MyLWE0ZDYtNWVhZmVlNTY2OTQ3IiwiY3VzdG9tZXIiOiJwYXJ0bmVyc2FuZGJveC1yb2lkbmEifQ.A9NWtsg3x6pHqKZZW7TydRBVTJBENZj86qybdxU8e51yR98QthjsHf4_2YtgP2wodIu13abtsK2akF-n6PPZ9mwZTOxDLcBkYSPFbbjJj-o_sz-9ZGYftR5AKS1YqStah-llMknMKpBttGyTv44kNRcbT96XGK5l1-HyFFUl5GSlKYfYN109HQspm-E6KJLgNdwb0xmzChSByCkXffkkoW8OqjW94A_dXmVr9sVkVKbfat5YKcoiNXKiirwL9OMZepc0FGnTn_dUhyKhXutdbH0sxZyvqceMThmhcoHjcz1nQRvqbrLS1I5l47uOnadkT2-DTxWWjCdyMSLxVKk-Yw


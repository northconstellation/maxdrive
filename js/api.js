console.log('api script included');

objSerialize = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

function Api_smartresponder(api_key, api_id){
	var config = {
		api_key: api_key,
		api_id: api_id,
		format: 'json',
		action: 'check_email',
	};
	this.checkEmail = function(userData){
		getUrl = {
			'url': 'http://api.smartresponder.ru/subscribers.html?'
		};
		config.action = 'check_email';
		for ( var p in config){
			getUrl.url+=('&'+p+'='+config[p]);
		};
		getUrl.url+= ('&email='+userData.email);
		console.log(objSerialize(getUrl));

		var e;
		$.ajax({
		  url: 'ba-simple-proxy.php?'+objSerialize(getUrl),
		  async:false
		})
	  .done(function( msg ) {
	  	if (msg.contents.list.elements) {
		  	e = msg.contents.list.elements[0].id;	  		
		  	console.log(msg);
	  	}else{
	  		e = null;
	  	}
	  });
	  return e;

	};

	this.addSubscriber = function(data){
		var id = this.checkEmail(data);
		if (id) {
			console.log('user exist');
			config.action = 'on_delivery';
			getUrl = {
			'url': 'http://api.smartresponder.ru/subscribe.html?'
			};
			data.id = id;
			data['seach[email]'] = data.email;
			
			delete data.email;
			delete data.first_name;
			delete data.phones;
			for ( var p in config){
				getUrl.url+=('&'+p+'='+config[p]);
			};
			for ( var d in data){
				getUrl.url+=('&'+d+'='+data[d]);
			};
			console.log(data,objSerialize(getUrl));

			$.ajax({
			  url: 'ba-simple-proxy.php?'+objSerialize(getUrl),
			  async:false
			})
		  .done(function( msg ) {
		  	console.log(msg);
		  });
		}else{
			console.log('user no exist');
			config.action = 'create';
			getUrl = {
				'url': 'http://api.smartresponder.ru/subscribers.html?'
			};

			for ( var p in config){
				getUrl.url+=('&'+p+'='+config[p]);
			};
			for ( var d in data){
				getUrl.url+=('&'+d+'='+data[d]);
			};
			console.log(data, objSerialize(getUrl));
			$.ajax({
			  url: 'ba-simple-proxy.php?'+objSerialize(getUrl),
			  async:false
			})
		  .done(function( msg ) {
		  	console.log(msg);
		  });

		};


	};
};

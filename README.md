# imbing

A client wrapper for Microsoft's Bing Search API in Windows Azure Marketplace.

# Installation

```
$ npm install imbing
```

# Usage
```

var bing = require('imbing');
var b = bing({appId:'your-api-key'});
// your api key is primary account key that you can see in the dash board of the marketplace. 

b.search('INAPP', {limit: 30}, function(error, response, body){

	if ( !error ) {
    	console.log(body.d.results[0].ID) ;
    	console.log(body.d.results[0].Title) ;
    	console.log(body.d.results[0].Url) ;
    	console.log(body.d.results[0].Source) ;
    	console.log(body.d.results[0].Description) ;
    }
	else
		console.log(error);
});

```

# GIT

https://github.com/INAPP-Mobile/imbing.git

# License

MIT

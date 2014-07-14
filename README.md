# imbing

A client wrapper for Microsoft's Bing Search API on Node.js.

# Installation

```
$ npm install imbing
```

# Usage
```

var bing = require('imbing');
var b = bing({appId:"your-api-key"});

b.search("INAPP", {limit: 30}, function(error, response, body){

	if ( !error )
    	console.log(body.d.results[0]) ;
	else
		console.log(error);
});

```

# License

MIT

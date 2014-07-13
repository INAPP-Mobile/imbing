# imbing

A client wrapper for Microsoft's Bing Search API on Node.js.

# Installation

```
$ git clone git://github.com/INAPP-Mobile/imbing.git
$ npm install imbing
```

# Usage
```
var bing = require('imbing')

var b = bing({appId:"your-api-key"})

b.search("INAPP", function(error, response, body){

     console.log(body.SearchResponse.Web.Results[0]) 

},{limit: 30})
```

# License

MIT

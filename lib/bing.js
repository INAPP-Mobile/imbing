/**
 * A client for Microsoft's Bing Search API on Node.js
 * Copyright(c) 2014 Michael Shim <imapp.help@gmail.com>
 * Source covered by the MIT License
 */

var request = require('request'),
    url = require('url'),
    _ = require('underscore'),
    qs = require('querystring');

var Bing = function( options ) {

    if( !(this instanceof Bing) ) return new Bing( options );

    var defaults = {
    	appId: null,
        //Endpoint Microsoft's Bing API REST GET
        endpoint: "https://api.datamarket.azure.com/Bing/Search/",
        //Appid
        appId: null,
        //SourceType: Web,Image,Video,News,RelatedSearch,SpellingSuggestions,Composite
        sources: "Web",
        //Bing amount of items response
        limit: 10,
        //offset results
        offset: 0, 
        //Bing UserAgent
        userAgent: 'Bing Search for Node.js',
        // timeout
        timeout: 10000
    };

    //merge options passed in with defaults
    this.options = _.extend(defaults, options);
}


Bing.prototype.search = function(query, options, callback) {
 
     if(typeof callback != 'function') {

        throw "Erorr: Callback function required!"; 
        return;
     }

     var opts = this.options;

     if(options != null) {

        opts = _.extend(this.options, options);
     }

     var q = "'" + query + "'";

     var uri = opts.endpoint + opts.sources + '?'
     	+ 'Query=%27' + qs.escape(q) + '%27&$format=json&$top=' + opts.limit +
     		'&$skip=' + opts.offset;

     request({

          uri: uri,
          method: "GET",
          headers: {
                  "User-Agent": opts.userAgent
          },
          timeout: opts.timeout,
          auth: { user:'', pass:opts.appId, sendImmediately:true}
     }, function(error, response, body){

          if(!error && response.statusCode >= 200 && response.statusCode < 300) {

             var data = JSON.parse(body)

             callback( error, response, data );

          } else {
            callback(error, response, body); 
          }
     });
}

module.exports = Bing
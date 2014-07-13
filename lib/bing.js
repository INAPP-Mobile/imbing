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

    if( !(this instanceof Bing) ) return new Bing( options )

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
        //Bing Api version
        version: "2.2",
        // timeout
        timeout: 10000
    };

    //merge options passed in with defaults
    this.options = _.extend(defaults, options)
}


Bing.prototype.search = function(query, callback, options) {
 
     if(typeof callback != 'function') {

        throw "Erorr: Callback function required!" 
        return
     }

     var opts = this.options;

     if(options != null) {

        opts = _.extend(this.options, options)
     }

     var query = "'" + opts.query + "'";
     
     var uri = opts.endpoint + opts.sources + '?' +
     	+ qs.stringify({
               "Query": opts.query,
               "$format": "json",  
               "$top": opts.limit,
               "$skip": opts.offset
     	})
     
     request({

          uri: uri,
          method: "GET",
          headers: {
                  "User-Agent": opts.userAgent
          },
          timeout: opts.timeout,
          auth: { user:'', pass:opts.appId}
     }, function(error, response, body){

          if(!error && response.statusCode >= 200 && response.statusCode < 300) {

             //the error could be in the body because bing returns 200 for failed requests
             var data = JSON.parse(body)

             if(data && data.SearchResponse.Errors && data.SearchResponse.Errors.length > 0) {

                  error = new Error("Bing API Error: (" + data.SearchResponse.Errors.length + " errors): See remoteErrors for details ")
                  error.remoteErrors = data.SearchResponse.Errors;
             } 

             callback( error, response, data );
           
          //otherwise should be something interesting here...  
          } else {
            callback(error, response, JSON.parse(body)); 
          }
     })
}

Bing.version = "0.1.0"

module.exports = Bing
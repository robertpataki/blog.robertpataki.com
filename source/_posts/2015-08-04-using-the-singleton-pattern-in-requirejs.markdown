---
layout: post
title: "Using the singleton pattern in RequireJS"
intro: "A very simple implementation of the singleton pattern in RequireJS (with examples)"
date: 2015-08-04 09:17:07 +0100
comments: true
hero: "/images/posts/general-hero.png"
categories: coding javascript requirejs singleton
---

<p class="post-intro">Using the singleton pattern in your RequireJS app has its advantages, below is a very simple implementation, enjoy :)</p>

<div class="codeblock-terminal">
```
	define([],

	    function() {

	        'use strict';
	    
	        var instance = null;
	 
	        function Singie() {
	            if(!!!instance){
	                this.initialize();
	                instance = this;
	            }
	            window.SINGIE = instance; // Good to have reference on window
	            return instance;
	        };

	        Singie.prototype = {
	            initialize: function() {
	                // Private vars
	                this._hello = 'Hello';

	                // Public methods
	                this.sayHello = function sayHello(name) {
	                    var n = name || 'Anonymous';
	                    console.log(this._hello + ' ' + n);
	                }
	            }
	        };

	        return Singie;
	    }
	);
```
</div>

The above code lets you use one single instance of the 'Singie' module, as it always will return its sole instance - no matter how many times you instantiate it.


An example of accessing the public methods of the singleton instance:

<div class="codeblock-terminal">
```
	var singie = new Singie();
	singie.sayHello('Foo');
	
	// Will put 'Hello Foo' in the console
```
</div>

And here is a quick test to see if there is no cheekiness, and there is indeed only once instance existing:

<div class="codeblock-terminal">
```
	var singie = new Singie();
	var singieClone = new Singie();
	console.log(singie === singieClone);

	// Will put true in the console
```
</div>

Having a reference on the 'window' object can also come handy:

<div class="codeblock-terminal">
```
	var singie = new Singie();
	SINGIE.sayHello('Bar');

	// Will put 'Hello Bar' in the console
```
</div>

That's all folks!
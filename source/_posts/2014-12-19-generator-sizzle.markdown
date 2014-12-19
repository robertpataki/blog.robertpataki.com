---
layout: post
title: "generator-sizzle"
intro: "I just published my first npm module for Yeoman - here is why."
date: 2014-12-19 15:50:06 +0000
hero: "/images/posts/generator-sizzle-hero.png"
comments: true
categories: coding yeoman
---

<p class="post-intro">About a year ago I started using Yeoman, and I'm absoltely loving it! All the tools it offers front-end (full stack if you like) developers are immensely powerful, and make my life very easy. Utilising Grunt and Bower, it not only makes compiling assets and managing project dependencies super easy, but with its generators developers have a great opportunity to build their own scaffolding tools, which is simply amazing.</p>

The time has come for me to create my own Yeoman generator, so that I can speed up my development setup process and workflow.

## I can has Yeoman generator

Everyone has their preferred dev tools - myself included. For a typical project I like to use:

- jQuery
- RequireJS
- Greensock
- FastClick
- JSSignals

for scripting; and for my stylesheets I prefer using:

- Compass
- Normalize
- Bourbon and Neat

And I also find it handy to have a Grunt task for deployment over SSH.

Of course these are quite specific requirements, and certainly there aren't any Yeoman generators out there, which would offer these right out of the box.

For that reason I usually start off a typical front-end project with scaffolding it up using Yeoman's good old <a class="link" href="https://github.com/yeoman/generator-webapp" target="_blank">'webapp' generator</a>. It gives me a well organised folder structure, and most of the tools I need: jQuery, Livereload, smartie stylesheets with SASS support and script compilers - and of course code minification, uglification, concatenation - all that jazz.

However, as I prefer using Compass to Sass, and I like using RequireJS to keep my code modular, I always have to fiddle around to get rid off the fluff, and install my preferred dependencies and add my bits to the Gruntfile - which obviously takes time. Not even mentioning the fact, that I don't like using Bootstrap (simply because I don't want even my prototypes to look like any 'just-another-twitter-bootstrap-clone' app), I always opt out of Bootstrap and use <a class="link" href="http://neat.bourbon.io/" target="_blank">Bourbon Neat</a> instead.

## $ yo sizzle

It is a great thing, that developers can have their preferred Yeoman toolset put together into a sweet NPM package, so that they can have their own scaffolding generator. Following the <a class="link" href="http://yeoman.io/authoring/" target="_blank">Yeoman generator guide</a> I built 'generator-sizzle', which now lets me setting up a new project just the way I like it well within a ~minute.

To install sizzle from your command line run:

<div class="codeblock-terminal">
```
	$ npm install -g generator-sizzle
```
</div>

Once sizzle is installed, you can get Yeoman to scaffold your project with it:

<div class="codeblock-terminal">
```
	$ yo sizzle
```
</div>

When the generator is done with the initial set up, you need to install Compass:

<div class="codeblock-terminal">
```
	$ bundle install
```
</div>

This tells Bundle to install the compass ruby gem using the Gemfile from the project's root.

(If you haven't got Bundle (or Ruby) installed already, please have a look at the README.md file in the sizzle repo, it will explain how to install Compass on your machine).

Sizzle should be good to go now. To compile the source files and see what you've got, run

<div class="codeblock-terminal">
```
	$ grunt serve
```
</div>

which should open the web app in your browser:

{% img post-photo /images/posts/generator-sizzle-1-preview.png The scaffolded sizzle app in the browser %}

This tells you that Bourbon Neat is set up (with a visible visual grid), and if you open your Console, you should see some logs too:

<div class="codeblock-terminal">
```
[Log] [Main] - ready! (application.js, line 19632)
[Log] [App] - _init(): Sizzle is at your service! (application.js, line 19581)
```
</div>

which shows that RequireJS is happy too, and the app is up and running.


## Let's crack on!

OK, so you sucessfully set up your project, now let's have a look at how you can start working on your new project! First of all, let's let's see the project root:

<div class="codeblock-terminal">
```
├───app/
├───bower_components
├───bower.json
├───config.json
├───dist/
├───Gemfile
├───Gruntfile.js
├───node_modules
├───package.json
├───secret.json	
```
</div>

As you can see it's the usual Yeoman stuff: 'app' and 'dist' folders for your source code; and the compiled output. And there is all the regular config files for Yeoman there; so there are your project's dependency manifest files.

The only noticeable thing here is the 'secret.json' file, which is used for SSH deployment via Grunt - I will talk about this one later.

Now the best entry point for you I believe is the index.html file, so let's have a quick look at it!

### The index.html file

- CSS and JS building and loading - HTTP request saving
- Sensible defaults (viewport)

### Working with the JavaScript files 

- Look at the grunt file to see how r.js works with the files
- Talk a bit about RequireJS and how the app is initialised with the dependencies
- Modules

{% img post-photo /images/posts/generator-sizzle-3-preview.png  %}

### Working with the SCSS files

- Show Grunt Compass block
- Talk about how Compass processes the files
- Entry point at application.scss + dependencies

{% img post-photo /images/posts/generator-sizzle-2-preview.png The SASS files imported into application.scss %}

### Deploying the project

- secret.json
- Gruntfile code block
- Don't push secret.json to remote origin
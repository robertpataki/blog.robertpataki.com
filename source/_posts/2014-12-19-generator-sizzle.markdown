---
layout: post
title: "generator-sizzle"
intro: "I just published my first npm module for Yeoman."
date: 2014-12-19 15:50:06 +0000
updated: 2015-01-13 14:00:00 +0000
hero: "/images/posts/generator-sizzle-hero.png"
comments: true
category_group: coding
categories: coding yeoman
---

<p class="post-intro">About a year ago I started using Yeoman, and I'm absoltely loving it! All the tools it offers front-end (full stack if you like) developers are immensely powerful, and make my life very easy. Utilising Grunt and Bower, it not only makes compiling assets and managing project dependencies super easy, but with its generators developers have a great opportunity to build their own scaffolding tools, which is simply amazing.</p>

The time has come for me to create my own Yeoman generator, so that I can speed up my development setup process and workflow.

> You can find the NPM package <a class="link" href="https://www.npmjs.com/package/generator-sizzle" target="_blank">here</a>, and the source is on <a class="link" href="https://github.com/robertpataki/generator-sizzle" target="_blank">Github</a>.

## I can has Yeoman generator

Everyone has their preferred dev tools - myself included. For a typical project I like to use:

- **jQuery** - which is a power tool offering EVERYTHING from DOM selection to making XHR calls, and anything else you could EVER wish for
- **RequireJS** -	for leveraging the benefits of AMD modules and keep my code modular
- **Greensock** - to make beautiful and well optimised, super smooth animations and transitions
- **FastClick** - for making my apps react to user taps as fast as possible on mobile devices, bypassing the ~300ms delay added by the mobile browsers
- **JSSignals** - to implement a nice signal based event dispatch/receive system in my apps (instead of callback hell)

for scripting; and for my stylesheets I prefer using:

- **Compass** - a very powerful SASS compiler with added awesomeness (such as font loading, inline svg and image generation, and CSS minification / uglification)
- **Normalize** - my preferred way of resetting the CSS browser defaults
- **Bourbon** and Neat - for extensive tools such as vendor prefixing, animations, grid system and other useful utitilies

And of course, Bower for dependency management and Grunt for running automated tasks are killer features, so Yeoman is the ultimate choice. I also find it handy to have a Grunt task for deployment over SSH.

Naturally these are quite specific requirements, and certainly there aren't any Yeoman generators out there, which would offer these right out of the box.

For that very reason I usually start off a typical front-end project with scaffolding it up using Yeoman's good old <a class="link" href="https://github.com/yeoman/generator-webapp" target="_blank">'webapp' generator</a>, which gives me a well organised folder structure, and most of the tools I need: jQuery, Livereload, smartie stylesheets with SASS support and script compilers - and of course code minification, uglification, concatenation - all that jazz.

However, as I prefer using Compass to Sass, and I like using RequireJS to keep my code modular, I always have to fiddle around to get rid off the fluff, and install my preferred dependencies, and add my bits to the Gruntfile - which obviously always takes time. Not even mentioning the fact, that I don't like using Bootstrap (simply because I don't want even my prototypes to look like any 'just-another-twitter-bootstrap-clone' app), I always opt out of Bootstrap and use <a class="link" href="http://neat.bourbon.io/" target="_blank">Bourbon Neat</a> instead.

---

## $ yo sizzle

It is a great thing, that developers can have their preferred Yeoman toolset put together into a sweet NPM package, so that they can have their own scaffolding generator. Following the <a class="link" href="http://yeoman.io/authoring/" target="_blank">Yeoman generator guide</a> I built `generator-sizzle`, which now lets me setting up a new project just the way I like it well within a ~minute.

To install Sizzle from your command line run:

<div class="codeblock-terminal">
```
	$ npm install -g generator-sizzle
```
</div>

Once Sizzle is installed, you can get Yeoman to scaffold your project with it:

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

(If you haven't got Bundle (or Ruby) installed already, please have a look at the `README.md` file in the Sizzle repo, it will explain how to install Compass on your machine).

Sizzle should be good to go now. To compile the source files and see what you've got, run

<div class="codeblock-terminal">
```
$ grunt serve
```
</div>

which should open the web app in your browser:

{% img post-photo /images/posts/generator-sizzle-1-preview.png The scaffolded Sizzle app in the browser %}

This tells you that Bourbon Neat is set up (with a visible visual grid), and if you open your Console, you should see some logs too:

<div class="codeblock-terminal">
```
[Log] [Main] - ready! (application.js, line 19632)
[Log] [App] - _init(): Sizzle is at your service! (application.js, line 19581)
```
</div>

which shows that RequireJS is happy too, and the app is up and running.

---

## Start sizzling

OK, so you sucessfully set up your project, now let's have a look at how you can start working on your new project! First of all, take a quick look at the project root!

<div class="codeblock-terminal">
```
├───app/
├───bower_components/
├───bower.json
├───config.json
├───dist/
├───Gemfile
├───Gruntfile.js
├───node_modules/
├───package.json
├───secret.json	
```
</div>

As you can see it's the usual Yeoman stuff: `app` and `dist` folders for your source code, and the compiled output. There are also the regular Yeoman config files, and the project's dependency manifests.

The only noticeable thing here is the `secret.json` file, which is used for SSH deployment via Grunt - I will talk about this one later.

### The app folder

Now let's have a quick look at the app folder:

<div class="codeblock-terminal">
```
├───app/
	└───favicon.ico
	└───images/
		└───inline/
		│	└───svg/
		└───yeoman-sizzle.png
	└───index.html
	└───robots.txt
	└───scripts/
		└───app.js
		└───main.js
	└───styles/
		└───_base.scss
		└───_grid-settings.scss
		└───_modules.scss
		└───_variables.scss
		└───application.scss
```
</div>

The folder structure follows the usual web app structure. Other than the usual web app folder structure, there are a few things, that Sizzle adds to the `app` folder:

- `inline/svg` folder, which is for your svg icons/images, that you want to have embedded in your CSS rather than polluting your markup with them;
- `scripts` folder contains a basic RequireJS app;
- `styles` has an initial setup including variables, the Bourbon Neat grid settings, and simple styling through `_modules`. All stylesheet modules are imported in the `application.scss` manifest.

Now let's have a quick peek at the `index.html` file!

### The index.html file

{% img post-photo /images/posts/generator-sizzle-2-preview.png The index.html file %}

Sizzle keeps the markup very simple and adds some sensible defaults only. As you can see, there is only 2 HTTP requests the app makes through the index.html file:

- `application.css`
- `application.js`

The stylesheet is loaded at the bottom of the `<head>` tag, and the app JS file is loaded before the `</body>` tag. That is to make sure that the stylesheets are loaded before the DOM, but the JavaScripts won't obstruct the DOM loading, and it only kicks in, once every element in the DOM is ready.

Now let's see how the stylesheets work in Sizzle.

### Styling your app

{% img post-photo /images/posts/generator-sizzle-4-preview.png The application.scss file %}

As you can see all the stylesheet modules are loaded into `application.scss`, which Compass brings all into one single output. If you have used SASS before, probably this is no news for you. I tried to set up the stylesheets with some common sense: There is a file for variables, there is one for base reset, there is the grid settings file, and finally there is 1 stylesheet for generic modules. This setup gives you the freedom of implementing your preferred method for working with CSS - should you want to use a SMACSS-like approach, or anything else.

I really like Compass's capability of embedding inline images into stylesheets, and that it also can generate sprites. I normally rely on Compass as a compiler, but for mixins and helpers I prefer using Bourbon. The reason to that is that back in the day when I was using Compass with Rails I noticed that Compass was a bit abandoned for a while, and loads of its features were undocumented, or the documentation was out of date. Also, browser vendors have implemented a lot of the stuff that didn't need mixins or helpers anymore, so I decided to stick with Bourbon, which seemed a lot more up to date at the time. This of course is down to personal taste, if you prefer Compass, feel free to use that one.

When developing your project (`$ grunt serve`) Compass brings all modules together into `application.css`, but will keep the output easy to read, so that you can debug it with ease. Once you build the project (`$ grunt build`) it minifies, uglifies and removes all comments from the output to keep it neat and make it faster to load over HTTP.

To get an idea of how Compass is set up in Sizzle, please refer to the `Gruntfile`.

### Scripting your app

When I write my scripts I prefer sticking to some sort of modular method, so that my code is well structured, and is easy for other developers to read and work with. For this I've found using RequireJS the best tool, as it's lightweight and it gives a nice structure through AMD modules without any framework overbloat.

<a class="link" href="https://github.com/yeoman/grunt-usemin/issues/112#issuecomment-17776979" target="_blank">Since the Yeoman team have decided to drop support for RequireJS entirely</a>, getting RequireJS working in a Yeoman project has caused me quite some head scratching. I've found that the best solution is using the `r.js` optimiser with <a class="link" href="https://github.com/jrburke/almond" target="_blank">Almond</a>. This is a pretty sweet solution, as most developers use RequireJS to keep their code modular, but once their app is live, they don't want to bloat their code with unused functionality, which comes with RequireJS.

The app's JavaScript dependencies are all defined in `main.js`, and all JS modules should reflect structure of `app.js`.

{% img post-photo /images/posts/generator-sizzle-3-preview.png The application.js file %}

Sizzle adds jQuery, JSSignals, FastClick, Greensock and a RequireJS text plugin for lean templating. I've used all these in my project for a while now, so I find them quite handy, but of course you can replace these to fit your taste.


> When working on your code, Compass is constantly watching out for changes in the stylesheets, so does `r.js` in the JS files. When you make any changes to your files the browser will reflect them pretty much instantly. Be aware that stylesheets will only refresh the styling in the browser, but changing JavaScript files will reload the whole page.

### Deploying your app

This is one of my favourite features of Grunt! Using a sleek tool to quickly deploy your code to a server from the command line is really powerful and replaces the need for old fashioned SFTP clients.

In Sizzle I included the <a class="link" href="https://github.com/chuckmo/grunt-ssh" target="_blank">grunt-ssh</a> npm module, which can be configured easily through the `Gruntfile`. I prefer keeping my server details and credentials in a separate file, which what the `secret.json` file is for:

<div class="codeblock-terminal">
```
{
    "staging": {
        "host" : "",
        "path" : "",
        "username" : "",
        "password" : "",
        "publicUrl": ""
    },
    "prod": {
        "host" : "",
        "path" : "",
        "username" : "",
        "password" : "",
        "publicUrl": ""
    }
}
```
</div>

Once you've added your server details you can start using the 

<div class="codeblock-terminal">
```
$ grunt deploy:staging
and
$ grunt deploy:prod
```
</div>

tasks to move your project to the server.

> Please note, that at the moment both deployment tasks use the generic `build` task, which will completely minify and gzip the project files, which not might be handy for debugging on the server. I am planning to add a soft build task for staging deployment to improve this.

By default Sizzle ignores `secret.json` file. I'd strongly advise not to change this, otherwise you might end up unintentially sharing your server credentials with others when you push your code with git.

> Another thing to keep in mind is that when you deploy, the script cleans the remote destination folder completely. If you want to change this behaviour, simply update the `stfp` task configuration.

Once the deployment process finishes Grunt opens your site's URL in Chrome, which I find pretty handy.

---

## Wrapping it up

Another good thing I've found about Sizzle, is that it can be used in any back-end project without a problem. I've used Sizzle with Rails, and with Laravel as well - and (of course with some reconfiguration) they seemed to like each other.

I hope Sizzle makes sense and will be a useful little tool for other developers too.

I would love to hear your thoughts on how you find using my generator, and of course if there is any bugs or improvements you'd like to address, please get in touch. <a class="link" href="https://github.com/robertpataki/generator-sizzle" target="_blank">The code is hosted on Github, any sensible contributions are welcome.</a>

I wish you happy coding, and I'd like to invite you to leave your comments below :)
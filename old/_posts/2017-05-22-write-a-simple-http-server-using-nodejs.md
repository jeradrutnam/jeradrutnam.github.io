---
layout: post
title:  Write a simple http-server using nodejs
comments: yes
date:   2017-05-22 09:56:32 +0530
modified_time: 
categories: Tutorial
tags:
- JavaScript
- NodeJS
---

This an quick guide to create an http web server using nodeJS.

### Download and Install NodeJS
If you haven't installed Node yet, download the latest stable release of NodeJS from [https://nodejs.org](https://nodejs.org) and install using all the default options.

<br>

### Create a `package.json` file in your website root folder. And add the following,

{% highlight json %}
{
    "name": "<project-name>",
    "version": "1.0.0",
    "url": "<project-documentation-url>",
    "git": "<project-github-repo-url>",
    "private": true,
    "designer": "<author-name>",
    "designerURL": "<author-website-url>",
    "license": "Apache License, Version 2.0",
    "licenseURL": "<project-licesnse-url>",
    "scripts":{
        "start": "node index.js"   
    },
    "dependencies": {
        "express":"^4.15.3",
        "copy": "0.3.0"
    }
}
{% endhighlight %}

<br>

### JavaScript (jQuery)

{% highlight javascript %}
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');

var cwd = '';
var port = 9001;

app.use('/', function (request, response) {
    
    console.log('Received request for URL: ' + request.url);

    var filePath = request.url.split("?").shift()

    if (filePath == '/') {
        filePath = cwd + '/index.html';
    }
    else {
        filePath = cwd + filePath;
    }

    fs.readFile(filePath, null, function(error, data){
        
        if(error){
            response.writeHead(404);
            response.write('File not found.');
        }
        else{
            response.writeHead(200);
            response.write(data);
        }
        
        response.end();
    });
    
});

console.log('Server address: http://127.0.0.1:' + port + '/');
console.log('Server running... press ctrl-c to stop.');

app.listen(port);
{% endhighlight %}

<br>

### Run

Navigate your project root folder on console/terminal and run, 

{% highlight console %}
npm install
{% endhighlight %}

And then

{% highlight console %}
npm start
{% endhighlight %}
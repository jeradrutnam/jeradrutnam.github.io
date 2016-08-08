---
layout: post
title:  Wrinting a language extension for Adobe Brackets
comments: yes
date:   2016-08-01 10:00:29 +0530
modified_time: 
categories: Extension
tags:
- Adobe
- Brackets
- Extension
---

This documentation guide covers an easiest way to start writing a language extension for adobe brackets.

<br> 

#### STEP 1: Navigate to brackets extensions folder

<img src="/images/post/brackets_extension_folder_navigate.png">

<br> 

#### STEP 2: Create folder inside `user` folder with a custom name

{% highlight text %}
e.g. extensions/user/<custom-extension>/
{% endhighlight %}

<br> 

#### STEP 3: Create 2 files in it as below

{% highlight text %}
e.g.
extensions/user/<your-extension>/main.js
extensions/user/<your-extension>/package.json
{% endhighlight %}

<br> 

#### STEP 4: Here is an sample `package.json` file

{% highlight json %}
{
    "name": "<your-extension>",
    "title": "<Your-Brackets-Extension>",
    "description": "<Your-Brackets-Extension-Description>",
    "version": "1.0.0",
    "author": "Name <name@email.com>",
    "license": "<MIT>",
    "engines": {
        "brackets": ">=1.6.0"
    }
}
{% endhighlight %}

<br>

#### STEP 5: And finally `main.js` should b e something like this

{% highlight javascript %}
define(function (require, exports, module) {
    
    // importing CodeMirror Module which is already comes with brackets
    var CodeMirror = brackets.getModule("thirdparty/CodeMirror/lib/codemirror"),
        // importing Brackets LanguageManager
        LanguageManager = brackets.getModule("language/LanguageManager");
    
    // Defining a CodeMirror CodeMode
    CodeMirror.defineSimpleMode("xhandlebars", {
        start: [
            {
                regex: /<!DOCTYPE[^>[]*(\[[^]]*\])?>/,
                token: "comment"
            },
            {
                regex: /\{\{!/,
                push: "handlebars_comment",
                token: "comment"
            }
        ],
        handlebars_comment: [
            { 
                regex: /\}\}/,
                pop: true,
                token: "comment"
            },
            {
                regex: /./,
                token: "comment"
            }
        ]
    });
    
    // Defining Langauge MIME Type
    CodeMirror.defineMIME("text/xhandlebars", "xhandlebars");
    
    // Defining New Langauge
    LanguageManager.defineLanguage("xhandlebars", {
        name: "XHandlebars",
        mode: ["shandlebars", "text/x-handlebars"],
        fileExtensions: ["xhbs"]
    });
    
});
{% endhighlight %}

<br>

#### STEP 6: Restart Brackets & Test the created exntension by creating a new `sample.xhbs` file

{% highlight text %}
e.g.
desktop/sample.xhbs
{% endhighlight %}

{% highlight html%}
{% raw %}
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sample</title>
</head>
<body>
    {{! Gadget settings }}
    {{#has options}}
        {{#each options}}
        <div class="form-group">
            <div>
                {{#equals type "STRING"}}
                <label>{{title}}
                    <input type="text" name="{{@key}}" placeholder="{{title}}" value="{{value}}">
                </label>
                {{/equals}}
            </div>
        </div>
        {{/each}}
    {{/has}}
</body>
</html>
{% endraw %}
{% endhighlight %}

<br>

And you are Done. Langauge extension should detect as below, Now you can play more with RegEx and [CodeMirror defineSimpleMode](https://codemirror.net/demo/simplemode.html){:target="_blank"} 
API options to achieve required code highlightings. Furthermore you can read [CodeMirror defineMode](https://codemirror.net/doc/manual.html#modeapi){:target="_blank"} API for more advance use cases.

<img src="/images/post/brackets_custom_language_extension.png" class="img-responsive">
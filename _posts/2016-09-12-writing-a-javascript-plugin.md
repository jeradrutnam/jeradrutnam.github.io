---
layout: post
title:  Writing a Javascript Plugin
comments: yes
date:   2016-09-12 10:26:16 +0530
modified_time: 
categories: Tutorial
tags:
- Javascript
---

This is an quick way of start writing a raw javacript component plugin. And see below how the usage works.    

### Usage:

This will just show a popup window with a content in it.

{% highlight javascript %}
var newMessage = new popupMessage({
    content: '<p>Hello World!</p>',
});

newMessage.show();
{% endhighlight %}

<br>

### Sample Plugin:
Javscript plugin for toggle popup div with some dynamic content.   
`popupMessage.js`

{% highlight javascript %}
/*!
 * popupMessage v1.0.0 (http://jeradrutnam.com)
 * Copyright 2016 Jerad Rutnam.
 * Licensed under the MIT license
 */

(function() {

    /**
     * @description   Constructor
     */
    this.popupMessage = function() {

        // Global references
        this.btnClose = null;
        this.modal = null;
        this.overlay = null;

        // Default options
        var defaults = {
            className: 'default-class',
            btnClose: true,
            content: "",
            overlay: true
        }
        
        // Extending default options with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    /**
     * @description   Public Methods
     */
    popupMessage.prototype.hide = function() {
        this.modal.className = this.modal.className.replace(" popup-message-open", "");
        this.overlay.className = this.overlay.className.replace(" popup-message-open", "");
    }

    popupMessage.prototype.show = function() {
        create.call(this);
        initializeEvents.call(this);
        window.getComputedStyle(this.modal).height;
        this.modal.className = this.modal.className +
            (this.modal.offsetHeight > window.innerHeight ?
                " popup-message-open popup-message-anchored" : " popup-message-open");
        this.overlay.className = this.overlay.className + " popup-message-open";
    }
    
    /**
     * @description   Private Methods
     */
    function create() {
        var content, contentHolder, docFrag;

        /*
         * If content is an HTML string, append the HTML string.
         * If content is a domNode, append its content.
         */
        if (typeof this.options.content === "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // Document Fragment to build with
        docFrag = document.createDocumentFragment();

        // Modal element
        this.modal = document.createElement("div");
        this.modal.className = "popup-message-window " + this.options.className;

        // If btnClose option is true, add a close button
        if (this.options.btnClose === true) {
            this.btnClose = document.createElement("button");
            this.btnClose.className = "popup-message-close close-button";
            this.btnClose.innerHTML = "×";
            this.modal.appendChild(this.btnClose);
        }

        // If overlay is true, add an overlay element
        if (this.options.overlay === true) {
            this.overlay = document.createElement("div");
            this.overlay.className = "popup-message-overlay " + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        // Create content area and append to modal
        contentHolder = document.createElement("div");
        contentHolder.className = "popup-message-content";
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        // Append modal to Document Fragment
        docFrag.appendChild(this.modal);

        // Append DocumentFragment to body
        document.body.appendChild(docFrag);
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function initializeEvents() {
        if (this.btnClose) {
            this.btnClose.addEventListener('click', this.hide.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', this.hide.bind(this));
        }
    }

}());
{% endhighlight %}

<br>

`popupMessage.css` for plugin support. This is just an supporting stylings to see how plugin actually works. you can even do this by adding stylings inline. But I always recomend to keep the
styles separately as possible. To easy theming capability. 

{% highlight css %}
.popup-message-overlay {
    display: none;
    background: #000;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: 0.4;
}
.popup-message-window {
    display: none;
    z-index: 101;
    width: 70% !important;
    background: #313131;
    padding: 20px;
    top: 50%;
    left: 50%;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}
.popup-message-window button {
    border: none;
    color: #313131;
    position: absolute;
    right: 0;
    top: 0;
    height: 20px;
    width: 20px;
    padding: 0 5px;
    line-height: 20px;
    font-size: 20px;
}
.popup-message-open {
    display: block;
}
{% endhighlight %}

<br>

---

<br>

### Plugin Breakdown:

Let's go through the `popupMessage.js` to see what is in the code & what are each blocks do.

<br>

#### Create an immediately invoked functional expression to wrap your code

{% highlight javascript %}
(function() {

}());
{% endhighlight %}

<br>

#### Create your contructor

{% highlight javascript %}
this.popupMessage = function() {

    // Global references
    this.btnClose = null;
    this.modal = null;
    this.overlay = null;

    // Default options
    var defaults = {
        className: 'default-class',
        btnClose: true,
        content: "",
        overlay: true
    }

    // Extending default options with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
    }

}
{% endhighlight %}

<br>

#### Create the public methods

{% highlight javascript %}
popupMessage.prototype.hide = function() {
    this.modal.className = this.modal.className.replace(" popup-message-open", "");
    this.overlay.className = this.overlay.className.replace(" popup-message-open", "");
}

popupMessage.prototype.show = function() {
    create.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
        (this.modal.offsetHeight > window.innerHeight ?
            " popup-message-open popup-message-anchored" : " popup-message-open");
    this.overlay.className = this.overlay.className + " popup-message-open";
}
{% endhighlight %}

<br>

#### Create your component initializing method

{% highlight javascript %}
function create() {
    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */
    if (typeof this.options.content === "string") {
        content = this.options.content;
    } else {
        content = this.options.content.innerHTML;
    }

    // Document Fragment to build with
    docFrag = document.createDocumentFragment();

    // Modal element
    this.modal = document.createElement("div");
    this.modal.className = "popup-message-window " + this.options.className;

    // If btnClose option is true, add a close button
    if (this.options.btnClose === true) {
        this.btnClose = document.createElement("button");
        this.btnClose.className = "popup-message-close close-button";
        this.btnClose.innerHTML = "×";
        this.modal.appendChild(this.btnClose);
    }

    // If overlay is true, add an overlay element
    if (this.options.overlay === true) {
        this.overlay = document.createElement("div");
        this.overlay.className = "popup-message-overlay " + this.options.className;
        docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "popup-message-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to Document Fragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);
}
{% endhighlight %}

<br>

#### Add additional private methods

{% highlight javascript %}
function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

function initializeEvents() {
    if (this.btnClose) {
        this.btnClose.addEventListener('click', this.hide.bind(this));
    }

    if (this.overlay) {
        this.overlay.addEventListener('click', this.hide.bind(this));
    }
}
{% endhighlight %}

<br>

And that is it. Happy plugin writing!